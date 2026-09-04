import json, pathlib
ROOT=pathlib.Path(__file__).parents[1]; d=json.loads((ROOT/'financials.json').read_text())
for folder in ['filings','quarterly','analyst_notes']:
 for p in (ROOT/folder).glob('*'): p.unlink() if p.is_file() else None
for slug,c in d['companies'].items():
 for y,m in c['years'].items():
  text=f'''# {c["name"]} Annual Report {y}\n## Executive Summary\n{c["name"]} reported revenue of ${m["revenue"]} million, gross profit of ${m["gross_profit"]} million and operating income of ${m["operating_income"]} million.\n## Revenue and Profitability\nRevenue was ${m["revenue"]} million. Gross margin was {m["gross_profit"]/m["revenue"]*100:.1f}% and operating margin was {m["operating_income"]/m["revenue"]*100:.1f}%. Net income was ${m["net_income"]} million.\n## Cash Flow and Balance Sheet\nFree cash flow was ${m["fcf"]} million. Cash was ${m["cash"]} million, current assets ${m["current_assets"]} million and current liabilities ${m["current_liabilities"]} million. Debt was ${m["debt"]} million and equity ${m["equity"]} million. EPS was ${m["eps"]:.2f}.\n## Outlook and Risk Factors\n'''
  if slug=='harbormart': text+='''Management cited challenging market conditions and shifting consumer demand for the decline. We continue to expect a cautious outlook but are unable to provide quantitative guidance. The company may need additional liquidity and has received a covenant waiver. Material weaknesses in internal controls remain under remediation. There is substantial doubt about our ability to continue as a going concern if liquidity is not improved.'''
  elif slug=='aurelius': text+='''Management expects constructive demand and continued disciplined investment. No material weaknesses were identified in internal controls. Liquidity remains strong and the outlook is positive.'''
  else: text+='''Management noted commodity-price volatility and cyclical demand. Leverage remains meaningful, though liquidity is monitored closely and the outlook depends on energy markets.'''
  p=ROOT/'filings'/slug; p.mkdir(parents=True,exist_ok=True); (p/f'{y}_annual.md').write_text(text)
 (ROOT/'analyst_notes'/slug).mkdir(parents=True,exist_ok=True); (ROOT/'analyst_notes'/slug/'FY2025_note.md').write_text(f'# Analyst Note: {c["name"]}\n## Thesis\nThe thesis weighs operating momentum, cash generation, valuation and risks for {c["name"]}.\n## Risks\nReview leverage, demand visibility and management guidance alongside the annual filing.')
 # deterministic quarterly docs
 (ROOT/'quarterly'/slug).mkdir(parents=True,exist_ok=True)
 for q in range(1,5): (ROOT/'quarterly'/slug/f'Q{q}_FY2025.md').write_text(f'# {c["name"]} Q{q} FY2025\n## Management Discussion\nQuarterly results reflect the annual operating trend. Management highlighted demand, liquidity, execution and outlook risks. See the FY2025 annual report for audited context.')
print('Generated corpus for',len(d['companies']),'companies')
