import React, { useEffect, useState } from "react";
import { Song } from "@/lib/utilts/model";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { HiPlayCircle } from "react-icons/hi2";
import { setCurrentSong, setPlaying } from "@/redux/reducer";
function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const { playing, currentSong } = useSelector(
    (state: any) => state.audioPlayer
  );
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
  const handlePlayClick = (song: Song) => {
    if (song === currentSong) {
      if (audioRef?.paused) {
        audioRef?.play();
      } else {
        audioRef?.pause();
      }
      dispatch(setPlaying(!playing));
    } else {
      dispatch(setCurrentSong(song));
      dispatch(setPlaying(true));
      const newAudioRef = new Audio(song.audio);
      newAudioRef.play();
      setAudioRef(newAudioRef);
    }
  };
  return (
    <div className="w-full h-full bg-[#1e1e1f]">
      {songs.map((item: Song, idx: any) => (
        <div className="text-white" key={idx}>
          <p>{item.title}</p>
          <HiPlayCircle onClick={() => handlePlayClick(item)}></HiPlayCircle>
          <audio ref={(el) => setAudioRef(el)} src={item.audio} />
        </div>
      ))}
    </div>
  );
}

export default Home;
