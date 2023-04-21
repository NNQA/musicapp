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
import audio from "../../../public/aa.mp3";
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
function index() {
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

  return (
    <div className="bg-[#1e1e1f] font-font-slide overflow-y-scroll">
      <div className="px-[40px] pt-[32px] pb-[8px]">
        <p className="text-3xl font-font-slide text-white font-bold mb-[8px]">
          Profile
        </p>
        <hr />
      </div>
      <div className="px-[40px] mt-12 flex justify-between">
        <div className="flex items-center text-white space-x-4">
          {user?.image ? (
            <img
              src={user?.image}
              alt="Image User"
              className="h-[140px] w-[140px] rounded-md -bottom-4 bg-slate-50 p-2 shadow-md"
            ></img>
          ) : (
            <Image
              src={Userimg}
              alt="Image User"
              className="rounded-3xl h-[106px] w-[120px] shadow-sm"
            ></Image>
          )}
          <div className="flex flex-col space-y-2">
            <p className="text-2xl font-bold font-font-slide">
              Name:{user?.name}
            </p>
            <p className="text-xl opacity-70 font-bold">Email:{user?.email} </p>
            <Modaledit
              actionModal={actionModal}
              setActionModal={setActionModal}
            ></Modaledit>
          </div>
        </div>
        <div className="flex flex-row justify-between mr-10 pt-6">
          <div className="space-x-5 mt-8 mr-16">
            <button className="border-2  p-2 rounded-lg text-white">
              Your Insights
            </button>
            <button className="bg-[#d70117] text-white px-3 py-2 rounded-lg">
              Share
            </button>
            <button className="bg-[#d70117] text-white px-3 py-2 rounded-lg">
              Station
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 px-[40px] pt-[32px] text-white">
        <div className="flex justify-between items-center">
          <div className="pb-[8px]">
            <p className="text-3xl font-font-slide font-bold mb-[8px]">Track</p>
          </div>
          <div className="mr-5 text-base font-bold">
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
        </div>
        <hr />
      </div>
      {actionModal ? (
        <div className="px-[40px] cursor-pointer w-fit textt-white pt-[64px] mb-[12px]   flex">
          <ul className="w-[750px]">
            {/* <p className="text-xl font-font-slide text-white font-bold mb-[8px]">
                #title
              </p> */}
            {/* <hr className="mb-[30px]"/> */}
            {dataSong.map((item, idx) => (
              <li className=" p-2 flex mb-3 shadow-2xl" key={idx}>
                <div>
                  <img
                    src={item.img}
                    alt="Image Item"
                    className="p-2 w-[200px] h-[120px] rounded-full"
                  ></img>
                </div>

                <div className="w-full ml-4 text-white">
                  <div className="p-2 text-white">
                    <div>
                      <p>{item.title}</p>
                    </div>
                  </div>
                  <div
                    className="p-2 flex space-x-2"
                    onClick={() => setAction(!action)}
                  >
                    <div className="w-full">
                      <MediaPlayer src={item.audio} index={idx} />
                      <audio ref={mediaRef} />
                    </div>
                    <div className="border-2 w-fit flex items-center px-2 space-x-4 rounded-md">
                      <AiOutlineHeart></AiOutlineHeart>
                      <p className="text-sm">100</p>
                    </div>
                    <div
                      className="relative border-2 rounded-md flex items-center px-2 space-x-4"
                      onClick={() => handleShowcase(idx)}
                    >
                      {showcase === idx ? (
                        <div className="absolute h-[100px] w-[100px] top-8 right-[0.1px]">
                          {dataMore.map((state, idxM) => (
                            <div className="p-1 border-[1px] text-xs rounded-lg text-center flex flex-col">
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
                  <div></div>
                </div>
              </li>
            ))}
          </ul>

          <div className="w-fit text-white border-l-[1px] pl-12 ml-14">
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
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default index;
