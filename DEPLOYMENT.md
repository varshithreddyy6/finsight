# Deployment

## Vercel / Netlify
Set the frontend root to `frontend`, build with `npm run build`, output `dist`, and configure an API base URL if deploying the API separately. Add the optional provider variables only when needed.

## Render
Connect the repository, set root directory to `backend`, runtime Python, install command `pip install -r requirements.txt`, and start command:
```text
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```
Verify `/api/health` and configure frontend CORS/API URL. Free instances can cold-start. SQLite and `data/uploads` are ephemeral on many free hosts; use durable storage before accepting important user documents.
