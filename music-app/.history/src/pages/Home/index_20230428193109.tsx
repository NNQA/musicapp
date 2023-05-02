
import React, { useEffect, useState } from "react";
import { Song } from "@/lib/utilts/model";
import axios from "axios";
import {HiPlayCircle} from "react-icons/hi2"
function Home() {
    const [songs, setSongs] = useState<Song[]>([]);

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
                    <HiPlayCircle
                    ></HiPlayCircle>
                </div>
            ))
        }
    </div>
    );
}

export default Home;
