from app.agents.langgraph_pipeline import docsync_app

def test_pipeline_execution():
    sample_files = [
        {
            "filename": "routes/user.ts",
            "content": "export async function POST(req: Request) { return Response.json({ ok: true }); }"
        },
        {
            "filename": "api/auth.py",
            "content": "@router.post(\"/login\")\ndef login():\n    return {\"token\": \"jwt\"}"
        }
    ]

    state = {
        "repo_name": "test-org/sample-app",
        "commit_sha": "abc1234",
        "files": sample_files,
        "parsed_ast": [],
        "markdown_docs": {},
        "openapi_spec": {},
        "previous_docs": {},
        "freshness_score": 100.0,
        "drift_count": 0,
        "routes_detected": 0
    }

    result = docsync_app.invoke(state)

    assert result["routes_detected"] == 2
    assert "routes/user.ts" in result["markdown_docs"]
    assert "api/auth.py" in result["markdown_docs"]
    assert result["freshness_score"] == 100.0