
import React, { useEffect, useState } from "react";
import { Song } from "@/lib/utilts/model";
function Home() {
    const [songs, setSongs] = useState<Song>();

    useEffect(() => {

    },[songs])
    return (
     <div className="w-full h-full bg-[#1e1e1f]">

    </div>
    );
}

export default Home;
