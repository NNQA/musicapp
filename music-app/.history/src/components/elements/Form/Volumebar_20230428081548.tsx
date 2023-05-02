import React from "react";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeOffFill,
} from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";

const VolumeBar = ({ value, min, max, onChange, setVolume }: any) => (
  <div className="flex items-center space-x-12 w-[150px]">
    <div>
      {value <= 1 && value > 0.5 && (
        <HiSpeakerWave size={15} color="#FFF" onClick={() => setVolume(0)} />
      )}
      {value <= 0.5 && value > 0 && (
        <BsVolumeDownFill size={15} color="#FFF" onClick={() => setVolume(0)} />
      )}
      {value === 0 && (
        <BsFillVolumeOffFill
          size={15}
          color="#FFF"
          onClick={() => setVolume(1)}
        />
      )}
    </div>
    <input
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      className="h-1 w-[75px] outline-none appearance-none dark:bg-gray-700"
    />
  </div>
);

export default VolumeBar;
