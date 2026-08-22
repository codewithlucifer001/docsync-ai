from app.parsing.js_ts_parser import parse_typescript_code
from app.parsing.python_parser import parse_python_code
from app.agents.state import DocSyncState

def extract_structure_node(state: DocSyncState) -> dict:
    parsed_results = []
    total_routes = 0

    for file_info in state.get("files", []):
        name = file_info.get("filename", "")
        content = file_info.get("content", "")

        if name.endswith((".ts", ".tsx", ".js", ".jsx")):
            ast_data = parse_typescript_code(content)
        elif name.endswith(".py"):
            ast_data = parse_python_code(content)
        else:
            ast_data = {"language": "unknown", "functions": [], "classes": [], "routes": []}

        ast_data["filename"] = name
        total_routes += len(ast_data.get("routes", []))
        parsed_results.append(ast_data)

    return {
        "parsed_ast": parsed_results,
        "routes_detected": total_routes
    }