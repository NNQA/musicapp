
import React, { useEffect, useState } from "react";
import { Song } from "@/lib/utilts/model";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {HiPlayCircle} from "react-icons/hi2"
import { Playing } from "@/redux/features/Playerslice";
function Home() {
    const [songs, setSongs] = useState<Song[]>([]);
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
    return (
     <div className="w-full h-full bg-[#1e1e1f]">
        {
            songs.map((item: Song, idx: any) => (
                <div className="text-white">
                    <p>
                        {item.title}
                    </p>
                    <HiPlayCircle onClick={() => dispatch(Playing(idx))}
                    ></HiPlayCircle>
                </div>
            ))
        }
    </div>
    );
}

export default Home;
