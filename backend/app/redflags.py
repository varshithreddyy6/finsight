import re
def detect(index,slug=None):
 flags=[]; rules=[('going-concern/liquidity',r'going concern|additional liquidity|substantial doubt|covenant waiver','concern',3),('accounting controls',r'material weaknesses remain|controls remain under remediation','concern',2),('soft guidance',r'unable to provide quantitative guidance|cautious outlook|expect a cautious','watch',2),('vague attribution',r'challenging market conditions|shifting consumer demand','watch',1),('decline-with-excuse',r'decline.{0,100}(due to|cited)|declining.{0,100}conditions','watch',1)]
 for c in index.chunks:
  if slug and c['company']!=slug: continue
  for cat,pat,sev,score in rules:
   m=re.search(pat,c['text'],re.I)
   if m: flags.append({'category':cat,'severity':sev,'score':score,'quote':c['text'][max(0,m.start()-40):m.end()+100].replace('\n',' '),'explanation':'Detected using an explainable lexical rule.','source':c['source_file'],'metadata':c})
 return flags
