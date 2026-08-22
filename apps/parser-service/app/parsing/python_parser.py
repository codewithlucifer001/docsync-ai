import tree_sitter_python as tspython
from tree_sitter import Language, Parser

PY_LANGUAGE = Language(tspython.language())
parser = Parser(PY_LANGUAGE)

def parse_python_code(source_code: str) -> dict:
    source_bytes = bytes(source_code, "utf8")
    tree = parser.parse(source_bytes)
    root_node = tree.root_node

    functions = []
    classes = []
    routes = []

    def get_node_text(node):
        return source_bytes[node.start_byte:node.end_byte].decode("utf8")

    def traverse(node):
        if node.type == "decorated_definition":
            text = get_node_text(node)
            for method in ["get", "post", "put", "delete", "patch"]:
                if f".{method}(" in text:
                    decorator_line = text.split("\n")[0].strip()
                    func_def = text.split("\n")[1].strip() if len(text.split("\n")) > 1 else ""
                    routes.append({
                        "type": "FastAPI Route",
                        "decorator": decorator_line,
                        "signature": func_def
                    })

        elif node.type == "function_definition":
            functions.append({"raw": get_node_text(node).split(":")[0].strip()})

        elif node.type == "class_definition":
            classes.append({"raw": get_node_text(node).split(":")[0].strip()})

        for child in node.children:
            traverse(child)

    traverse(root_node)

    return {
        "language": "python",
        "functions": functions,
        "classes": classes,
        "routes": routes,
        "ast_node_count": root_node.named_child_count
    }