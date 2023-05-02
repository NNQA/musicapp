import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Controls from "./Controls";
import Seekbar from "./Seekbar";
import VolumeBar from "./Volumebar";

const Playback = () => {
  const { playing, currentSong, duration } = useSelector(
    (state: any) => state.audioPlayer
  );
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const handleTimeUpdate = (event: any) => {
    setCurrentTime(event.target.currentTime);
  };
  // useEffect(() => {
  //   if (audioRef) {
  //     audioRef.addEventListener("timeupdate", handleTimeUpdate);
  //     setDuration(audioRef.duration);
  //   }
  //   return () => {
  //     if (audioRef) {
  //       audioRef.removeEventListener("timeupdate", handleTimeUpdate);
  //     }
  //   };
  // }, [audioRef]);

  // const handleSeek = (event: any) => {
  //   setSeekTime(event.target.value);
  //   audioRef.currentTime = event.target.value;
  // };
  return (
    <div className="px-[36px] flex items-center w-[600px]">
      <div className="flex-1 flex flex-col items-center justify-center px-12">
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
          value={currentTime}
          min="0"
          max={duration}
          onInput={(event: any) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={currentTime}
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
