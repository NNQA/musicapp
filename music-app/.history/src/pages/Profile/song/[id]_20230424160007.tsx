import React, { use } from "react";
import Userimg from "../../../static/user.png";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { IoMdCodeDownload } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import { useRouter } from "next/router";
import userCurrent from "@/hook/currentuser";
import axios from "axios";
function index() {
  const { data: user } = userCurrent();
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);

  const handlePlaying = () => {
    togglePlay();
  };
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    console.log(id)
    
    if (id) {
      console.log("asd")
      axios
        .post("/api/song/getsongId", {
          id,
        })
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);

  return (
    <div className="bg-[#1e1e1f] h-full text-white font-font-slide">
      <div className="px-[40px] pt-[32px] pb-[8px]">
        <p className="text-3xl font-font-slide text-white font-bold mb-[8px]">
          Information Song
        </p>
        <hr />
      </div>

      <div className="px-[40px] pt-[32px] pb-[24px] flex font-font-slide shadow-lg">
        <Image
          src={Userimg}
          alt="Image User"
          className="w-[200px] h-[180px]"
        ></Image>
        <div className="ml-[50px] space-y-6 mt-[60px]">
          <p className="text-base font-bold">Creater: {user?.name}</p>
          <h1 className="text-5xl font-bold">Name Song</h1>
          <div className="flex space-x-28">
            <p>Datetime</p>
            <p>Like:</p>
          </div>
        </div>
      </div>

      <div className="px-[40px] pt-[32px] pb-[8px] flex items-center space-x-12">
        <div onClick={() => handlePlaying()}>
          {!isPlaying ? (
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
            className="w-full focus:border-none bg-transparent
             outline-none hover:border-[1px] p-2 border-b-[1px] "
          />
        </div>
      </div>
    </div>
  );
}

export default index;
