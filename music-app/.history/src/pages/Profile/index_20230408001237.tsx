import React, { useState } from 'react'
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




export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}
function index() {
  const { data: user } = userCurrent();
  const session = useSession();
  const [action, setAction] = useState(false);
  const [actionModal, setActionModal] = useState(true);

  return (
    <div className='px-20 pb-5'>
      <div className=' p-10 bg-gray-200'>
        <div className='bottom-0 flex relative space-x-8 items-center'>
          <Image
            src={Userimg}
            alt="Image User"
            className='h-50 w-25 absolute rounded-md bg-slate-50 p-2 shadow-md'>

          </Image>
          <div className='mt-16'>
            <p className='text-2xl'>
              Name: {session.data?.user?.name}
            </p>
            <p className='text-xl opacity-70'>
              Email: {user?.email}
            </p>
          </div>
        </div>
        <Modaledit actionModal={actionModal} setActionModal={setActionModal}
        ></Modaledit>
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
              {actionModal ?
                <audio controls className='w-2/3 h-[24px]'>
                  <source src={audio} type="audio/mpeg"
                  />
                </audio>
                : ''}
              <div className='border-2 w-fit flex items-center px-2 space-x-4'>

                <AiOutlineHeart></AiOutlineHeart>
                <p className='text-sm'>100</p>
              </div>

            </div>
          </div>
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
              {actionModal ?
                <audio controls className='w-2/3 h-[24px]'>
                  <source src={audio} type="audio/mpeg"
                  />
                </audio>
                : ''}
              <div className='border-2 w-fit flex items-center px-2 space-x-4'>

                <AiOutlineHeart></AiOutlineHeart>
                <p className='text-sm'>100</p>
              </div>

            </div>
          </div>
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
              {actionModal ?
                <audio controls className='w-2/3 h-[24px]'>
                  <source src={audio} type="audio/mpeg"
                  />
                </audio>
                : ''}
              <div className='border-2 w-fit flex items-center px-2 space-x-4'>

                <AiOutlineHeart></AiOutlineHeart>
                <p className='text-sm'>100</p>
              </div>

            </div>
          </div>
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
              {actionModal ?
                <audio controls className='w-2/3 h-[24px]'>
                  <source src={audio} type="audio/mpeg"
                  />
                </audio>
                : ''}
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