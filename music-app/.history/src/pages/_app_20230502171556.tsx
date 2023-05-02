import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/redux";
import Layout from "./layout/layout";
import { Suspense, useEffect, useMemo } from "react";
import Loading from "./loading";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // const memoizedLayout = useMemo(() => {
  //   return (

  //   );
  // }, [Component, pageProps]);
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
