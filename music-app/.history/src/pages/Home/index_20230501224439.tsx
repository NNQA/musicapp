import React, { use, useEffect, useRef, useState } from "react";
import { Song } from "@/lib/utilts/model";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { HiPlayCircle } from "react-icons/hi2";
import { setCurrentSong, setDuration, setPlaying } from "@/redux/reducer";
function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const { playing, currentSong } = useSelector(
    (state: any) => state.audioPlayer
  );
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const handlePlayClick = (song: Song) => {
    if (currentSong === null) {
      dispatch(setCurrentSong(song));
      dispatch(setPlaying(true));
      dispatch(setDuration(audioRef.current?.duration))
      // audioRef?.current?.play();
    } else if (song !== currentSong) {
      dispatch(setCurrentSong(song));
      dispatch(setPlaying(true));
      dispatch(setDuration(audioRef.current?.duration))
      audioRef?.current?.pause();
      audioRef?.current?.load();
      audioRef?.current?.play();
    } else {
      if (playing) {
        audioRef?.current?.pause();
        dispatch(setPlaying(false));
      } else {
        audioRef?.current?.play();
        dispatch(setDuration(audioRef.current?.duration))
        dispatch(setPlaying(true));
      }
    }
  };
  return (
    <div className="w-full h-full bg-[#1e1e1f]">
      {songs.map((item: Song, idx: any) => (
        <div className="text-white" key={idx}>
          <p>{item.title}</p>
          <HiPlayCircle onClick={() => handlePlayClick(item)}></HiPlayCircle>
          <audio ref={audioRef} src={item.audio}/>
        </div>
      ))}
    </div>
  );
}

export default Home;
