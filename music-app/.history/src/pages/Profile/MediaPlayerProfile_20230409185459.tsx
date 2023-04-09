import React, { useState } from 'react';

function MediaPlayer(props : any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Play/Pause toggle function
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Volume change handler
  const handleVolumeChange = (event: any) => {
    setVolume(event.target.value);
  };

  // Time update handler
  const handleTimeUpdate = (event: any) => {
    setCurrentTime(event.target.currentTime);
    setDuration(event.target.duration);
  };

  // Progress bar click handler
  const handleProgressClick = (event: any ) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const percentage = (x / width) * 100;
    const seekTime = (percentage / 100) * duration;
    setCurrentTime(seekTime);
    props.mediaRef.current.currentTime = seekTime;
  };

  return (
    <div className="">
      <div className="">
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} />
        <span>{currentTime.toFixed(2)}</span>
        <progress max={duration} value={currentTime} onClick={handleProgressClick}></progress>
        <span>{duration.toFixed(2)}</span>
      </div>
      <audio ref={props.mediaRef} src={props.src} onTimeUpdate={handleTimeUpdate}></audio>
    </div>
  );
}

export default MediaPlayer;
