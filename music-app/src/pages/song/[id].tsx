import React from "react";
import Userimg from "../../static/user.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiOutlineSend,
} from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiBackspace } from "react-icons/hi2";
import { IoMdCodeDownload } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import { Router, useRouter } from "next/router";
import userCurrent from "@/hook/currentuser";
import axios from "axios";
import { Comment, Song } from "@/lib/utilts/model";
import BounceLoader from "react-spinners/BounceLoader";
import SyncLoader from "react-spinners/SyncLoader";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import { useDispatch, useSelector } from "react-redux";
import { setAppeat, setCurrentSong, setPlaying } from "@/redux/reducer";
import { Playlist } from "@prisma/client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function Song() {
  const { data: user } = userCurrent();
  const [isplaying, setIsplaying] = useState(false);
  const [song, setSongs] = useState<Song>();
  const [cmt, setCmt] = useState<Comment[]>([]);
  const [textcmt, setTextcmt] = useState("");
  const [actioncmt, setActioncmt] = useState(false);
  const [actionDl, setActionDl] = useState(-1);
  const [likes, setLikes] = useState(true);
  const [option, setOption] = useState(false);
  const [optonPlaylist, setOptionPlaylist] = useState(false);
  const [playlist, setPlaylist] = useState<Playlist[]>([]);
  const { playing, currentSong, appear, songs } = useSelector(
    (state: any) => state.audioPlayer
  );
  const dispatch = useDispatch();
  const handlePlaying = () => {
    togglePlay();
  };
  const togglePlay = () => {
    setIsplaying(!isplaying);
  };
  function formatDateString(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    console.log(id);

    if (id) {
      console.log("asd");
      axios
        .post("/api/song/getsongId", {
          id,
        })
        .then((data) => {
          console.log(data.data);
          setSongs(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);
  const uId: string = user?.id;
  const sId: any = song?.id;
  useEffect(() => {
    if (sId && uId) {
      axios
        .get(`/api/like/getLikedId?sId=${sId}&?uId=${uId}`)
        .then((data: any) => {
          if (data.data.message === "notLike") {
            setLikes(false);
          } else {
            setLikes(true);
          }
          console.log(data.data.message);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [sId, uId]);
  const handShowplaylist = async () => {
    axios
      .get(`/api/playlist/server?id=${user.id}`)
      .then((data) => {
        console.log(data);
        setPlaylist(data.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const Comment = async () => {
    setActioncmt(true);
    axios
      .post("/api/isCmt", {
        sId,
        uId,
        textcmt,
      })
      .then((data) => {
        console.log(data.data);
        setCmt([...cmt, data.data]);
        setTextcmt("");
        setActioncmt(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteComment = async (idx: any, cmtId: any) => {
    setActionDl(idx);
    console.log(cmtId);
    axios
      .delete(`/api/isCmt?cmtId=${cmtId}`)
      .then((data) => {
        setCmt((prevCmts) => prevCmts.filter((cmt) => cmt.id !== cmtId));
        setActionDl(-1);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (sId && uId) {
      axios
        .get(`/api/like/getLikedId?sId=${sId}&?uId=${uId}`)
        .then((data: any) => {
          setLikes(true);

          console.log(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [sId, uId]);
  const likeSong = async (ids: any, idu: any) => {
    axios
      .post("/api/isLiked", {
        ids,
        idu,
      })
      .then((data) => {
        setLikes(true);
        console.log(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const unlikeSong = async (ids: any, idu: any) => {
    await axios
      .delete(`/api/isLiked?ids=${ids}&idu=${idu}`)
      .then((data) => {
        setLikes(false);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleAddToplaylist = async (pId: string) => {
    axios
      .post("/api/addtoplaylist/server", {
        sId,
        pId,
      })
      .then((r) => {
        console.log(r.data);
        toast.success("Added to Playlist!", {
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
      .catch((e) => {
        toast.error(e.response.data.message, {
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
    <div className="bg-[#1e1e1f] h-full text-white font-font-slide overflow-y-auto">
      <div className="px-[40px] pt-[32px] pb-[8px]">
        <p className="text-3xl font-font-slide text-white font-bold mb-[8px]">
          Information Song
        </p>
        <hr />
      </div>

      <div className="px-[40px] pt-[32px] pb-[24px] flex font-font-slide shadow-lg">
        <img
          src={song?.image as string}
          alt="Image User"
          className="w-[200px] h-[180px]"
        ></img>
        <div className="ml-[50px] space-y-6 mt-[60px]">
          <p className="text-base font-bold">Creater: {song?.author.name}</p>
          <h1 className="text-5xl font-bold">{song?.title as string}</h1>
          <div className="flex space-x-28">
            <p>Datetime: {formatDateString(song?.date as any)}</p>
            <p>Decripstion: {song?.description}</p>
          </div>
        </div>
      </div>

      <div className="px-[40px] pt-[32px] pb-[8px] flex items-center space-x-12">
        <div onClick={() => handlePlaying()}>
          {!playing ? (
            <AiFillPlayCircle
              className="w-[50px] h-[50px]"
              onClick={() => handlePlayClick(song)}
            ></AiFillPlayCircle>
          ) : (
            <AiFillPauseCircle
              className="w-[50px] h-[50px]"
              onClick={() => handlePlayClick(song)}
            ></AiFillPauseCircle>
          )}
        </div>
        <div className="flex space-x-4 items-center">
          <div className="cursor-pointer">
            {likes ? (
              <AiFillHeart
                onClick={() => unlikeSong(sId, user?.id)}
              ></AiFillHeart>
            ) : (
              <AiOutlineHeart
                onClick={() => likeSong(sId, uId)}
              ></AiOutlineHeart>
            )}
          </div>
          <IoMdCodeDownload className="w-[30px] h-[30px]"></IoMdCodeDownload>
          <FiMoreHorizontal
            className="w-[30px] h-[30px] cursor-pointer"
            onClick={() => {
              setOption(!option);
              setOptionPlaylist(false);
            }}
          ></FiMoreHorizontal>
          <div>
            {option ? (
              <div className="fixed mt-6 bg-[#2f2f31] shadow-lg border-t-[1px]  w-[150px] h-[80px] items-center text-center space-y-2 py-2 flex flex-col rounded-lg cursor-pointer">
                <p
                  className="w-full hover:bg-white hover:bg-opacity-10 hover:rounded-lg"
                  onClick={() => {
                    setOptionPlaylist(!optonPlaylist);
                    handShowplaylist();
                  }}
                >
                  Add to Playlist
                </p>
                <p className="w-full hover:bg-white hover:bg-opacity-10 hover:rounded-lg">
                  Share
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {optonPlaylist ? (
              <div className="fixed ml-[135px] mt-[50px] bg-[#2f2f31] shadow-lg border-t-[1px]  w-[150px] h-fit items-center text-center space-y-2 py-2 flex flex-col rounded-lg cursor-pointer">
                {playlist.map((item: Playlist, index) => (
                  <p
                    key={index}
                    className="w-full hover:bg-white hover:bg-opacity-20 hover:rounded-lg"
                    onClick={() => handleAddToplaylist(item.id)}
                  >
                    {item.title}
                  </p>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="px-[40px] pt-[32px] pb-[8px]">
        <p className="text-xl font-font-slide text-white font-bold mb-[8px]">
          Comment
        </p>
        <div className="flex items-center space-x-3 mb-[12px]">
          <Image
            src={Userimg}
            alt="Image User"
            className="w-[40px] h-[40px] rounded-md"
          ></Image>
          <input
            type="text"
            placeholder="Write a comment"
            className="w-full bg-transparent
             outline-none p-2 border-b-[1px] "
            onChange={(e: any) => setTextcmt(e.currentTarget.value)}
            value={textcmt}
          />
          {actioncmt ? (
            <BounceLoader color="#36d7b7" size={20} className="mt-6" />
          ) : (
            <AiOutlineSend
              className="text-lg mt-6"
              onClick={() => Comment()}
            ></AiOutlineSend>
          )}
        </div>
      </div>
      <div className="px-[56px] pt-[32px] pb-[8px] items-center flex flex-col">
        {cmt.map((comment, idx) => (
          <div
            key={comment.id}
            className="w-full flex space-x-12 mb-5 group cursor-pointer"
          >
            <img
              src={comment.user.image}
              alt=""
              className="w-[60px] aspect-square rounded-full"
            />
            <div className="w-full">
              <p className="font-font-slide opacity-70">{comment.user.name}</p>
              <p className="text-base w-full">{comment.text}</p>
            </div>
            {comment.userId === user.id ? (
              <div className="w-[40px]">
                {actionDl === idx ? (
                  <SyncLoader color="#36d7b7" size={4} />
                ) : (
                  <HiBackspace
                    className="group-hover:block hidden text-3xl"
                    onClick={() => deleteComment(idx, comment.id)}
                  ></HiBackspace>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Song;
