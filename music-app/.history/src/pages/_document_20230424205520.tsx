import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import { useState } from "react";
import SLideMenu from "@/components/elements/Form/SLideMenu";
import BarUser from "@/components/elements/Form/BarUser";
import Layout from "./layout/layout";
export default function Document() {
  const [selectedPage, setSelectedPage] = useState("Home");

  const handleButtonClick = (pageName: string) => {
    setSelectedPage(pageName);
  };
  return (
    <Html lang="en">
      <Head />
      <body>
        
        <Main />
        <NextScript></NextScript>
      </body>
    </Html>
  );
}
// <Main />
// <NextScript />
