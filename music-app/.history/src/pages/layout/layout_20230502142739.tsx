import React, { useEffect } from "react";
import SLideMenu from "@/components/elements/Form/SLideMenu";
import BarUser from "@/components/elements/Form/BarUser";
import Playback from "@/components/elements/Form/Playback";



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
      <Playback></Playback>
    </div>
  );
}

export default Layout;
