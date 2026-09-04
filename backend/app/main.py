from fastapi import FastAPI,UploadFile,File,HTTPException,Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel,Field
from pathlib import Path
import json,shutil,re
from .retrieval import Index
from .intents import route
from .ratios import calc,series,D
from .redflags import detect
from .llm import generate_answer
from .storage import Store
ROOT=Path(__file__).parents[2]; DATA=ROOT/'data'; idx=Index(DATA); store=Store(DATA/'finsight.sqlite'); app=FastAPI(title='finsight',version='1.0'); app.add_middleware(CORSMiddleware,allow_origins=['http://localhost:5173','http://127.0.0.1:5173'],allow_methods=['*'],allow_headers=['*'])
class Q(BaseModel): question:str=Field(min_length=3,max_length=1000);company:str='aurelius';period:str='FY2025'
def valid(q):
 if q.company not in D['companies']:raise HTTPException(400,'Unknown company')
 if q.period not in D['companies'][q.company]['years']:raise HTTPException(400,'Unknown period')
@app.get('/api/health')
def health():return {'status':'ok','offline':True,'chunks':len(idx.chunks)}
@app.get('/api/companies')
def companies():return [{'id':k,'name':v['name'],'periods':list(v['years'])} for k,v in D['companies'].items()]
@app.get('/api/ratios')
def ratios(company='aurelius',period='FY2025'):
 valid(Q(question='ratios',company=company,period=period));ys=D['companies'][company]['years'];keys=list(ys);i=keys.index(period);return {'company':company,'period':period,'metrics':calc(ys[period],ys[keys[i-1]] if i else None)}
@app.get('/api/trends')
def trends(company='aurelius',metric='operating_margin'):
 if company not in D['companies']:raise HTTPException(400,'Unknown company')
 return {'company':company,'metric':metric,'data':series(company,metric)}
@app.get('/api/peers')
def peers(company='aurelius',metric='operating_margin',mode='absolute'):
 vals=[{'company':k,'name':v['name'],'value':series(k,metric)[-1]['value']} for k,v in D['companies'].items()]; ordered=sorted(vals,key=lambda x:x['value'] if x['value'] is not None else -999,reverse=True)
 if mode=='percentile':
  for x in vals:x['percentile']=round((len(vals)-1-ordered.index(x))/(len(vals)-1)*100) if len(vals)>1 else 100
 return {'metric':metric,'mode':mode,'data':vals}
@app.get('/api/redflags')
def flags(company='harbormart'):
 if company not in D['companies']:raise HTTPException(400,'Unknown company')
 return {'company':company,'flags':detect(idx,company)}
@app.post('/api/query')
def query(q:Q):
 valid(q);intent=route(q.question);ev=idx.retrieve(q.question,filters={'company':q.company},top_k=5);data=None;metric=None;answer=None
 if intent in ('trend','ratio'):
  metric='debt_to_equity' if any(x in q.question.lower() for x in ['debt','leverage']) else ('revenue' if 'revenue' in q.question.lower() else 'operating_margin');data=series(q.company,metric);a,b=data[0]['value'],data[-1]['value'];unit='%' if metric in ['operating_margin','revenue'] else 'x';answer=f'{metric.replace("_"," ").title()} for {D["companies"][q.company]["name"]} moved from {a}{unit} in FY2021 to {b}{unit} in FY2025.'
 elif intent in ('risk','red_flags'):answer=f'Management commentary surfaced {len(detect(idx,q.company))} relevant red-flag signals, including liquidity, controls, guidance, or outlook language.'
 else:answer=generate_answer(q.question,ev)
 store.add_history(q.question,q.company,q.period,intent,answer)
 return {'answer':answer,'intent':intent,'company':{'id':q.company,'name':D['companies'][q.company]['name']},'period':q.period,'citations':ev[:3],'evidence':ev[:3],'metrics':ratios(q.company,q.period)['metrics'],'chart':{'metric':metric,'data':data} if data else None,'red_flags':detect(idx,q.company) if intent in ('risk','red_flags') else [],'follow_ups':['What drove this change?','How does this compare with peers?'],'retrieval':{'count':len(ev)}}
@app.get('/api/history')
def history():return store.history()
@app.delete('/api/history/{item_id}')
def delete_history(item_id:int):store.delete_history(item_id);return {'deleted':True}
@app.delete('/api/history')
def clear_history():store.clear_history();return {'cleared':True}
@app.get('/api/documents')
def documents():return store.documents()
@app.delete('/api/documents/{filename}')
def delete_document(filename:str):
 safe=Path(filename).name
 if safe!=filename:raise HTTPException(400,'Invalid filename')
 p=DATA/'uploads'/safe
 if p.exists():p.unlink()
 store.delete_document(safe);idx.build();return {'deleted':True}
@app.post('/api/ingest')
async def ingest(file:UploadFile=File(...)):
 ext=Path(file.filename or '').suffix.lower()
 if ext not in ['.txt','.md','.pdf']:raise HTTPException(400,'Only TXT, Markdown, and PDF files are supported')
 safe=re.sub(r'[^a-zA-Z0-9_.-]','_',Path(file.filename).name);dest=DATA/'uploads'/safe; data=await file.read()
 if not data or len(data)>10*1024*1024:raise HTTPException(400,'File is empty or exceeds 10 MB')
 dest.write_bytes(data)
 if ext=='.pdf':
  from pypdf import PdfReader
  try:text='\n'.join((p.extract_text() or '') for p in PdfReader(str(dest)).pages)
  except Exception:dest.unlink(missing_ok=True);raise HTTPException(400,'Could not parse PDF')
  dest.with_suffix('.txt').write_text(text,encoding='utf-8')
 idx.build();store.add_document(safe,ext[1:].upper(),sum(1 for c in idx.chunks if safe in c['source_file']));return {'filename':safe,'indexed':True,'chunks':len(idx.chunks)}
DIST=ROOT/'frontend'/'dist'
if DIST.exists():app.mount('/assets',StaticFiles(directory=DIST/'assets'),name='assets')
@app.get('/{path:path}')
def spa(path:str):
 if path.startswith('api/'):raise HTTPException(404,'Not found')
 return FileResponse(DIST/'index.html') if (DIST/'index.html').exists() else {'message':'Run the frontend dev server'}
