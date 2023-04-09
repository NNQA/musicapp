import React, { useEffect, useRef, useState } from 'react'
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from 'next'
import Userimg from "../../static/user.png"
import Image from 'next/image';
import userCurrent from '@/hook/currentuser';
import { data } from '@/components/elements/Form/data';
import Modaledit from '@/components/elements/Form/Modaledit';
import { AiFillPlayCircle, AiFillPauseCircle, AiOutlineHeart } from "react-icons/ai"
import audio from "../../../public/aa.mp3"
import WaveSurfer from "wavesurfer.js";


import { WaveSurferParams } from 'wavesurfer.js/types/params';
import MediaPlayer from '@/components/elements/Form/MediaPlayerProfile';


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

function index() {
  // const { data: user } = userCurrent();

  const session = useSession();
  const [action, setAction] = useState(false);
  const [actionModal, setActionModal] = useState(true);
  const mediaRef = useRef(null);




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


      {actionModal ?
        <div className='px-6 cursor-pointer w-full flex border-2'>
          <div className='border-r-2 w-full'>
            <div className='w-full ml-4'>
              <div>
                <Image
                  src={Userimg}
                  alt="Image Item"
                  className='h-50 w-25 rounded-md bg-slate-50 p-2'>
                </Image>
              </div>

              <div className='p-2'>
                <div>
                  <p>tile Song Name</p>
                </div>
              </div>
              <div className='p-2 flex space-x-5 w-full' onClick={() => setAction(!action)}>
                <div>
                  <MediaPlayer src={audio} />
                  <audio ref={mediaRef} />
                </div>
                <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>

                  <AiOutlineHeart></AiOutlineHeart>
                  <p className='text-sm'>100</p>
                </div>
                <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>
                  <p className='text-sm'>More</p>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
          <div>
            adasda
          </div>
        </div>

        : ''}


    </div>
  )
}

export default index