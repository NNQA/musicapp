import React, { use } from "react";
import Userimg from "../../../static/user.png";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiOutlineHeart,
  AiOutlineSend,
} from "react-icons/ai";
import { HiBackspace } from "react-icons/hi2";
import { IoMdCodeDownload } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import { useRouter } from "next/router";
import userCurrent from "@/hook/currentuser";
import axios from "axios";
import { Comment, Song } from "@/lib/utilts/model";
import BounceLoader from "react-spinners/BounceLoader";
import SyncLoader from "react-spinners/SyncLoader";

function Song() {
  const { data: user } = userCurrent();
  const [isplaying, setIsplaying] = useState(false);
  const [songs, setSongs] = useState<Song>();
  const [cmt, setCmt] = useState<Comment[]>([]);
  const [textcmt, setTextcmt] = useState("");
  const [cmted, setCmted] = useState<string[]>([]);
  const [actioncmt, setActioncmt] = useState(false);
  const [actionDl, setActionDl] = useState(-1);

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
  const sId: any = songs?.id;
  useEffect(() => {
    if (sId) {
      axios
        .get(`/api/isCmt?sId=${sId}`)
        .then((data: any) => {
          console.log("isliked");
          setCmt(data.data), console.log(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [sId]);
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
      .then(data => {
        setCmt(prevCmts => prevCmts.filter(cmt => cmt.id !== cmtId));
        setActionDl(-1);
      })
      .catch(e => {
        console.log(e);
      })
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
          src={songs?.image as string}
          alt="Image User"
          className="w-[200px] h-[180px]"
        ></img>
        <div className="ml-[50px] space-y-6 mt-[60px]">
          <p className="text-base font-bold">Creater: {user?.name}</p>
          <h1 className="text-5xl font-bold">{songs?.title as string}</h1>
          <div className="flex space-x-28">
            <p>Datetime: {formatDateString(songs?.date as any)}</p>
            <p>Decripstion: {songs?.description}</p>
          </div>
        </div>
      </div>

      <div className="px-[40px] pt-[32px] pb-[8px] flex items-center space-x-12">
        <div onClick={() => handlePlaying()}>
          {!isplaying ? (
            <AiFillPlayCircle className="w-[50px] h-[50px]"></AiFillPlayCircle>
          ) : (
            <AiFillPauseCircle className="w-[50px] h-[50px]"></AiFillPauseCircle>
          )}
        </div>
        <div className="flex space-x-4">
          <IoMdCodeDownload className="w-[30px] h-[30px]"></IoMdCodeDownload>
          <FiMoreHorizontal className="w-[30px] h-[30px]"></FiMoreHorizontal>
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
            <div className="w-[40px]">
              {actionDl === idx ? (
                <SyncLoader color="#36d7b7" size={4}/>
              ) : (
                <HiBackspace
                  className="group-hover:block hidden text-3xl"
                  onClick={() => deleteComment(idx, comment.id)}
                ></HiBackspace>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Song;
