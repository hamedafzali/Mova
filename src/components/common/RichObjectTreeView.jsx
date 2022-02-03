import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Link } from "react-router-dom";
export default function RichObjectTreeView({ data, expanded }) {
  const renderTree = (nodes) => (
    <Link to={`/category/${nodes.categoryId}`} className="app-link">
      <TreeItem
        key={nodes.categoryId}
        nodeId={nodes.categoryId}
        label={
          nodes.parentId === "root"
            ? `ALL in ${nodes.displayName} Category`
            : nodes.displayName
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    </Link>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={expanded}
      //expanded={["men"]}
      defaultExpandIcon={<ChevronRightIcon />}

      //sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {renderTree(data)}
    </TreeView>
  );
}
