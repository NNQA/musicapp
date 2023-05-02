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
        // Pause the current song if it is playing
        if (audioRef && !audioRef.paused) {
          audioRef.pause();
        }
    
        dispatch(setCurrentSong(song));
        dispatch(setPlaying(true));
    
        // Create a new audio element for the new song
        const newAudioRef = new Audio(song.audio);
        newAudioRef.play();
    
        // Set the new audio element as the current audio reference
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
