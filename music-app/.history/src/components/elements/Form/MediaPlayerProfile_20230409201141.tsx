import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle, AiOutlineHeart } from "react-icons/ai"

interface Props {
  src: string;
}

const MediaPlayer: React.FC<Props> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const mediaRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      setCurrentTime(mediaRef.current.currentTime);
    }
  };

  const handleProgressClick = (event: any) => {
    if (mediaRef.current) {
      const newTime = (event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * duration;
      mediaRef.current.currentTime = newTime;
    }
  };
  const handleLoadedMetadata = () => {
    console.log("aa");
    setDuration(media.duration);
    setCurrentTime(media.currentTime);
  };
  useEffect(() => {
    if (mediaRef.current) {
      const media = mediaRef.current;

      console.log('Duration:', media.duration);
      const handleLoadedMetadata = () => {
        console.log("aa");
        setDuration(media.duration);
        setCurrentTime(media.currentTime);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(media.currentTime);
      };

      media.addEventListener('loadedmetadata', handleLoadedMetadata);
      media.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        media.removeEventListener('loadedmetadata', handleLoadedMetadata);
        media.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [src]);

  useEffect(() => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.play();
      } else {
        mediaRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className='flex items-center'>
      <audio ref={mediaRef} src={src} onTimeUpdate={handleTimeUpdate} onLoadedData= />
      <div onClick={togglePlay}>
        {!isPlaying ?
          <AiFillPlayCircle className='w-6 h-6'></AiFillPlayCircle>
          : <AiFillPauseCircle className='w-6 h-6'></AiFillPauseCircle>}
      </div>
      <div className='flex space-x-4 ml-3 items-center'>
        <span>{currentTime}</span>
        <progress
          value={currentTime}
          max={duration}
          onClick={handleProgressClick}
          className='rounded-xl h-2 w-full'
        />
        <span>{duration}</span>
        <input
          type="range"
          min={0}
          max={10}
          step={0.0001}
          value={volume}
          onChange={handleVolumeChange}
          className='w-14'
        />
      </div>
    </div>
  );
};

export default MediaPlayer;
