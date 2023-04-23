import React, { useEffect } from "react";
import SLideMenu from "@/components/elements/Form/SLideMenu";
import BarUser from "@/components/elements/Form/BarUser";
import Link from "next/link";

import { getSession } from "next-auth/react";
import { NextPageContext } from "next";


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session !== null) {
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
function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  useEffect(() =>{
   console.log("asdsad")
  })
  return (
    <div className="flex">
      <SLideMenu />
      <div className="flex flex-col w-full h-screen">
        <BarUser></BarUser>
        {children}
      </div>
    </div>
  );
}

export default Layout;
