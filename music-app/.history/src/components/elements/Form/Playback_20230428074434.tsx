import { useState } from "react";
import { useSelector } from "react-redux";
import Controls from "./Controls";
import VolumeBar from "./Volumebar";

const Playback = () => {
  const [volume, setVolume] = useState(0.3);
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state: any) => state.player);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  return (
    <div className="px-[36px] flex items-center">
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
      </div>
      <VolumeBar
        value={volume}
        min="0"
        max="1"
        onChange={(event: any) => setVolume(event.target.value)}
        setVolume={setVolume}
      />
    </div>
  );
};
export default Playback;