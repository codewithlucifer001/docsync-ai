from app.agents.state import DocSyncState

def compute_freshness_node(state: DocSyncState) -> dict:
    new_docs = state.get("markdown_docs", {})
    prev_docs = state.get("previous_docs") or {}

    if not prev_docs:
        return {"freshness_score": 100.0, "drift_count": 0}

    total_modules = max(len(new_docs), 1)
    drifted_modules = 0

    for filename, content in new_docs.items():
        if filename not in prev_docs or prev_docs[filename] != content:
            drifted_modules += 1

    freshness = max(0.0, min(100.0, ((total_modules - drifted_modules) / total_modules) * 100.0))

    return {
        "freshness_score": round(freshness, 1),
        "drift_count": drifted_modules
    }