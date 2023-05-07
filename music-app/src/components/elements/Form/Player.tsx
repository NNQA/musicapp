
import { useRouter } from "next/router";
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
  setDuration,
}: any) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

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
    if (audioRef.current?.duration) {
      setDuration(audioRef.current?.duration);
    }
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  return (
    <div className="h-full">
      {activeSong ? (
        <div className="flex space-x-6 items-center cursor-pointer"
          onClick={() => router.push(`/song/${activeSong?.title}`)}>
          <img
            src={activeSong.image}
            alt="img song"
            className="h-[35px] rounded-full aspect-square"
          />
          <div>
            <p className="text-opacity-75 text-white"> {activeSong.title}</p>
            <p className="text-white">
              {activeSong.author.name}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
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
