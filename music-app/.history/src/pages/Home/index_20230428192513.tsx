
import React, { useEffect, useState } from "react";
import { Song } from "@/lib/utilts/model";
import axios from "axios";
function Home() {
    const [songs, setSongs] = useState<Song>();

    useEffect(() => {
        axios.get("/api/song/server")
            .then(data => {
                setSongs(data.data)
            })
    },[])
    return (
     <div className="w-full h-full bg-[#1e1e1f]">

    </div>
    );
}

export default Home;
