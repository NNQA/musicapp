import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}: any) => (
  <div className="flex items-center space-x-10">
    <div className="flex items-center space-x-4">
      <BiSkipPrevious
        size={30}
        color="#FFF"
        onClick={handlePrevSong}
        className="cursor-pointer transition hover:scale-90 duration-300"
      />
      {isPlaying ? (
        <BsFillPauseFill
          size={30}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer transition hover:scale-90 duration-300"
        />
      ) : (
        <BsFillPlayFill
          size={30}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer transition hover:scale-90 duration-300"
        />
      )}
      <BiSkipNext
        size={30}
        color="#FFF"
        onClick={handleNextSong}
        className="cursor-pointer transition hover:scale-90 duration-300"
      />
    </div>

    <div className="flex items-center space-x-8">
      <BsArrowRepeat
        size={20}
        color={repeat ? "#00ADB5" : "white"}
        onClick={() => setRepeat((prev: any) => !prev)}
        className="cursor-pointer transition hover:scale-90 duration-300"
      />
      <BsShuffle
        size={15}
        color={shuffle ? "#00ADB5" : "white"}
        onClick={() => setShuffle((prev: any) => !prev)}
        className="cursor-pointer transition hover:scale-90 duration-300"
      />
    </div>
  </div>
);

export default Controls;
