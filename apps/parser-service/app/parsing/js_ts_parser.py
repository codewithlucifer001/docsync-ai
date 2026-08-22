import tree_sitter_typescript as tstypescript
from tree_sitter import Language, Parser

TS_LANGUAGE = Language(tstypescript.language_typescript())
parser = Parser(TS_LANGUAGE)

def parse_typescript_code(source_code: str) -> dict:
    source_bytes = bytes(source_code, "utf8")
    tree = parser.parse(source_bytes)
    root_node = tree.root_node

    functions = []
    classes = []
    routes = []

    def get_node_text(node):
        return source_bytes[node.start_byte:node.end_byte].decode("utf8")

    def traverse(node):
        if node.type in ["function_declaration", "export_statement", "lexical_declaration"]:
            text = get_node_text(node)
            if "function" in text or "=>" in text:
                for method in ["GET", "POST", "PUT", "DELETE", "PATCH"]:
                    if f"export async function {method}" in text or f"export function {method}" in text:
                        routes.append({
                            "type": "Next.js Route Handler",
                            "method": method,
                            "raw_signature": text.split("{")[0].strip()
                        })
                functions.append({"raw": text.split("{")[0].strip()})

        if node.type == "class_declaration":
            classes.append({"raw": get_node_text(node).split("{")[0].strip()})

        for child in node.children:
            traverse(child)

    traverse(root_node)

    return {
        "language": "typescript",
        "functions": functions,
        "classes": classes,
        "routes": routes,
        "ast_node_count": root_node.named_child_count
    }