import os, urllib.request, json
class Provider:
 def __init__(self,name,key): self.name=name;self.key=key
 def generate(self,prompt): raise RuntimeError('Provider adapter unavailable')
class OfflineFallback:
 name='Offline'
 def generate(self,question,evidence,context=None):
  if context and context.get('answer'): return context['answer']
  if evidence:return 'The indexed evidence indicates that '+evidence[0]['text'].replace('\n',' ')[:420]
  return 'Not enough evidence. Upload another filing or choose a period with available coverage.'
def generate_answer(question,evidence,structured_context=None,provider='offline'):
 # Providers are optional; deterministic output is deliberately the safe default.
 return OfflineFallback().generate(question,evidence,structured_context)
