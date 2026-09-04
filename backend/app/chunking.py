import re
def chunk_text(text,meta):
 parts=re.split(r'(?=^## )',text,flags=re.M); out=[]
 for i,p in enumerate(parts):
  if p.strip(): out.append({**meta,'section':p.splitlines()[0].replace('## ','').strip() or 'Overview','chunk_id':f'{meta["source_file"]}-{i}','text':p.strip()})
 return out
