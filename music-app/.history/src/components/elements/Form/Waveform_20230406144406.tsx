import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import PropTypes from 'prop-types'

const Waveform = ({ audio }: any) => {
    const containerRef = useRef()
    const waveSurferRef = useRef({
        isPlaying: () => false,
      });
      const [isPlaying, toggleIsPlaying] = useState(false);
    
      useEffect(() => {
        const waveSurfer = WaveSurfer.create({
          container: containerRef.current as any,
          responsive: true,
          barWidth: 2,
          barHeight: 10,
          cursorWidth: 0,
        });
        waveSurfer.load(audio);
        waveSurfer.on('ready', () => {
          waveSurferRef.current  = waveSurfer as any;
        });
    
        return () => {
          waveSurfer.destroy();
        };
      }, [audio]);

    return (
<WaveSurferWrap>
      <button
        onClick={() => {
          waveSurferRef.current.playPause();
          toggleIsPlaying(waveSurferRef.current.isPlaying());
        }}
        type="button"
      >
        {isPlaying ? <FaPauseCircle size="3em" /> : <FaPlayCircle size="3em" />}
      </button>
      <div ref={containerRef} />
    </WaveSurferWrap>
    )
}
Waveform.propTypes = {
    audio: PropTypes.string.isRequired,
}

export default Waveform