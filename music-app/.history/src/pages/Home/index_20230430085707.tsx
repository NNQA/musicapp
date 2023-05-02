
import React, { useEffect, useState } from "react";
import { Song } from "@/lib/utilts/model";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {HiPlayCircle} from "react-icons/hi2"
import { Playing } from "@/redux/features/Playerslice";
import { setPlaying } from "@/redux/reducer";
import handlde from "../api/getCurrentUser";
function Home() {
    const [songs, setSongs] = useState<Song[]>([]);
    const { playing} = useSelector((state: any) => state.audioPlayer);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get("/api/song/server")
            .then(data => {
                setSongs(data.data)
            })
            .catch(e => {
                console.log(e);
            })
    },[])
    const handldePP = () => {
        if(playing) {
            return {
                
            }
        }
        dispatch(setPlaying(!playing))
    }
    return (
     <div className="w-full h-full bg-[#1e1e1f]">
        {
            songs.map((item: Song, idx: any) => (
                <div className="text-white" key={idx}>
                    <p>
                        {item.title}
                    </p>
                    <HiPlayCircle onClick={() => handldePP()}
                    ></HiPlayCircle>
                    <audio src={item.audio}></audio>
                </div>
            ))
        }
    </div>
    );
}

export default Home;
