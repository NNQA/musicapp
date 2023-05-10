import React, { use, useEffect, useRef, useState } from "react";
import { Playlist, Song, User } from "@/lib/utilts/model";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { HiPauseCircle, HiPlayCircle } from "react-icons/hi2";
import {
  setAppeat,
  setCurrentSong,
  setSong,
  setPlaying,
} from "@/redux/reducer";
import Userimg from "../../static/user.png";
import Image from "next/image";
import Router from "next/router";
function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const { playing, currentSong, appear } = useSelector(
    (state: any) => state.audioPlayer
  );
  let count = 3;
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lists, setList] = useState<User[]>([]);
  const [playlist, setPlaylist] = useState<Playlist[]>([]);
  useEffect(() => {
    axios
      .get(`/api/user/${"admin"}`)
      .then((r) => {
        setList(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/api/song/server")
      .then((data) => {
        setSongs(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/api/playlist/getall")
      .then((data) => {
        console.log(data.data);
        setPlaylist(data.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const handlePlayClick = (song: Song) => {
    dispatch(setSong(songs));
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
  const random = (max: number) => {
    return Math.random() * (max - 1);
  };
  return (
    <div className="w-full h-full bg-[#1e1e1f] overflow-y-scroll">
      <div className="px-[40px] pt-[32px] pb-[8px]">
        <p className="text-3xl font-font-slide text-white font-bold mb-[8px]">
          Home
        </p>
        <hr />
      </div>
      <div className="flex">
        <div className="px-[48px] mt-24">
          <div className="text-xl font-font-slide text-white">
            <p className="font-bold">Latest Release</p>
          </div>
          {songs.map((item: Song, idx: any) => (
            <div>
              {idx - 1 === 0 ? (
                <div
                  className="text-white flex space-x-5 mt-4 group items-center w-fit hover:bg-white rounded-xl hover:bg-opacity-20 px-2 py-1"
                  key={idx}
                >
                  <img
                    src={item.image}
                    alt="img song"
                    className="w-[200px] aspect-square rounded-2xl"
                  />
                  <div className="space-y-3">
                    {playing ? (
                      <HiPauseCircle
                        className="group-hover:block hidden text-base"
                        onClick={() => handlePlayClick(item)}
                      ></HiPauseCircle>
                    ) : (
                      <HiPlayCircle
                        className="group-hover:block hidden text-base"
                        onClick={() => handlePlayClick(item)}
                      ></HiPlayCircle>
                    )}
                    <p>{item.title}</p>
                    <p>{item.date.toString()}</p>
                    <p className="text-2xl">Creator: {item.author.name}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
        <div className="px-[48px] mt-24 ml-24 cursor-pointer">
          <div className="text-xl font-font-slide text-white">
            <p className="font-bold">Top Song</p>
          </div>
          <div className="flex space-x-24">
            <div>
              {songs.map((item: Song, idx: any) => (
                <div>
                  {idx - 3 < 0 ? (
                    <div
                      className="text-white flex space-x-5 mt-4 group items-center w-fit hover:bg-white rounded-xl hover:bg-opacity-20 px-2 py-1"
                      key={idx}
                    >
                      {playing ? (
                        <HiPauseCircle
                          className="group-hover:block hidden text-base"
                          onClick={() => handlePlayClick(item)}
                        ></HiPauseCircle>
                      ) : (
                        <HiPlayCircle
                          className="group-hover:block hidden text-base"
                          onClick={() => handlePlayClick(item)}
                        ></HiPlayCircle>
                      )}
                      <img
                        src={item.image}
                        alt="img song"
                        className="w-[50px] aspect-square rounded-2xl"
                      />
                      <div className="space-y-3 items-center">
                        <p onClick={() => Router.push(`/song/${item.title}`)}>
                          {item.title}
                        </p>
                        <p className="text-base">Creator: {item.author.name}</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
            <div>
              {songs.map((item: Song, idx: any) => (
                <div>
                  {idx - 3 >= 1 && idx - 3 <= 3 ? (
                    <div
                      className="text-white flex space-x-5 mt-4 group items-center w-fit hover:bg-white rounded-xl hover:bg-opacity-20 px-2 py-1"
                      key={idx}
                    >
                      {playing ? (
                        <HiPauseCircle
                          className="group-hover:block hidden text-base"
                          onClick={() => handlePlayClick(item)}
                        ></HiPauseCircle>
                      ) : (
                        <HiPlayCircle
                          className="group-hover:block hidden text-base"
                          onClick={() => handlePlayClick(item)}
                        ></HiPlayCircle>
                      )}
                      <img
                        src={item.image}
                        alt="img song"
                        className="w-[50px] aspect-square rounded-2xl"
                      />
                      <div className="space-y-3 items-center">
                        <p>{item.title}</p>
                        <p className="text-base">Creator: {item.author.name}</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-[48px] mt-24  text-white font-font-slide w-full">
        <p className="text-3xl">Album</p>
        <div className="flex space-x-28 mt-12 cursor-pointer">
          {playlist.map((item: Playlist, idx) => (
            <div className="flex">
              {idx - 4 < 0 ? (
                <div
                  className="space-y-3"
                  onClick={() => Router.push(`/Playlist/${item.id}`)}
                >
                  {item.img === "" ? (
                    <Image
                      src={Userimg}
                      alt="Image User"
                      className="w-[400px] aspect-square "
                    ></Image>
                  ) : (
                    <img
                      src={item?.img as any}
                      alt="img User"
                      className="w-[500px] aspect-square rounded-lg "
                    />
                  )}
                  <p
                    className="text-base text-white text-opacity-70"
                    onClick={() => Router.push(`/user/${item.id}`)}
                  >
                    {item.title}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-[48px] mt-24  text-white font-font-slide w-full">
        <p className="text-3xl">Similar Artists</p>
        <div className="flex space-x-28 mt-12 cursor-pointer">
          {lists.map((item: User, idx) => (
            <div className="flex">
              {idx - 6 < 0 ? (
                <div className="space-y-3 flex flex-col items-center">
                  {item.image === "" ? (
                    <Image
                      src={Userimg}
                      alt="Image User"
                      className="w-[150px] aspect-square rounded-full object-cover"
                    ></Image>
                  ) : (
                    <img
                      src={item.image}
                      alt="img User"
                      className="w-[150px] aspect-square rounded-full"
                    />
                  )}
                  <p
                    className="text-xl"
                    onClick={() => Router.push(`/user/${item.id}`)}
                  >
                    {item.name}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
