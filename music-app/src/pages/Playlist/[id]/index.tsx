import { Playlist, Playlist_Song, Song } from "@/lib/utilts/model";
import {
  setAppeat,
  setCurrentSong,
  setPlaying,
  setSong,
} from "@/redux/reducer";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Item() {
  const router = useRouter();
  const [list, setList] = useState<Playlist_Song[]>([]);
  const [playlist, setPlaylist] = useState<Playlist>();
  const { playing, currentSong, appear, songs } = useSelector(
    (state: any) => state.audioPlayer
  );
  const dispatch = useDispatch();
  let id: any;
  useEffect(() => {
    id = router.query;
  }, [id]);

  useEffect(() => {
    console.log("first");
    if (id.id) {
      const pId = id.id;
      console.log(pId);
      axios
        .post("/api/playlist/getplaylistId", { pId })
        .then((v) => {
          console.log(v.data);
          setPlaylist(v.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);
  const handlePlayClick = (song: Song) => {
    let songs: Song[] = [];
    list.forEach((item: Playlist_Song) => {
      songs.push(item.song as Song);
    });
    dispatch(setSong(song));
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
  const handleNothaveSong = () => {
    toast.error("No songs in playlist", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handlePlayAll = () => {
    if (list.length === 0) {
      handleNothaveSong();
      return;
    }
    let song: Song[] = [];
    list.forEach((item: Playlist_Song) => {
      song.push(item.song as Song);
    });
    dispatch(setSong(song));
    dispatch(setCurrentSong(song[0]));
    dispatch(setPlaying(true));
    dispatch(setAppeat(true));
    if (playing) {
      dispatch(setPlaying(false));
    } else {
      dispatch(setPlaying(true));
    }
  };
  useEffect(() => {
    if (playlist && playlist.id) {
      axios
        .get(`/api/addtoplaylist/server?id=${playlist.id}`)
        .then((v) => {
          setList(v.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [playlist, list]);
  const deleteSong = async (id: string) => {
    axios
      .delete(`/api/addtoplaylist/server?id=${id}`)
      .then((r) => {
        toast.success("Deleted to Playlist!", {
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
        toast.error("Failure deleted to Playlist!", {
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
  return (
    <div className="bg-[#1e1e1f] font-font-slide overflow-y-scroll h-full w-full">
      <div className="px-[40px] pt-[32px] pb-[8px] text-white border-white border-opacity-25 flex w-full">
        <p className="text-3xl font-font-slide font-bold items-center border-b-[0.01px] pb-[10px]">
          Playlist
        </p>
        <svg
          width="22"
          height="28"
          viewBox="0 0 22 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.375 16.3402V21.0277C20.375 21.8428 19.8518 22.5271 19.0859 22.7855L17.7969 23.2543C16.2793 23.7652 14.75 22.6437 14.75 21.0277C14.7465 20.6126 14.8752 20.2071 15.1175 19.87C15.3598 19.5329 15.7031 19.2817 16.0977 19.1527L19.0859 18.0892C19.8518 17.8314 20.375 17.1553 20.375 16.3402ZM20.375 16.3402V2.39842C20.3746 2.30872 20.3536 2.2203 20.3136 2.13999C20.2736 2.05969 20.2157 1.98963 20.1444 1.93523C20.0731 1.88082 19.9902 1.84353 19.9022 1.82621C19.8142 1.80889 19.7233 1.81201 19.6367 1.83534L7.95312 4.97655C7.74935 5.0341 7.57014 5.15705 7.44309 5.32644C7.31604 5.49584 7.2482 5.70231 7.25 5.91405V19.1562C7.25 19.9713 6.72676 20.6562 5.96094 20.914L2.91406 21.9687C2.10078 22.243 1.625 22.9777 1.625 23.8437C1.625 25.4597 3.17891 26.5713 4.67188 26.0703L5.96094 25.6015C6.72676 25.3437 7.25 24.6594 7.25 23.8437V19.1562"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="px-[40px] pt-[32px] pb-[24px] flex font-font-slide shadow-lg text-white">
        <img
          src={playlist?.img as string}
          alt="Image User"
          className="w-[200px] h-[180px]"
        ></img>
        <div className="ml-[50px] space-y-6 mt-[60px]">
          <p className="text-base font-bold">Creater: {playlist?.user.name}</p>
          <h1 className="text-5xl font-bold">
            Name playlist: {playlist?.title as string}
          </h1>
        </div>
      </div>
      <div className="ml-[75px] pt-[32px] pb-[8px] flex items-center space-x-12 text-white">
        {!playing ? (
          <AiFillPlayCircle
            className="w-[50px] h-[50px]"
            onClick={() => handlePlayAll()}
          ></AiFillPlayCircle>
        ) : (
          <AiFillPauseCircle
            className="w-[50px] h-[50px]"
            onClick={() => handlePlayAll()}
          ></AiFillPauseCircle>
        )}
      </div>

      <div className="px-[40px] pt-[32px] pb-[24px]  font-font-slide shadow-lg text-white cursor-pointer">
        {list.map((item: Playlist_Song, index: number) => (
          <div
            key={index}
            className="flex justify-between space-x-6 items-center space-y-4 hover:bg-white hover:bg-opacity-10 w-full px-3 py-2 mb-2  rounded-lg"
          >
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
                src={item.song.image}
                alt="img Song"
                className="w-[50px] aspect-square rounded-xl"
              />
              <div>
                <p>{item.song.title}</p>
              </div>
            </div>
            <div onClick={() => deleteSong(item.id)}>
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5H17M16 5L15.133 17.142C15.0971 17.6466 14.8713 18.1188 14.5011 18.4636C14.1309 18.8083 13.6439 19 13.138 19H4.862C4.35614 19 3.86907 18.8083 3.49889 18.4636C3.1287 18.1188 2.90292 17.6466 2.867 17.142L2 5H16ZM7 9V15V9ZM11 9V15V9ZM12 5V2C12 1.73478 11.8946 1.48043 11.7071 1.29289C11.5196 1.10536 11.2652 1 11 1H7C6.73478 1 6.48043 1.10536 6.29289 1.29289C6.10536 1.48043 6 1.73478 6 2V5H12Z"
                  stroke="#A4ABB8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Item;
