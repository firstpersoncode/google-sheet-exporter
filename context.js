import { useState, createContext, useContext, useCallback } from "react";

const appContext = {
  nodes: [],
  accounts: [],
};

export function useAppState(pageProps) {
  const [ctx, setContext] = useState({ ...appContext, ...pageProps });

  function addNode(node) {
    setContext((v) => ({
      ...v,
      nodes: [...v.nodes, { ...node, id: String(Date.now()) }],
    }));
  }

  function removeNode(id) {
    setContext((v) => ({
      ...v,
      nodes: v.nodes
        .map((node) => {
          if (node.left === id) node.left = null;
          if (node.right === id) node.right = null;
          return node;
        })
        .filter((node) => node.id !== id),
    }));
  }

  const getNode = useCallback(
    (id) => ctx.nodes.find((node) => node.id === id),
    [ctx.nodes]
  );

  function connectNode(left, right) {
    setContext((v) => ({
      ...v,
      nodes: v.nodes.map((node) => {
        if (node.left === left) node.left = null;
        if (node.id === left) node.right = right;
        if (node.id === right) node.left = left;
        return node;
      }),
    }));
  }

  function disconnectNode(id) {
    setContext((v) => ({
      ...v,
      nodes: v.nodes.map((node) => {
        if (node.id === id) node.right = null;
        if (node.left === id) node.left = null;
        return node;
      }),
    }));
  }

  async function signIn() {
    try {
      const res = await fetch("/api/accounts");
      const data = await res.json();
      setContext((v) => ({ ...v, accounts: data }));
    } catch (err) {
      console.error(err.message || err);
    }
  }

  return {
    ...ctx,
    addNode,
    removeNode,
    getNode,
    connectNode,
    disconnectNode,
    signIn,
  };
}

export const AppContext = createContext(appContext);

export function useAppContext() {
  return useContext(AppContext);
}
