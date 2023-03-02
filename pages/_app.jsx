import "styles/globals.css";

import Head from "next/head";
import { Xwrapper } from "react-xarrows";

import { AppContext, useAppState } from "context";

export default function App({ Component, pageProps }) {
  const appState = useAppState(pageProps);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Xwrapper>
        <AppContext.Provider value={appState}>
          <Component />
        </AppContext.Provider>
      </Xwrapper>
    </>
  );
}
