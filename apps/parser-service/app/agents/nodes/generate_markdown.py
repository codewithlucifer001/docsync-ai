from app.agents.state import DocSyncState

def generate_markdown_node(state: DocSyncState) -> dict:
    markdown_docs = {}

    for ast in state.get("parsed_ast", []):
        filename = ast.get("filename", "module")
        lang = ast.get("language", "text")
        functions = ast.get("functions", [])
        classes = ast.get("classes", [])
        routes = ast.get("routes", [])

        doc = f"# Module: `{filename}`\n\n"
        doc += f"**Language**: `{lang}` | **Detected Routes**: `{len(routes)}`\n\n"

        if routes:
            doc += "## API Routes & Endpoints\n"
            for r in routes:
                if "decorator" in r:
                    doc += f"- `{r.get('decorator')}` -> `{r.get('signature')}`\n"
                else:
                    doc += f"- **{r.get('method')}** `{r.get('raw_signature')}`\n"
            doc += "\n"

        if functions:
            doc += "## Functions & Methods\n"
            for f in functions:
                doc += f"```typescript\n{f.get('raw')}\n```\n"

        if classes:
            doc += "## Class Definitions\n"
            for c in classes:
                doc += f"```typescript\n{c.get('raw')}\n```\n"

        markdown_docs[filename] = doc

    return {"markdown_docs": markdown_docs}