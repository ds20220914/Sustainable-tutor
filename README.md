Sustainable Tutor

Project structure has been cleaned and documented to make it easy to navigate and develop.

Structure
- `frontend/` (currently `sustainability-frontend/`): Vite + React app.
- `backend/`: Python backend (venv present). Add app sources here.
- `.git/`: Git repository metadata.

Notes
- The frontend currently lives in `sustainability-frontend/`. It can be renamed to `frontend/` later; keeping it as-is avoids breaking paths. The README and tooling reference it clearly.
- The backend folder contains a virtual environment at `backend/venv/`. Do not commit `venv` contents; use your own local venv when developing.

Getting Started
- Frontend: `cd sustainability-frontend && npm install && npm run dev`
- Backend: `cd backend` then create a virtualenv and add your app code (FastAPI/Flask/etc.).

Conventions
- Keep all frontend code under `sustainability-frontend/` (or `frontend/` once renamed).
- Keep all backend code under `backend/`.
- Do not place project code at the repository root.
Hello
