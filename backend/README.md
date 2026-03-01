Backend (FastAPI)

Run locally
- `cd backend`
- Create venv: `python3 -m venv .venv && source .venv/bin/activate`
- Install deps: `pip install -r requirements.txt`
- Start server: `uvicorn app.main:app --reload --port 8000`

Endpoints
- `GET /health` — health check
- `POST /api/tasks` — create a task; echoes back with `id`
 - `POST /api/generate` — generate materials via Infomaniak/Euria or mocked fallback. Update, we can only use mocked fallbacks because Informaniak requires money

Dev Notes
- CORS allows `http://localhost:5173` for Vite dev server.
- Frontend proxies `/api/*` to `http://localhost:8000` during development.
 - Create a `.env` file (in repo root or backend/) with:
   - `INFOMANIAK_API_URL=https://...` (your generation endpoint)
   - `INFOMANIAK_TOKEN=...` (Bearer token)
 - When `.env` is present, the backend attempts a real call; on errors it falls back to mock generation and logs the reason.
