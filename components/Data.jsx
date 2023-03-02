import { useMemo } from "react";
import dynamic from "next/dynamic";

import { useAppContext } from "context";
import Sheet from "assets/Sheet.svg";

const Select = dynamic(() => import("./Select"));

export default function Data({ node }) {
  const { nodes, connectNode, disconnectNode } = useAppContext();
  const options = useMemo(
    () =>
      nodes
        .filter((n) => n.type === "exporter" && n.id !== node.id)
        .map((n) => ({
          label: n.id,
          value: n.id,
          icon: Sheet,
          disabled: n.left && n.left !== node.id,
        })),
    [nodes, node.id]
  );

  function addNode(nodeId) {
    connectNode(node.id, nodeId);
  }

  function deleteNode() {
    disconnectNode(node.id);
  }

  return (
    <Select
      placeholder="Connect to exporter node"
      value={node.right}
      onChange={addNode}
      onDelete={deleteNode}
      options={options}
    />
  );
}
