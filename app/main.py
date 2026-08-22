import sys
from pathlib import Path

# Add parser-service root directory to sys.path
root_dir = str(Path(__file__).resolve().parent.parent)
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Optional, Any
from app.config import settings
from app.agents.langgraph_pipeline import docsync_app

app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0"
)

class FilePayload(BaseModel):
    filename: str
    content: str

class GenerateRequest(BaseModel):
    repo_name: str
    commit_sha: str
    files: List[FilePayload]
    previous_docs: Optional[Dict[str, str]] = None

class GenerateResponse(BaseModel):
    status: str
    repo_name: str
    commit_sha: str
    freshness_score: float
    drift_count: int
    routes_detected: int
    markdown_docs: Dict[str, str]
    openapi_spec: Dict[str, Any]

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": settings.APP_NAME}

@app.post("/generate", response_model=GenerateResponse)
async def generate_docs(payload: GenerateRequest):
    initial_state = {
        "repo_name": payload.repo_name,
        "commit_sha": payload.commit_sha,
        "files": [{"filename": f.filename, "content": f.content} for f in payload.files],
        "parsed_ast": [],
        "markdown_docs": {},
        "openapi_spec": {},
        "previous_docs": payload.previous_docs,
        "freshness_score": 100.0,
        "drift_count": 0,
        "routes_detected": 0
    }

    result = docsync_app.invoke(initial_state)

    return {
        "status": "success",
        "repo_name": result["repo_name"],
        "commit_sha": result["commit_sha"],
        "freshness_score": result["freshness_score"],
        "drift_count": result["drift_count"],
        "routes_detected": result["routes_detected"],
        "markdown_docs": result["markdown_docs"],
        "openapi_spec": result["openapi_spec"]
    }