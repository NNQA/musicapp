import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Userimg from "../../static/user.png";
import Image from "next/image";
import userCurrent from "@/hook/currentuser";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CgMore } from "react-icons/cg";

import { MdPause } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { dataMore } from "@/lib/dataStaticSong";
import Modaledit from "@/pages/Profile/modal/Modaledit";
import axios from "axios";
import Link from "next/link";
import { Like, Song, User } from "@/lib/utilts/model";
import { useDispatch, useSelector } from "react-redux";
import { setAppeat, setCurrentSong, setPlaying } from "@/redux/reducer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

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
function Profile() {
  const [action, setAction] = useState(false);
  const [actionmodal, setActionmodal] = useState(true);
  const [showcase, setShowcase] = useState(-1);
  const [songs, setSongs] = useState([]);
  const [isliked, setIsliked] = useState([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [isplaying, setIsplaying] = useState(-1);
  const { playing, currentSong, appear } = useSelector(
    (state: any) => state.audioPlayer
  );
  const [user, setUser] = useState<User>();

  const route = useRouter();
  const { id } = route.query;
  const dispatch = useDispatch();
  const handleShowcase = (idx: number) => {
    if (showcase === idx) {
      setShowcase(-1);
    } else {
      setShowcase(idx);
    }
  };
  useEffect(() => {
    if (id) {
      console.log(id);
      axios
        .post("/api/user/getuserId", {
          id,
        })
        .then((data) => {
          console.log(data.data);
          setUser(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);
  useEffect(() => {
    if (user) {
      const id: string = user?.id;
      console.log(id);

      axios
        .post("/api/findsong/find", {
          id,
        })
        .then((songs) => {
          setAction(false);
          console.log(songs.data);
          setSongs(songs.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user, action]);
  useEffect(() => {
    if (user) {
      const id: string = user?.id;
      console.log(id);

      axios
        .post("/api/findsong/find", {
          id,
        })
        .then((songs) => {
          setAction(false);
          console.log(songs.data);
          setSongs(songs.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user, action]);
  const handlePlaying = (idx: number, song: Song) => {
    if (playing) {
      if (isplaying === idx) {
        setIsplaying(-1);
      } else {
        setIsplaying(idx);
      }
    }
    handlePlayClick(song);
  };
  useEffect(() => {
    axios
      .get("/api/isLiked")
      .then((data: any) => {
        console.log("isliked");
        setIsliked(data.data), setLikes(data.data), console.log(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
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
  const DeleteSong = async (song: Song) => {
    await axios
      .delete(`/api/song/server?id=${song.id}`)
      .then((r) => {
        setAction(true);
        toast.success("Deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((r) => {
        toast.error("Somethings is error, please try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  function formatDateString(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
  const handlePlayClick = (song: any) => {
    if (currentSong === null) {
      dispatch(setCurrentSong(song));
      dispatch(setPlaying(true));
      dispatch(setAppeat(true));
    } else if (song !== currentSong) {
      if (playing) {
        dispatch(setPlaying(false));
        dispatch(setCurrentSong(song));
      } else {
        dispatch(setCurrentSong(song));
      }
      dispatch(setPlaying(true));
    } else {
      if (playing) {
        dispatch(setPlaying(false));
      } else {
        dispatch(setPlaying(true));
      }
    }
  };

  return (
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
            <p className="text-xl opacity-70 font-bold">Email:{user?.email} </p>
          </div>
        </div>
      </div>
      <div className="mt-8 px-[40px] pt-[32px] text-white  ">
        <div className="flex justify-between items-center border-b-[0.5px] pb-[10px] border-white border-opacity-25">
          <p className="text-3xl font-font-slide font-bold ">Track</p>
          {/* <div className="space-x-5 mr-[100px]">
            <button className="border-2  p-2 rounded-lg text-white">
              Your Insights
            </button>
            <button className="bg-[#7c7979] text-white px-3 py-2 rounded-lg">
              Share
            </button>
            <button className="bg-[#7c7979] text-white px-3 py-2 rounded-lg">
              Station
            </button>
          </div> */}
        </div>
      </div>
      {actionmodal ? (
        <div className="px-[40px] cursor-pointer w-fit textt-white pt-[64px] mb-[12px] flex">
          <ul className="w-[1000px]">
            {songs.map((item: Song, idx) => (
              <li
                className="flex items-center text-white space-x-10 space-y-1 pr-4
                hover:bg-white hover:bg-opacity-5 hover:rounded-lg px-2 pb-2"
                key={idx}
              >
                {isplaying === idx ? (
                  <FaPlay
                    className="w-[100px] text-center text-opacity-80 text-white"
                    onClick={() => handlePlaying(idx, item)}
                  ></FaPlay>
                ) : (
                  <p className="w-[100px] text-center">{idx}</p>
                )}
                <div onClick={() => handlePlayClick(item)}>
                  <img
                    src={item.image}
                    alt="Image Item"
                    className="aspect-square w-[60px] object-cover my-1"
                  ></img>
                </div>

                <div className="w-full ml-4 text-white flex justify-between">
                  <div className="text-base font-bold w-2/3 transition">
                    <Link
                      href={`/Profile/song/${item.title}`}
                      className="hover:border-b-[1px] border-white border-opacity-50"
                    >
                      {item.title}
                    </Link>
                  </div>
                  <div className="w-fit mr-[36px]">
                    <p>{formatDateString(item.date as any)}</p>
                  </div>
                  <div className="flex space-x-16 items-center pb-1">
                    <div className="w-fit border-2 items-center px-2 space-x-4 rounded-md border-white border-opacity-25 pb-1">
                      {likedSongs.includes(item.id) ? (
                        <AiFillHeart
                          onClick={() => unlikeSong(item.id, user?.id)}
                        ></AiFillHeart>
                      ) : (
                        <AiOutlineHeart
                          onClick={() => likeSong(item.id, user?.id)}
                        ></AiOutlineHeart>
                      )}
                    </div>
                    <div
                      className="relative"
                      onClick={() => handleShowcase(idx)}
                    >
                      {showcase === idx ? (
                        <div className="absolute h-fit w-[90px] rounded-lg top-8 right-[0.1px]">
                          {dataMore.map((state, idxM) => (
                            <div
                              className="border-[1px] text-xs rounded-lg bg-[#1e1e1f] text-center border-white border-opacity-25"
                              onClick={() => DeleteSong(item)}
                            >
                              <p>{state.state}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="flex px-2 space-x-4 items-center border-2 w-fit rounded-md border-white border-opacity-25">
                        <CgMore className=""></CgMore>
                        <p className="text-base">More</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="w-fit text-white border-l-[0.1px] pl-12 space-y-6 border-white border-opacity-25">
            <div className=" text-base font-bold">
              <div className=" flex space-x-12 h-[30%] p-2">
                <div className="border-r-[1px]">
                  <p className="pr-8">Follower</p>
                  <p className="text-center mr-4">0</p>
                </div>
                <div className="border-r-[1px]">
                  <p className="pr-8">Following</p>
                  <p className="text-center mr-4">0</p>
                </div>
                <div className="">
                  <p className="pr-8">Track</p>
                  <p className="text-center mr-4">0</p>
                </div>
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

export default Profile;
