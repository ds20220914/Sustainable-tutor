from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uuid
import os
import logging

try:
    import httpx  # type: ignore
except Exception:
    httpx = None
try:
    from dotenv import load_dotenv  # type: ignore
except Exception:
    load_dotenv = None


class TaskRequest(BaseModel):
    name: str
    currentlevel: str
    targetlevel: str
    description: str


class TaskResponse(BaseModel):
    id: str
    name: str
    currentlevel: str
    targetlevel: str
    description: str


if load_dotenv:
    # Load env from project root or backend directory
    load_dotenv()  # default searches up the tree

app = FastAPI()
logger = logging.getLogger("sustainable-tutor")
logging.basicConfig(level=logging.INFO)

# Allow Vite dev server during development
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/tasks", response_model=TaskResponse)
def create_task(task: TaskRequest):
    # For now, echo back the created task with an ID.
    return TaskResponse(
        id=str(uuid.uuid4()),
        name=task.name,
        currentlevel=task.currentlevel,
        targetlevel=task.targetlevel,
        description=task.description,
    )


class GenerateRequest(BaseModel):
    topic: str
    currentlevel: str
    targetlevel: str
    preferred: str  # e.g., multiple_choice, short_answer, summarization, practice_test
    count: Optional[int] = 5
    description: Optional[str] = None


class GeneratedItem(BaseModel):
    question: str
    answer: Optional[str] = None


class GenerateResponse(BaseModel):
    id: str
    topic: str
    preferred: str
    items: List[GeneratedItem]


def _load_learning_techniques() -> str:
    path = os.path.join(os.path.dirname(__file__), "..", "resources", "learning_techniques.md")
    try:
        with open(os.path.abspath(path), "r", encoding="utf-8") as f:
            return f.read()
    except Exception:
        return "Use scaffolding, spaced repetition, retrieval practice, and Bloom's Taxonomy alignment."


def _mock_generate(req: GenerateRequest, techniques: str) -> List[GeneratedItem]:
    items: List[GeneratedItem] = []
    for i in range(1, (req.count or 5) + 1):
        q = f"[{req.preferred}] {req.topic}: Q{i} — Align {req.currentlevel}→{req.targetlevel}. Technique: retrieval practice."
        a = f"Sample answer/explanation for {req.topic} Q{i}."
        items.append(GeneratedItem(question=q, answer=a))
    return items


def _call_external_generate(req: GenerateRequest, techniques: str) -> List[GeneratedItem]:
    """Call Infomaniak/Euria API using env vars; return parsed items or []."""
    api_url = os.getenv("INFOMANIAK_API_URL")
    api_token = os.getenv("INFOMANIAK_TOKEN")
    if httpx is None or not api_url or not api_token:
        logger.info("External generate unavailable: httpx or env missing; falling back to mock.")
        return []

    # Compose prompt for models that accept free-text input
    prompt = (
        f"Topic: {req.topic}\n"
        f"Current level: {req.currentlevel}\n"
        f"Target level: {req.targetlevel}\n"
        f"Preferred exercise type: {req.preferred}\n"
        f"Count: {req.count or 5}\n\n"
        f"Incorporate these learning techniques:\n{techniques}\n\n"
        f"Generate {req.count or 5} items with questions and answers/explanations."
    )

    payload = {
        "topic": req.topic,
        "current_level": req.currentlevel,
        "target_level": req.targetlevel,
        "preferred": req.preferred,
        "count": req.count or 5,
        "techniques": techniques,
        "prompt": prompt,
        "description": req.description or "",
    }

    headers = {
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    try:
        with httpx.Client(timeout=60) as client:
            resp = client.post(api_url, headers=headers, json=payload)
            logger.info(f"External generate status {resp.status_code}")
            resp.raise_for_status()
            data = resp.json()
            items: List[GeneratedItem] = []

            # Flexible parsing: prefer `items`, else try common shapes
            if isinstance(data, dict):
                raw_items = (
                    data.get("items")
                    or data.get("data")
                    or data.get("result")
                    or []
                )
                if isinstance(raw_items, list):
                    for i, entry in enumerate(raw_items, start=1):
                        if isinstance(entry, dict):
                            q = entry.get("question") or entry.get("q") or entry.get("text") or f"Item {i}"
                            a = entry.get("answer") or entry.get("a") or entry.get("explanation")
                            items.append(GeneratedItem(question=q, answer=a))
                elif isinstance(raw_items, str):
                    # If the API returns a single blob, split lines
                    for i, line in enumerate(raw_items.splitlines(), start=1):
                        line = line.strip()
                        if not line:
                            continue
                        items.append(GeneratedItem(question=line, answer=None))
            return items
    except Exception as e:
        logger.warning(f"External generate failed: {e}")
        return []


@app.post("/api/generate", response_model=GenerateResponse)
def generate_material(req: GenerateRequest):
    techniques = _load_learning_techniques()
    prompt = (
        f"Topic: {req.topic}\n"
        f"Current level: {req.currentlevel}\n"
        f"Target level: {req.targetlevel}\n"
        f"Preferred exercise type: {req.preferred}\n"
        f"Count: {req.count or 5}\n\n"
        f"Incorporate these learning techniques:\n{techniques}\n\n"
        f"Generate {req.count or 5} items with questions and answers/explanations."
    )

    items = _call_external_generate(req, techniques)
    if not items:
        items = _mock_generate(req, techniques)

    return GenerateResponse(
        id=str(uuid.uuid4()),
        topic=req.topic,
        preferred=req.preferred,
        items=items,
    )
