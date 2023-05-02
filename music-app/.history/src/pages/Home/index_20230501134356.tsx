import React, { useEffect, useState } from "react";
import { Song } from "@/lib/utilts/model";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { HiPlayCircle } from "react-icons/hi2";
import { setPlaying } from "@/redux/reducer";
import { setCurrentSong } from "@/redux/features/Playerslice";
function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const { playing, currentSong } = useSelector((state: any) => state.audioPlayer);
  const dispatch = useDispatch();
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
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
    if (audioRef) {
      if (playing) {
        audioRef.play();
      } else {
        audioRef.pause();
      }
    }
  }, [playing, audioRef]);
  const handlePlayClick = (song: Song) => {
    if (song === currentSong) {
      dispatch(setPlaying(!playing));
    } else {
      dispatch(setCurrentSong(song));
      dispatch(setPlaying(true));
      if (audioElement) {
        audioElement.src = song.audio;
        audioElement.load();
        audioElement.play();
      }
    }
  };
  return (
    <div className="w-full h-full bg-[#1e1e1f]">
      {songs.map((item: Song, idx: any) => (
        <div className="text-white" key={idx}>
          <p>{item.title}</p>
          <HiPlayCircle onClick={() => handldePP(item)}></HiPlayCircle>
          <audio ref={(el) => setAudioRef(el)} src={item.audio} />
        </div>
      ))}
    </div>
  );
}

export default Home;
