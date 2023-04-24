import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import SLideMenu from "@/components/elements/Form/SLideMenu";
import BarUser from "@/components/elements/Form/BarUser";
import Layout from "./layout/layout";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Profile from "./profile";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log("asdsd");
  });
  return (
    <div>
      {/* <SLideMenu />
      <Layout>
        <Link href={"/Home"}>Home</Link>
      </Layout>
      <BarUser></BarUser> */}
    </div>
  );
}
