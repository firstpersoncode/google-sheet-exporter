import { Box } from "@mui/material";

import nodes from "data/nodes.json";
import { useAppContext } from "context";
import Bar from "components/Bar";
import Node from "components/Node";

export function getServerSideProps() {
  return {
    props: { nodes },
  };
}

export default function Home() {
  const { nodes } = useAppContext();

  return (
    <>
      <Bar />
      <Box
        sx={{
          minHeight: "calc(100vh - 72px)",
          padding: "16px",
          backgroundColor: "#eee",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-around",
        }}
      >
        {nodes.map((node) => (
          <Node key={node.id} node={node} />
        ))}
      </Box>
    </>
  );
}
