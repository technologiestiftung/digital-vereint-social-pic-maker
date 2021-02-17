import { FC } from "react";
import Head from "next/head";
import "../styles/globals.css";

const App: FC<{
  Component: FC;
  pageProps: Record<string, unknown>;
}> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Digital Vereint - Social Pics Maker</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
