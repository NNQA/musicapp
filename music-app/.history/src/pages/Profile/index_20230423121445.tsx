import React, { ReactFragment, useEffect, useRef, useState } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { NextPageContext } from "next";
import Userimg from "../../static/user.png";
import Image from "next/image";
import userCurrent from "@/hook/currentuser";
import {
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { CgMore } from "react-icons/cg";
import mtp from "../../static/mtp.jpg";
import mck from "../../static/mck.jpg";
import wean from "../../static/wean.png";
import { TiTick } from "react-icons/ti";
import { HiUsers } from "react-icons/hi";
import { dataSong, dataMore } from "@/lib/dataStaticSong";
import PerfectScrollbar from "react-perfect-scrollbar";
import MediaPlayer from "@/components/elements/Form/MediaPlayerProfile";
import { data } from "@/components/elements/Form/data";
import Modaledit from "@/components/elements/Form/Modaledit";
import Router from "next/router";
import axios from "axios";

{
  /* <div className="w-full">
                      <MediaPlayer src={item.audio} index={idx} />
                      <audio ref={mediaRef} /> */
}
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log(session);
  if (session === null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {},
  };
}
async function index() {
  const { data: user } = userCurrent();
  const [action, setAction] = useState(false);
  const [actionModal, setActionModal] = useState(true);
  const mediaRef = useRef(null);
  const [showcase, setShowcase] = useState(-1);
  const handleShowcase = (idx: number) => {
    if (showcase == idx) {
      setShowcase(-1);
    } else {
      setShowcase(idx);
    }
  };
  const id: string = user?.id;
  console.log(id)
  const tempVariant = await axios.post('/api/findsong/findsong', {
    id,
  })
  console.log(tempVariant);
  return (
    <div className="bg-[#1e1e1f] font-font-slide overflow-y-scroll">
      <div className="px-[40px] pt-[32px] pb-[8px]">
        <p className="text-3xl font-font-slide text-white font-bold border-b-[0.01px] pb-[10px] border-white border-opacity-25">
          Profile
        </p>
      </div>
      <div className="px-[40px] mt-12 flex justify-between space-x-10">
        <div className="flex items-center text-white">
          <div>
            {user?.image ? (
              <img
                src={user?.image}
                alt="Image User"
                className="w-[200px] aspect-square rounded-full object-cover "
              ></img>
            ) : (
              <Image
                src={Userimg}
                alt="Image User"
                className="w-[200px] aspect-square rounded-full object-cover"
              ></Image>
            )}
          </div>
          <div className="flex flex-col space-y-4 ml-[25px] tracking-widest">
            <p className="text-4xl font-bold font-font-slide">
              Name:{user?.name}
            </p>
            <p className="text-xl opacity-70 font-bold">Email:{user?.email} </p>
            <Modaledit
              actionModal={actionModal}
              setActionModal={setActionModal}
            ></Modaledit>
          </div>
        </div>
      </div>
      <div className="mt-8 px-[40px] pt-[32px] text-white  ">
        <div className="flex justify-between items-center border-b-[0.5px] pb-[10px] border-white border-opacity-25">
          <p className="text-3xl font-font-slide font-bold ">Track</p>
          <div className="space-x-5 mr-[100px]">
            <button className="border-2  p-2 rounded-lg text-white">
              Your Insights
            </button>
            <button className="bg-[#7c7979] text-white px-3 py-2 rounded-lg">
              Share
            </button>
            <button className="bg-[#7c7979] text-white px-3 py-2 rounded-lg">
              Station
            </button>
          </div>
        </div>
      </div>
      {actionModal ? (
        <div className="px-[40px] cursor-pointer w-fit textt-white pt-[64px] mb-[12px] flex">
          <ul className="w-[750px]">
            {/* <p className="text-xl font-font-slide text-white font-bold mb-[8px]">
                #title
              </p> */}
            {/* <hr className="mb-[30px]"/> */}
            {dataSong.map((item, idx) => (
              <li className="flex items-center text-white space-x-10 space-y-1 pr-4
                hover:bg-white hover:bg-opacity-5 hover:rounded-lg px-2 pb-2" key={idx}>
                <p>
                  {idx}
                </p>
                <div>
                  <img
                    src={item.img}
                    alt="Image Item"
                    className="aspect-square w-[60px] object-cover my-1"
                  ></img>
                </div>

                <div className="w-full ml-4 text-white flex justify-between">
                  <div className="text-base font-bold">
                    <p>{item.title}</p>
                  </div>
                  <div className="flex space-x-16">
                    <div className="w-fit flex border-2 items-center px-2 space-x-4 rounded-md">
                      <AiOutlineHeart></AiOutlineHeart>
                      <p className="text-sm">100</p>
                    </div>
                    <div
                      className="relative border-2 w-fit rounded-md flex items-center px-2 space-x-4"
                      onClick={() => handleShowcase(idx)}
                    >
                      {showcase === idx ? (
                        <div className="absolute h-fit w-[90px] rounded-lg top-8 right-[0.1px]">
                          {dataMore.map((state, idxM) => (
                            <div className="p-1 border-[1px] text-xs rounded-lg bg-[#1e1e1f] text-center flex flex-col">
                              <p>{state.state}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                      <CgMore></CgMore>
                      <p className="text-sm">More</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="w-fit text-white border-l-[0.1px] pl-12 space-y-6 border-white border-opacity-25">
            <div className=" text-base font-bold">
              <div className=" flex space-x-12 h-[30%]">
                <div className="border-r-[1px]">
                  <p className="pr-8">Follower</p>
                  <p>0</p>
                </div>
                <div className="border-r-[1px]">
                  <p className="pr-8">Following</p>
                  <p>0</p>
                </div>
                <div className="">
                  <p className="pr-8">Track</p>
                  <p>0</p>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold">For Artists</h1>
              <div
                className="flex items-center space-x-6 my-4 hover:shadow-xl
                            hover:p-2 hover:rounded-2xl hover:border-b-2 hover:border-gray-500"
              >
                <Image
                  src={mtp}
                  alt="img artists"
                  className="h-10 w-10 rounded-full border-2"
                />
                <div className="space-y-1 w-[100px]">
                  <p className="text-sm">Son Tung Mtp</p>
                  <p className="flex">
                    <HiUsers></HiUsers>
                    <span className="text-xs">100k.follow</span>
                  </p>
                </div>
                <TiTick className="text-white"></TiTick>
              </div>
              <div
                className="flex items-center space-x-6 my-4 hover:shadow-xl 
                            hover:p-2 hover:rounded-2xl hover:border-b-2 hover:border-gray-500"
              >
                <Image
                  src={wean}
                  alt="img artists"
                  className="h-10 w-10 rounded-full border-2"
                />
                <div className="space-y-1 w-[100px]">
                  <p className="text-sm">Wean</p>
                  <p className="flex">
                    <HiUsers></HiUsers>
                    <span className="text-xs">100k.follow</span>
                  </p>
                </div>
                <TiTick className="text-white"></TiTick>
              </div>
              <div
                className="flex items-center space-x-6 my-4 hover:shadow-xl 
                            hover:p-2 hover:rounded-2xl hover:border-b-2 hover:border-gray-500"
              >
                <Image
                  src={mck}
                  alt="img artists"
                  className="h-10 w-10 rounded-full border-2"
                />
                <div className="space-y-1 w-[100px]">
                  <p className="text-sm">MCK</p>
                  <p className="flex">
                    <HiUsers></HiUsers>
                    <span className="text-xs">100k.follow</span>
                  </p>
                </div>
                <TiTick className="text-white"></TiTick>
              </div>
            </div>
            <button
            onClick={() => Router.push(`/Profile/song/[${"asd"}]`)}>
                asdasdad
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default index;
