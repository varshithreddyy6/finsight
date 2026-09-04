from pathlib import Path
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .chunking import chunk_text
import re
class Index:
 def __init__(self,root): self.root=Path(root);self.chunks=[];self.v=None;self.X=None;self.build()
 def build(self):
  self.chunks=[]
  files=list((self.root/'filings').glob('*/*.md'))+list((self.root/'quarterly').glob('*/*.md'))+list((self.root/'analyst_notes').glob('*/*.md'))+list((self.root/'uploads').glob('*'))
  for p in files:
   if p.suffix.lower() not in ['.md','.txt']:continue
   text=p.read_text(errors='ignore'); rel=Path(p.relative_to(self.root)); parts=rel.parts
   folder=parts[0] if parts else 'uploads'; slug=parts[1] if len(parts)>1 and folder!='uploads' else 'uploaded'
   name=p.name; fy=(re.search(r'FY20\d{2}',name) or re.search(r'FY20\d{2}',text)); quarter=re.search(r'Q[1-4]',name)
   meta={'company':slug,'fiscal_year':fy.group(0) if fy else 'Uploaded','quarter':quarter.group(0) if quarter else None,'document_type':folder,'source_file':rel.as_posix()}
   self.chunks+=chunk_text(text,meta)
  self.v=TfidfVectorizer(stop_words='english');self.X=self.v.fit_transform([x['text'] for x in self.chunks]) if self.chunks else None
 def retrieve(self,q,filters=None,top_k=5):
  if self.X is None:return []
  scores=cosine_similarity(self.v.transform([q]),self.X)[0]; candidates=range(len(self.chunks))
  if filters:candidates=[i for i in candidates if all(self.chunks[i].get(k)==v for k,v in filters.items())]
  ids=sorted(candidates,key=lambda i:scores[i],reverse=True)[:top_k]
  return [{**self.chunks[i],'score':round(float(scores[i]),3)} for i in ids if scores[i]>0]
