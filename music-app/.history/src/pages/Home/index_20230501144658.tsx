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
  const handlePlay = (song: Song) => {
    if (currentSong === null) {
      dispatch(setCurrentSong(song));
      dispatch(setPlaying(true));
      audioRef?.play();
    }
    else if (song !== currentSong) {
      handlePause();
    //   dispatch(setCurrentSong(song));
    //   const newAudioRef = new Audio(song.audio);
    //   newAudioRef.play();
    //   setAudioRef(newAudioRef);
    }
  };

  const handlePause = () => {
    audioRef?.pause();
    dispatch(setPlaying(false));
  };

  const handlePlayClick = (song: Song) => {
    console.log(playing);
    if (playing) {
      handlePause();
    } else {
      handlePlay(song);
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
