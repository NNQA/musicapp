import { useState } from "react";
import Controls from "./Controls";
import VolumeBar from "./Volumebar";

const Playback = () => {
  const [volume, setVolume] = useState(0.3);
  return (
    <div className="px-[36px] flex items-center">
      <div>
        <Controls></Controls>
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
