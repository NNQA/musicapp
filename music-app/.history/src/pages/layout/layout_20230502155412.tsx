import React, { useEffect } from "react";
import SLideMenu from "@/components/elements/Form/SLideMenu";
import BarUser from "@/components/elements/Form/BarUser";
import Playback from "@/components/elements/Form/Playback";
import { useSelector } from "react-redux";



function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const {appear } = useSelector(
    (state: any) => state.audioPlayer
  );
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
