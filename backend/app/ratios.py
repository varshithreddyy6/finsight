import json
from pathlib import Path
D=json.loads((Path(__file__).parents[2]/'data/financials.json').read_text())
def calc(m,prev=None):
 def r(a,b): return round(a/b*100,1) if b else None
 out={'revenue_growth':round((m['revenue']/prev['revenue']-1)*100,1) if prev else None,'gross_margin':r(m['gross_profit'],m['revenue']),'operating_margin':r(m['operating_income'],m['revenue']),'net_margin':r(m['net_income'],m['revenue']),'roe':r(m['net_income'],m['equity']),'roa':r(m['net_income'],m['current_assets']),'current_ratio':round(m['current_assets']/m['current_liabilities'],2) if m['current_liabilities'] else None,'debt_to_equity':round(m['debt']/m['equity'],2) if m['equity'] else None,'free_cash_flow':m['fcf'],'eps':m['eps']}
 return out
def series(slug,metric):
 ys=D['companies'][slug]['years']; keys=list(ys); return [{'period':k,'value':calc(ys[k],ys[keys[i-1]] if i else None).get(metric)} for i,k in enumerate(keys)]
