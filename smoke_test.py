import sys
from pathlib import Path
sys.path.insert(0,'backend')
from app.retrieval import Index
from app.redflags import detect
from app.intents import route
root=Path(__file__).parent; assert (root/'data/financials.json').exists(); idx=Index(root/'data'); assert len(idx.chunks)>20
qs=['How has operating margin trended over 5 years?','What risks did management highlight this quarter?','How does HarborMart compare with its peers?','What red flags were detected?','How has debt-to-equity changed?']
for q in qs:
 ev=idx.retrieve(q); print('\n',q,'=>',route(q),'citations:',len(ev)); print(ev[0]['text'][:120] if ev else 'No evidence')
h=detect(idx,'harbormart'); a=detect(idx,'aurelius'); print('HarborMart flags detected:',len(h));print('Aurelius flags detected:',len(a));assert len(h)>=6 and len(a)<=1
print('Smoke test: PASS')
