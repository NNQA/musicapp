import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/redux";
import Layout from "./layout/layout";
import { toast, ToastContainer } from "react-toastify";
import { Suspense, useEffect, useMemo } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const memoizedLayout = useMemo(() => {
    return (
      <Layout>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
        <Component {...pageProps} />
      </Layout>
    );
  }, [Component, pageProps]);
  return (
    <SessionProvider session={session}>
      <Provider store={store}>{memoizedLayout}</Provider>
    </SessionProvider>
  );
}
