import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

const Waveform = ({ audio }: any) => {
    const containerRef = useRef()
    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
        })
        waveSurfer.load(audio)

        return () => {
            waveSurfer.destroy()
        }
    }, [audio])

    return (
        <div>Waveform</div>
    )
}

export default Waveform