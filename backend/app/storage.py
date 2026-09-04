from pathlib import Path
import sqlite3, datetime, json
class Store:
 def __init__(self,path):
  self.path=Path(path); self.path.parent.mkdir(parents=True,exist_ok=True)
  with sqlite3.connect(self.path) as c: c.execute('''CREATE TABLE IF NOT EXISTS history(id INTEGER PRIMARY KEY,question TEXT,timestamp TEXT,company TEXT,period TEXT,intent TEXT,answer_summary TEXT,full_answer TEXT)'''); c.execute('''CREATE TABLE IF NOT EXISTS documents(id INTEGER PRIMARY KEY,filename TEXT UNIQUE,source_type TEXT,company TEXT,period TEXT,uploaded_at TEXT,section_count INTEGER,indexed INTEGER)''')
 def add_history(self,q,company,period,intent,answer):
  with sqlite3.connect(self.path) as c:c.execute('INSERT INTO history(question,timestamp,company,period,intent,answer_summary,full_answer) VALUES(?,?,?,?,?,?,?)',(q,datetime.datetime.now().isoformat(timespec='seconds'),company,period,intent,answer[:180],answer))
 def history(self):
  with sqlite3.connect(self.path) as c:c.row_factory=sqlite3.Row;return [dict(x) for x in c.execute('SELECT * FROM history ORDER BY id DESC LIMIT 100')]
 def delete_history(self,i):
  with sqlite3.connect(self.path) as c:c.execute('DELETE FROM history WHERE id=?',(i,))
 def clear_history(self):
  with sqlite3.connect(self.path) as c:c.execute('DELETE FROM history')
 def documents(self):
  with sqlite3.connect(self.path) as c:c.row_factory=sqlite3.Row;return [dict(x) for x in c.execute('SELECT * FROM documents ORDER BY id DESC')]
 def add_document(self,fn,typ,sections):
  with sqlite3.connect(self.path) as c:c.execute('INSERT OR REPLACE INTO documents(filename,source_type,company,period,uploaded_at,section_count,indexed) VALUES(?,?,?,?,?,?,?)',(fn,typ,'uploaded','Uploaded',datetime.datetime.now().isoformat(timespec='seconds'),sections,1))
 def delete_document(self,fn):
  with sqlite3.connect(self.path) as c:c.execute('DELETE FROM documents WHERE filename=?',(fn,))
