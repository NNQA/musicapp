import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import Userimg from "../../static/user.png";
import Image from "next/image";
import userCurrent from "@/hook/currentuser";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CgMore } from "react-icons/cg";
import mtp from "../../static/mtp.jpg";
import mck from "../../static/mck.jpg";
import wean from "../../static/wean.png";
import { TiTick } from "react-icons/ti";
import { HiUsers } from "react-icons/hi";
import { dataMore } from "@/lib/dataStaticSong";
import Modaledit from "@/components/elements/Form/Modaledit";
import axios from "axios";
import Link from "next/link";
import { Like, Song } from "@/lib/utilts/model";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log(session);
  if (session === null) {
    return {
      props: {
        data: null,
      },
    };
  }
  return {
    props: { },
  };
}
function Profile({ data }: any) {
  const { data: user } = userCurrent();
  const session = useSession();
  const [action, setAction] = useState(false);
  const [actionmodal, setActionmodal] = useState(true);
  const [showcase, setShowcase] = useState(-1);
  const [songs, setSongs] = useState([]);
  const [isliked, setIsliked] = useState([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const handleShowcase = (idx: number) => {
    if (showcase == idx) {
      setShowcase(-1);
    } else {
      setShowcase(idx);
    }
  };
  useEffect(() => {
    if (user) {
      const id: string = user?.id;
      console.log(id);

      axios
        .post("/api/findsong/find", {
          id,
        })
        .then((songs) => {
          console.log(songs.data);
          setSongs(songs.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user]);
  useEffect(() => {
    if (session) {
      axios
        .get("/api/isLiked")
        .then((data: any) => {
          console.log("isliked");
          setIsliked(data.data);
          setLikes(data.data);
          console.log(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [session]);
  useEffect(() => {
    setLikedSongs(likes.map((like) => like.songId));
  }, [likes]);
  const likeSong = async (ids: any, idu: any) => {
    axios
      .post("/api/isLiked", {
        ids,
        idu,
      })
      .then((data) => {
        setLikes([...likes, data.data]);
        console.log(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const unlikeSong = async (ids: any, idu: any) => {
    const like = likes.find((like) => like.songId === ids);
    if (!like) return;

    await axios.delete(`/api/isLiked?ids=${ids}&idu=${idu}`);
    setLikes(likes.filter((l) => l.id !== like.id));
  };

  function formatDateString(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  return (
    <>
      {data === null ? (
        <div className="bg-[#1e1e1f] font-font-slide h-full text-white text-center space-y-12">
          <p className="mt-[220px] text-3xl">
            Sorry you need to login to make this side effect
          </p>
          <div className="flex w-fit mx-auto space-x-12">
            <p className="text-base">
              Login with your account{" "}
              <Link href="/login" className="text-[#00ADB5] ">
                Login
              </Link>
            </p>
            <p className="text-base">
              Haven't account{" "}
              <Link href="/signup" className="text-[#00ADB5] ">
                Register
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[#1e1e1f] font-font-slide overflow-y-scroll h-full">
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
                <p className="text-xl opacity-70 font-bold">
                  Email:{user?.email}{" "}
                </p>
                <Modaledit
                  actionModal={actionmodal}
                  setActionModal={setActionmodal}
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
          {actionmodal ? (
            <div className="px-[40px] cursor-pointer w-fit textt-white pt-[64px] mb-[12px] flex">
              <ul className="w-[750px]">
                {/* <p className="text-xl font-font-slide text-white font-bold mb-[8px]">
                #title
              </p> */}
                {/* <hr className="mb-[30px]"/> */}
                {songs.map((item: Song, idx) => (
                  <li
                    className="flex items-center text-white space-x-10 space-y-1 pr-4
                hover:bg-white hover:bg-opacity-5 hover:rounded-lg px-2 pb-2"
                    key={idx}
                  >
                    <p>{idx}</p>
                    <div>
                      <img
                        src={item.image}
                        alt="Image Item"
                        className="aspect-square w-[60px] object-cover my-1"
                      ></img>
                    </div>

                    <div className="w-full ml-4 text-white flex justify-between">
                      <div className="text-base font-bold w-2/3">
                        <Link href={`/Profile/song/${item.title}`}>
                          {item.title}
                        </Link>
                      </div>
                      <div className="w-fit mr-[36px]">
                        <p>{formatDateString(item.date as any)}</p>
                      </div>
                      <div className="flex space-x-16">
                        <div className="w-fit border-2 items-center px-2 space-x-4 rounded-md">
                          {/* {isliked.some((l: Like) => l.songId === item.id && l.userId === user?.id)  */}
                          {likedSongs.includes(item.id) ? (
                            <AiFillHeart
                              onClick={() => unlikeSong(item.id, user?.id)}
                            ></AiFillHeart>
                          ) : (
                            <AiOutlineHeart
                              onClick={() => likeSong(item.id, user?.id)}
                            ></AiOutlineHeart>
                          )}
                          {/* <AiOutlineHeart></AiOutlineHeart> */}
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
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default Profile;
