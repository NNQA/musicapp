import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import PropTypes from 'prop-types'

const Waveform = ({ audio }: any) => {
    const containerRef = useRef()
    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current as any,
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
Waveform.propTypes = {
    audio: PropTypes.string.isRequired,
}

export default Waveform