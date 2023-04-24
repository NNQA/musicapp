import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/redux";
import SLideMenu from "@/components/elements/Form/SLideMenu";
import BarUser from "@/components/elements/Form/BarUser";
import Layout from "./layout/layout";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import { useEffect } from "react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    console.log("asdsd");
  })
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
