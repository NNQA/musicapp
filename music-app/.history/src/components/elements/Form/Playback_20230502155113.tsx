import { Song } from "@/lib/utilts/model";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import VolumeBar from "./Volumebar";

const Playback = () => {
  const { playing, currentSong, duration, appear } = useSelector(
    (state: any) => state.audioPlayer
  );
  const [currentDuration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const handleTimeUpdate = (event: any) => {
    setCurrentTime(event.target.currentTime);
  };
  useEffect(() => {

  },[appear])
  return (
    <div className="px-[52px] flex items-center bg-[#2f2f2f] fixed bottom-0 w-full">
      <div className="flex-1 flex items-center py-6 space-x-24">
        <Controls
          isPlaying={playing}
          //   isActive={isActive}
          //   repeat={repeat}
          //   setRepeat={setRepeat}
          //   shuffle={shuffle}
          //   setShuffle={setShuffle}
          //   currentSongs={currentSongs}
          //   handlePlayPause={handlePlayPause}
          //   handlePrevSong={handlePrevSong}
          //   handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
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
          // currentIndex={currentIndex}  
          // onEnded={handleNextSong}
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
