import React, { useRef, useEffect } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }: any) => {
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <audio
      src={activeSong?.audio}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;