from langgraph.graph import StateGraph, END
from app.agents.state import DocSyncState
from app.agents.nodes.extract_structure import extract_structure_node
from app.agents.nodes.generate_markdown import generate_markdown_node
from app.agents.nodes.generate_openapi import generate_openapi_node
from app.agents.nodes.compute_freshness import compute_freshness_node

def build_docsync_pipeline():
    workflow = StateGraph(DocSyncState)

    workflow.add_node("extract_structure", extract_structure_node)
    workflow.add_node("generate_markdown", generate_markdown_node)
    workflow.add_node("generate_openapi", generate_openapi_node)
    workflow.add_node("compute_freshness", compute_freshness_node)

    workflow.set_entry_point("extract_structure")
    workflow.add_edge("extract_structure", "generate_markdown")
    workflow.add_edge("generate_markdown", "generate_openapi")
    workflow.add_edge("generate_openapi", "compute_freshness")
    workflow.add_edge("compute_freshness", END)

    return workflow.compile()

docsync_app = build_docsync_pipeline()