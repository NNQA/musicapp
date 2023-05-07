import { Song } from "@/lib/utilts/model";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import VolumeBar from "./Volumebar";
import { setNextSong, setPlaying, setPreSong } from "@/redux/reducer";

const Playback = () => {
  const { playing, currentSong, currentSongIndex, songs, appear } = useSelector(
    (state: any) => state.audioPlayer
  );
  const dispatch = useDispatch();
  const [currentDuration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const handlePlayPause = () => {
    if (playing) {
      dispatch(setPlaying(false));
    } else {
      dispatch(setPlaying(true));
    }
  };
  const handleTimeUpdate = (event: any) => {
    setCurrentTime(event.target.currentTime);
  };
  const handleNextSong = () => {
    if(shuffle) {
      dispatch(setNextSong(Math.floor(Math.random() * songs.length)));  
    } else {
      dispatch(setNextSong(currentSongIndex + 1));  
    }
  };
  const handlePrevSong = () => {
    dispatch(setPreSong(currentSongIndex - 1));
  };

  useEffect(() => {}, [appear]);
  return (
    <div className="px-[52px] flex items-center bg-[#2f2f2f] fixed bottom-0 w-full">
      <div className="flex-1 flex items-center py-6 space-x-24">
        <Controls
          isPlaying={playing}
          //   isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSong}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={currentDuration}
          onInput={(event: any) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={currentSong as Song}
          volume={volume}
          isPlaying={playing}
          seekTime={seekTime}
          repeat={repeat}
          setDuration={setDuration}
          currentIndex={currentSongIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event: any) => setAppTime(event.target.currentTime)}
          onLoadedData={(event: any) => setDuration(event.target.duration)}
        ></Player>
      </div>
      <div className="">
        <VolumeBar
          value={volume}
          min="0"
          max="1"
          onChange={(event: any) => setVolume(event.target.value)}
          setVolume={setVolume}
        />
      </div>
    </div>
  );
};
export default Playback;
