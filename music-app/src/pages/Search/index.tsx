import { Song } from "@/lib/utilts/model";
import { setAppeat, setCurrentSong, setPlaying } from "@/redux/reducer";
import axios from "axios";
import Router from "next/router";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import DotLoader from "react-spinners/DotLoader";

function Searh() {
  const [song, setSongs] = useState<Song>();
  const [text, settext] = useState("");
  const [notFound, setNotFound] = useState("");
  const [loading, setLoading] = useState(false);
  const { playing, currentSong, appear, songs } = useSelector(
    (state: any) => state.audioPlayer
  );
  const dispatch = useDispatch();
  const SearchItem = async () => {
    setNotFound("");
    setLoading(true);
    setSongs(undefined);
    axios
      .post("/api/song/getsongName", { text })
      .then((data) => {
        console.log(data.data);
        setSongs(data.data);
        setLoading(false);
      })
      .catch((e) => {
        setNotFound(e.response.data.message);
        setLoading(false);
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
    <div className="cursor-pointer overflow-y-auto h-full bg-[#1e1e1f] text-white">
      <div className="">
        <div className="px-[30px] pt-12 flex items-center space-x-10">
          <div className=" w-fit items-center border-[0.1px] space-x-4 border-white border-opacity-25 flex p-1 rounded-xl">
            <svg height="18" width="20" viewBox="0 0 16 16" aria-hidden="true">
              <path
                fill="#FFFFFF"
                d="M11.87 10.835c.018.015.035.03.051.047l3.864 3.863a.735.735 0 1 1-1.04 1.04l-3.863-3.864a.744.744 0 0 1-.047-.051 6.667 6.667 0 1 1 1.035-1.035zM6.667 12a5.333 5.333 0 1 0 0-10.667 5.333 5.333 0 0 0 0 10.667z"
              ></path>
            </svg>
            <input
              className="w-[300px] focus:border-none py-[0.8px] pl-[1.5px] text-2xl ml-[1px] pr-[0.8px] bg-transparent outline-none"
              placeholder="Search"
              onChange={(e) => settext(e.currentTarget.value)}
            />
          </div>
          <p
            className="text-2xl shadow-xl  rounded-2xl px-4 py-2 hover:translate-x-1 hover:translate-y-1 border-[1px] border-white border-opacity-25"
            onClick={() => SearchItem()}
          >
            Send
          </p>
        </div>
        {loading ? (
          <div className="px-[30px] pt-12">
            <DotLoader color="#36d7b7" size={100} />
          </div>
        ) : (
          ""
        )}
        {song ? (
          <div className="px-[30px] pt-12">
            <div className="flex justify-between space-x-6 items-center space-y-2 hover:bg-white hover:bg-opacity-10 w-full px-3 py-4 mb-2  rounded-lg">
              <div className="flex  space-x-6 space-y-4 items-center">
                <div className="flex mt-2">
                  <svg
                    width="4"
                    height="15"
                    viewBox="0 0 4 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.20002 3.8C1.72263 3.8 1.2648 3.61035 0.927232 3.27279C0.589667 2.93522 0.400024 2.47739 0.400024 2C0.400024 1.52261 0.589667 1.06477 0.927232 0.727205C1.2648 0.389639 1.72263 0.199997 2.20002 0.199997C2.67741 0.199997 3.13525 0.389639 3.47282 0.727205C3.81038 1.06477 4.00002 1.52261 4.00002 2C4.00002 2.47739 3.81038 2.93522 3.47282 3.27279C3.13525 3.61035 2.67741 3.8 2.20002 3.8ZM2.20002 9.2C1.72263 9.2 1.2648 9.01035 0.927232 8.67279C0.589667 8.33522 0.400024 7.87739 0.400024 7.4C0.400024 6.92261 0.589667 6.46477 0.927232 6.12721C1.2648 5.78964 1.72263 5.6 2.20002 5.6C2.67741 5.6 3.13525 5.78964 3.47282 6.12721C3.81038 6.46477 4.00002 6.92261 4.00002 7.4C4.00002 7.87739 3.81038 8.33522 3.47282 8.67279C3.13525 9.01035 2.67741 9.2 2.20002 9.2ZM2.20002 14.6C1.72263 14.6 1.2648 14.4104 0.927232 14.0728C0.589667 13.7352 0.400024 13.2774 0.400024 12.8C0.400024 12.3226 0.589667 11.8648 0.927232 11.5272C1.2648 11.1896 1.72263 11 2.20002 11C2.67741 11 3.13525 11.1896 3.47282 11.5272C3.81038 11.8648 4.00002 12.3226 4.00002 12.8C4.00002 13.2774 3.81038 13.7352 3.47282 14.0728C3.13525 14.4104 2.67741 14.6 2.20002 14.6Z"
                      fill="#A4ABB8"
                    />
                  </svg>
                  <svg
                    width="4"
                    height="15"
                    viewBox="0 0 4 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.20002 3.8C1.72263 3.8 1.2648 3.61035 0.927232 3.27279C0.589667 2.93522 0.400024 2.47739 0.400024 2C0.400024 1.52261 0.589667 1.06477 0.927232 0.727205C1.2648 0.389639 1.72263 0.199997 2.20002 0.199997C2.67741 0.199997 3.13525 0.389639 3.47282 0.727205C3.81038 1.06477 4.00002 1.52261 4.00002 2C4.00002 2.47739 3.81038 2.93522 3.47282 3.27279C3.13525 3.61035 2.67741 3.8 2.20002 3.8ZM2.20002 9.2C1.72263 9.2 1.2648 9.01035 0.927232 8.67279C0.589667 8.33522 0.400024 7.87739 0.400024 7.4C0.400024 6.92261 0.589667 6.46477 0.927232 6.12721C1.2648 5.78964 1.72263 5.6 2.20002 5.6C2.67741 5.6 3.13525 5.78964 3.47282 6.12721C3.81038 6.46477 4.00002 6.92261 4.00002 7.4C4.00002 7.87739 3.81038 8.33522 3.47282 8.67279C3.13525 9.01035 2.67741 9.2 2.20002 9.2ZM2.20002 14.6C1.72263 14.6 1.2648 14.4104 0.927232 14.0728C0.589667 13.7352 0.400024 13.2774 0.400024 12.8C0.400024 12.3226 0.589667 11.8648 0.927232 11.5272C1.2648 11.1896 1.72263 11 2.20002 11C2.67741 11 3.13525 11.1896 3.47282 11.5272C3.81038 11.8648 4.00002 12.3226 4.00002 12.8C4.00002 13.2774 3.81038 13.7352 3.47282 14.0728C3.13525 14.4104 2.67741 14.6 2.20002 14.6Z"
                      fill="#A4ABB8"
                    />
                  </svg>
                </div>
                <img
                  src={song.image}
                  alt="img Song"
                  className="w-[50px] aspect-square rounded-xl"
                  onClick={() => handlePlayClick(song)}
                />
                <div>
                  <p onClick={() => Router.push(`/song/${song.title}`)}>
                    {song.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {notFound !== "" ? (
          <div className="px-[30px] pt-12">
            <p className="text-xl">{notFound}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Searh;
