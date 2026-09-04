#!/usr/bin/env bash
set -e
python data/scripts/gen_corpus.py
printf 'Start FastAPI in terminal 1: cd backend && uvicorn app.main:app --reload\n'
printf 'Start Vite in terminal 2: cd frontend && npm install && npm run dev\n'
