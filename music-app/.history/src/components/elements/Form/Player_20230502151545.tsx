import React, { useRef, useEffect } from "react";

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}: any) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, activeSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  }, [seekTime]);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  return (
    <div className="h-full">
      <div className="flex text-white space-x-6 text-opacity-75 ">
        <img src={activeSong.image} alt="img song" className="h-[35px] rounded-full aspect-square" />
        <div>

        </div>
        <p> {activeSong.title}</p>
      </div>
      <audio
        src={activeSong?.audio}
        ref={audioRef}
        loop={repeat}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
      />
    </div>
  );
};

export default Player;