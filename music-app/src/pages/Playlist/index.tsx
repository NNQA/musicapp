import React, { useEffect, useRef, useState } from "react";
import mck from "../../static/mck.jpg";
import Image from "next/image";
import { MdCreateNewFolder } from "react-icons/md";
import Router from "next/router";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import axios from "axios";
import { Playlist } from "@prisma/client";
import userCurrent from "@/hook/currentuser";
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log(session);
  if (session === null) {
    return {
      redirect: {
        destination: "/Sorry",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
function Playlist() {
  const itemsPerRow = 5;
  const countLine = 1;
  const inputRef = useRef(null);
  const [playlist, setPlaylist] = useState<Playlist[]>([]);
  const { data: user } = userCurrent();

  useEffect(() => {
    if (user && user.id) {
      console.log("asdsad");
      axios
        .get(`/api/playlist/server?id=${user.id}`)
        .then((data) => {
          console.log(data);
          setPlaylist(data.data);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }, [user]);
  return (
    <div className="bg-[#1e1e1f] font-font-slide overflow-y-scroll h-full w-full">
      <div className="px-[40px] pt-[32px] pb-[8px]">
        <p className="text-3xl font-font-slide text-white font-bold border-b-[0.01px] pb-[10px] border-white border-opacity-25">
          Playlist
        </p>
      </div>
      <div
        className="px-[40px] pt-[32px] pb-[8px]"
        onClick={() => Router.push("/Playlist/modal")}
      >
        <div className="bg-white bg-opacity-10 w-[190px] px-4 py-3 rounded-xl h-[200px] flex flex-col items-center">
          <MdCreateNewFolder className="text-[150px]  text-white text-opacity-60 rounded-lg"></MdCreateNewFolder>
          <p className="text-white font-font-slide mt-2">Create a playlist</p>
        </div>
      </div>
      <div className="px-[40px] pt-[32px] pb-[8px]">
        <p className="text-3xl font-font-slide text-white font-bold border-b-[0.01px] pb-[10px] border-white border-opacity-25">
          List
        </p>
      </div>
      <div
        className="mx-[40px] pt-[32px] pb-[8px] w-[1400px] grid-cols-5 grid-flow-row grid "
        ref={inputRef}
      >
        {playlist.map((item: Playlist, index) => (
          <div
            className="bg-white bg-opacity-10 px-6 w-[230px] py-1 rounded-xl h-[300px] mb-12 space-y-8 cursor-pointer"
            key={index}
            onClick={() => Router.push(`/Playlist/${item.title}`)}
          >
            <p className="text-white text-xl font-font-slide mt-2  overflow-hidden">
              {item.title}
            </p>
            <img
              src={item?.img as any}
              alt="Playlist Image"
              className="w-[180px] aspect-square object-fill rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;
