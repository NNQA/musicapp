import React, { useEffect, useRef, useState } from 'react'
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from 'next'
import Userimg from "../../static/user.png"
import Image from 'next/image';
import userCurrent from '@/hook/currentuser';
import { data } from '@/components/elements/Form/data';
import Modaledit from '@/components/elements/Form/Modaledit';
import { AiFillPlayCircle, AiFillPauseCircle, AiOutlineHeart } from "react-icons/ai"
import WaveSurfer from 'wavesurfer.js';
import Waveform from '@/components/elements/Form/Waveform';
import audio from "../../../public/aa.mp3"

import { WaveSurferParams } from 'wavesurfer.js/types/params';


// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props: {}
//   }
// }
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).self = window;

const waveformOptions: WaveSurferParams = {
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple',
  cursorColor: 'navy'
};
function index() {
  // const { data: user } = userCurrent();
  const session = useSession();
  const [action, setAction] = useState(false);
  const [actionModal, setActionModal] = useState(true);
  const [wavesurfer, setWaveSurfer] = useState(null);
  const waveformRef = useRef(null);
  const audioRef = useRef(null);


  

  useEffect(() => {
    if (waveformRef.current && audioRef.current) {
      const ws = WaveSurfer.create({
        ...waveformOptions,
        container: waveformRef.current,
        audioContext: window?.AudioContext ?? window?.webkitAudioContext
      });

      ws.load(audioRef.current);
      setWaveSurfer(ws);

      return () => {
        ws.destroy();
      };
    }
  }, [waveformRef, audioRef]);

  // const handlePlayPause = () => {
  //   if (wavesurfer) {
  //     wavesurfer.playPause();
  //   }
  // };

  return (
    <div className='px-20 pb-5'>
      <div className='bg-slate-200 pb-1'>
        <div className='flex relative items-center p-10 bg-gray-500 text-white'>
          <Image
            src={Userimg}
            alt="Image User"
            className='h-50 w-25 absolute rounded-md -bottom-4 bg-slate-50 p-2 shadow-md'>

          </Image>
          <div className='ml-[150px] mt-12'>
            <p className='text-2xl'>
              {/* Name: {session.data?.user?.name} */}
            </p>
            <p className='text-xl opacity-70'>
              {/* Email: {user?.email} */}
            </p>
          </div>
        </div>
        <div className='flex flex-row justify-between mr-10'>
          <Modaledit actionModal={actionModal} setActionModal={setActionModal}
          ></Modaledit>
          <div className='space-x-5 mt-8'>
            <button className='border-2 bg-[#f50] p-2 rounded-lg text-white'>Your Insights</button>
            <button className='border-2 bg-white p-2 rounded-lg'>Share</button>
            <button className='border-2 bg-white p-2 rounded-lg'>Station</button>
          </div>

        </div>
      </div>
      <div className=''>
        <div className='px-8 py-2 border-2 w-full'>
          <h3 className='text-2xl'>Track</h3>
        </div>

      </div>



      <div className='px-6 border-2 py-3 cursor-pointer w-full'>
        <div className='flex'>
          <div>
            <Image
              src={Userimg}
              alt="Image Item"
              className='w-[75px] h-[75px]'>
            </Image>
          </div>
          <div className='w-full'>
            <div className='p-2'>
              <div>
                <p>tile Song Name</p>
              </div>
            </div>
            <div className='p-2 flex space-x-5' onClick={() => setAction(!action)}>
              {/* {actionModal ?
                <audio controls className='w-2/3 h-[24px]'
                  src={audio}>

                </audio>
                : ''} */}

              <div id="waveform" ref={waveformRef}></div>

              <audio src="/example.mp3" ref={audio}></audio>

              {/* <button onClick={handlePlayPause}>Play / Pause</button> */}
              <div className='border-2 w-fit flex items-center px-2 space-x-4'>

                <AiOutlineHeart></AiOutlineHeart>
                <p className='text-sm'>100</p>
              </div>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default index