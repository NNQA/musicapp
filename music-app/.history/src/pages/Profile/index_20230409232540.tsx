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
import { CgMore } from "react-icons/cg"
import mtp from "../../static/mtp.jpg"
import mck from "../../static/mck.jpg"
import wean from "../../static/wean.png"
import { TiTick } from "react-icons/ti"
import { HiUsers } from "react-icons/hi"


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
          <div className='space-x-5 mt-8 mr-14'>
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
          <div className='basis-4/6 w-full'>
            <div className='border-r-2 p-2 flex border-b-[1px]'>
              <div>
                <Image
                  src={Userimg}
                  alt="Image Item"
                  className='h-50 w-25 rounded-md bg-slate-50 p-2'>
                </Image>
              </div>
              <div className='w-full ml-4'>

                <div className='p-2'>
                  <div>
                    <p>tile Song Name</p>
                  </div>
                </div>
                <div className='p-2 flex space-x-2' onClick={() => setAction(!action)}>
                  <div className='w-full'>
                    <MediaPlayer src={audio} />
                    <audio ref={mediaRef} />
                  </div>
                  <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>

                    <AiOutlineHeart></AiOutlineHeart>
                    <p className='text-sm'>100</p>
                  </div>
                  <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>
                    <CgMore></CgMore>
                    <p className='text-sm'>More</p>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
            <div className='border-r-2 p-2 flex border-b-[1px]'>
              <div>
                <Image
                  src={Userimg}
                  alt="Image Item"
                  className='h-50 w-25 rounded-md bg-slate-50 p-2'>
                </Image>
              </div>
              <div className='w-full ml-4'>

                <div className='p-2'>
                  <div>
                    <p>tile Song Name</p>
                  </div>
                </div>
                <div className='p-2 flex space-x-2' onClick={() => setAction(!action)}>
                  <div className='w-full'>
                    <MediaPlayer src={audio} />
                    <audio ref={mediaRef} />
                  </div>
                  <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>

                    <AiOutlineHeart></AiOutlineHeart>
                    <p className='text-sm'>100</p>
                  </div>
                  <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>
                    <CgMore></CgMore>
                    <p className='text-sm'>More</p>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
            <div className='border-r-2 p-2 flex border-b-[1px]'>
              <div>
                <Image
                  src={Userimg}
                  alt="Image Item"
                  className='h-50 w-25 rounded-md bg-slate-50 p-2'>
                </Image>
              </div>
              <div className='w-full ml-4'>

                <div className='p-2'>
                  <div>
                    <p>tile Song Name</p>
                  </div>
                </div>
                <div className='p-2 flex space-x-2' onClick={() => setAction(!action)}>
                  <div className='w-full'>
                    <MediaPlayer src={audio} />
                    <audio ref={mediaRef} />
                  </div>
                  <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>

                    <AiOutlineHeart></AiOutlineHeart>
                    <p className='text-sm'>100</p>
                  </div>
                  <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>
                    <CgMore></CgMore>
                    <p className='text-sm'>More</p>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
            <div className='border-r-2 p-2 flex border-b-[1px]'>
              <div>
                <Image
                  src={Userimg}
                  alt="Image Item"
                  className='h-50 w-25 rounded-md bg-slate-50 p-2'>
                </Image>
              </div>
              <div className='w-full ml-4'>

                <div className='p-2'>
                  <div>
                    <p>tile Song Name</p>
                  </div>
                </div>
                <div className='p-2 flex space-x-2' onClick={() => setAction(!action)}>
                  <div className='w-full'>
                    <MediaPlayer src={audio} />
                    <audio ref={mediaRef} />
                  </div>
                  <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>

                    <AiOutlineHeart></AiOutlineHeart>
                    <p className='text-sm'>100</p>
                  </div>
                  <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>
                    <CgMore></CgMore>
                    <p className='text-sm'>More</p>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
            <div className='border-r-2 p-2 flex border-b-[1px]'>
              <div>
                <Image
                  src={Userimg}
                  alt="Image Item"
                  className='h-50 w-25 rounded-md bg-slate-50 p-2'>
                </Image>
              </div>
              <div className='w-full ml-4'>

                <div className='p-2'>
                  <div>
                    <p>tile Song Name</p>
                  </div>
                </div>
                <div className='p-2 flex space-x-2' onClick={() => setAction(!action)}>
                  <div className='w-full'>
                    <MediaPlayer src={audio} />
                    <audio ref={mediaRef} />
                  </div>
                  <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>

                    <AiOutlineHeart></AiOutlineHeart>
                    <p className='text-sm'>100</p>
                  </div>
                  <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>
                    <CgMore></CgMore>
                    <p className='text-sm'>More</p>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
            <div className='border-r-2 p-2 flex border-b-[1px]'>
              <div>
                <Image
                  src={Userimg}
                  alt="Image Item"
                  className='h-50 w-25 rounded-md bg-slate-50 p-2'>
                </Image>
              </div>
              <div className='w-full ml-4'>

                <div className='p-2'>
                  <div>
                    <p>tile Song Name</p>
                  </div>
                </div>
                <div className='p-2 flex space-x-2' onClick={() => setAction(!action)}>
                  <div className='w-full'>
                    <MediaPlayer src={audio} />
                    <audio ref={mediaRef} />
                  </div>
                  <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>

                    <AiOutlineHeart></AiOutlineHeart>
                    <p className='text-sm'>100</p>
                  </div>
                  <div className='border-2 w-fit flex items-center px-2 space-x-4 rounded-md'>
                    <CgMore></CgMore>
                    <p className='text-sm'>More</p>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>

          </div>

          <div className='w-fit ml-12 py-4'>
            <div>
              <div className='border-b-[1px] flex space-x-12'>
                <div className='border-r-[1px]'>
                  Follower
                </div>
                <div className='border-r-[1px]'>
                  Follower
                </div>
                <div className=''>
                  Follower
                </div>
              </div>
            </div>
            <div>
              <h1 className='text-lg font-bold'>
                For Artists
              </h1>
              <div className='flex items-center space-x-6 my-4 hover:shadow-xl
                            hover:p-2 hover:rounded-2xl hover:border-b-2 hover:border-gray-500'>
                <Image
                  src={mtp}
                  alt='img artists'
                  className='h-10 w-10 rounded-full border-2'
                />
                <div className='space-y-1 w-[100px]'>
                  <p className='text-sm'>
                    Son Tung Mtp
                  </p>
                  <p className='flex'>
                    <HiUsers></HiUsers>
                    <span className='text-xs'>100k.follow</span>
                  </p>
                </div>
                <TiTick className='text-gray-600'></TiTick>
              </div>
              <div className='flex items-center space-x-6 my-4 hover:shadow-xl 
                            hover:p-2 hover:rounded-2xl hover:border-b-2 hover:border-gray-500'>
                <Image
                  src={wean}
                  alt='img artists'
                  className='h-10 w-10 rounded-full border-2'
                />
                <div className='space-y-1 w-[100px]'>
                  <p className='text-sm'>
                    Wean
                  </p>
                  <p className='flex'>
                    <HiUsers></HiUsers>
                    <span className='text-xs'>100k.follow</span>
                  </p>
                </div>
                <TiTick className='text-gray-600'></TiTick>
              </div>
              <div className='flex items-center space-x-6 my-4 hover:shadow-xl 
                            hover:p-2 hover:rounded-2xl hover:border-b-2 hover:border-gray-500'>
                <Image
                  src={mck}
                  alt='img artists'
                  className='h-10 w-10 rounded-full border-2'
                />
                <div className='space-y-1 w-[100px]'>
                  <p className='text-sm'>
                    MCK
                  </p>
                  <p className='flex'>
                    <HiUsers></HiUsers>
                    <span className='text-xs'>100k.follow</span>
                  </p>
                </div>
                <TiTick className='text-gray-600'></TiTick>
              </div>
            </div>

          </div>
        </div>
        : ''}


    </div>
  )
}

export default index