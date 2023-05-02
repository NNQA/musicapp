import { useState } from "react";
import { useSelector } from "react-redux";
import Controls from "./Controls";
import Seekbar from "./Seekbar";
import VolumeBar from "./Volumebar";

const Playback = () => {
  //   const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
  //     useSelector((state: any) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  return (
    <div className="px-[36px] flex items-center w-[600px]">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
        //   isPlaying={isPlaying}
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
