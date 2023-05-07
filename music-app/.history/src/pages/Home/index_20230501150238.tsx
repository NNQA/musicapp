import React, { use, useEffect, useState } from "react";
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
  const [audioRefs, setAudioRefs] = useState<(HTMLAudioElement | null)[]>([]);
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

  const handlePlayClick = (song: Song, idx: number) => {
    console.log(song);
  if (currentSong === null) {
    dispatch(setCurrentSong(song));
    dispatch(setPlaying(true));
    audioRefs[idx]?.play();
    console.log(audioRefs[idx]);
  } else if (song !== currentSong) {
    console.log(currentSong);
    handlePause();
    dispatch(setCurrentSong(song));
    dispatch(setPlaying(true));
    const newAudioRef = new Audio(song.audio);
    newAudioRef.play();
    const newRefs = [...audioRefs];
    newRefs[idx] = newAudioRef;
    setAudioRefs(newRefs);
    console.log(newRefs[idx]);
  }
  };
  return (
    <div className="w-full h-full bg-[#1e1e1f]">
      {songs.map((item: Song, idx: any) => (
        <div className="text-white" key={idx}>
          <p>{item.title}</p>
          <HiPlayCircle onClick={() => handlePlayClick(item,idx)}></HiPlayCircle>
          <audio
            ref={(el) => {
              const newRefs = [...audioRefs];
              newRefs[idx] = el;
              setAudioRefs(newRefs);
            }}
            src={item.audio}
          />
        </div>
      ))}
    </div>
  );
}

export default Home;