from typing import TypedDict, List, Dict, Any, Optional

class DocSyncState(TypedDict):
    repo_name: str
    commit_sha: str
    files: List[Dict[str, str]]
    parsed_ast: List[Dict[str, Any]]
    markdown_docs: Dict[str, str]
    openapi_spec: Dict[str, Any]
    previous_docs: Optional[Dict[str, str]]
    freshness_score: float
    drift_count: int
    routes_detected: int