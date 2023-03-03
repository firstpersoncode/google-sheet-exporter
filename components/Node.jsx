import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Card, SvgIcon } from "@mui/material";
import Xarrow, { useXarrow } from "react-xarrows";
import Draggable from "react-draggable";

import { useAppContext } from "context";
import Data from "assets/Data.svg";
import Sheet from "assets/Sheet.svg";

const Header = dynamic(() => import("./Header"));

const titles = {
  data: "Data",
  exporter: "Export to Google Sheets",
};

const icons = {
  data: (
    <SvgIcon component={Data} viewBox="-3 -0 35 35" sx={{ color: "#848484" }} />
  ),
  exporter: <SvgIcon component={Sheet} viewBox="-3 -0 35 35" />,
};

const bodies = {
  data: dynamic(() => import("./Data")),
  exporter: dynamic(() => import("./Exporter")),
};

export default function Node({ node }) {
  const nodeRef = useRef();
  const updateXarrow = useXarrow();
  const { removeNode } = useAppContext();
  const { title, icon, Body } = useMemo(
    () => ({
      title: titles[node.type],
      icon: icons[node.type],
      Body: bodies[node.type],
    }),
    [node.type]
  );

  function handleDelete() {
    removeNode(node.id);
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      onDrag={updateXarrow}
      onStop={updateXarrow}
    >
      <Card
        ref={nodeRef}
        id={node.id}
        sx={{
          cursor: "grab",
          padding: "16px",
          width: 400,
          overflow: "visible",
          border: "1px solid #DBDBDB",
        }}
      >
        <Header title={title} icon={icon} onDelete={handleDelete} />
        <Body node={node} />
        {node.right && <Xarrow start={node.id} end={node.right} />}
      </Card>
    </Draggable>
  );
}
