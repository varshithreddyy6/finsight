def route(q):
 q=q.lower()
 if any(x in q for x in ['trend','over 5','changed','history']): return 'trend'
 if any(x in q for x in ['ratio','margin','roe','roa','eps','debt-to-equity','leverage']): return 'ratio'
 if any(x in q for x in ['risk','highlight','concern']): return 'risk'
 if any(x in q for x in ['peer','compare']): return 'peer'
 if any(x in q for x in ['red flag','red flags','detected']): return 'red_flags'
 return 'general'
