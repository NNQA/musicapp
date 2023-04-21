import React from 'react'
import { IoLogoFacebook } from "react-icons/io"
import { BsGithub } from "react-icons/bs"
import { AiFillTwitterCircle } from "react-icons/ai"

function index() {
  return (
    <div className='h-screen shadow-md w-full'>
      <div className='w-[80%] mx-auto items-center shadow-lg border-gray-400 h-fit p-10 flex'>
        <div className='py-20 px-12 space-y-6'>
          <div className='flex justify-between border-b-[1.5px] pb-1'>
            <p className="text-[#00ADB5] text-2xl font-bold">Explore</p>
            <p className="text-[#393E46]"> Upload Ur tracks</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="">Title</label>
            <input type="text" name="" id="" className='border-2 rounded-xl' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="">Description</label>
            <textarea name="" id="" className='border-2 rounded-xl h-[120px]'></textarea>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="">Image</label>
            <input type="file" name="" id="" className='' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="">Audio</label>
            <input type="file" name="" id="" className='' />
          </div>
          <button className='bg-[#00ADB5] text-white hover:shadow-2xl hover:scale-75 duration-200 items-center px-2 py-1 rounded-md'>
            submit
          </button>
        </div>
        <div className='border-l-[1px] h-full p-10 space-y-5'>
          <p className="text-[#00ADB5] text-2xl font-bold">Music Policy</p>
          <p className='w-[85%] text-xs text-[#393E46] text-opacity-80 '>
            If you have a YouTube Music account, you may be provided with server space where you will be able to upload and store certain content from your computer (for example music files that may contain metadata and album art) (“Stored Music Content”). If you choose to upload Stored Music Content, you will retain all of your existing rights to the Stored Music Content and a copy will be stored on your behalf.
          </p>
          <p className="text-[#00ADB5] text-xs">Please contact us if you are not sure about the policy</p>
          <div className='flex text-[#acb5c8] space-x-5 text-sm items-center'>
            <p>
              Through Social:
            </p>
            <a href="https://vi-vn.facebook.com/"
              className='hover:text-[#fb649c] hover:shadow-2xl'>
              <IoLogoFacebook />
            </a>
            <a href="https://github.com/"
              className='hover:text-[#fb649c] hover:shadow-2xl'>
              <BsGithub></BsGithub>
            </a>
            <a href="https://twitter.com/?lang=vi"
              className='hover:text-[#fb649c] hover:shadow-2xl'>
              <AiFillTwitterCircle />
            </a>
          </div>
          <div className='flex text-[#acb5c8] space-x-5 text-sm items-center'>
            <p>
              Through Email: Quocanh123@gmail.com
            </p>
          </div>
          <p className='text-[#acb5c8] text-xs'>
            Legal ⁃ Privacy ⁃ Cookie Policy ⁃ Consent Manager ⁃ Imprint ⁃ Artist Resources ⁃ Blog ⁃ Charts ⁃
          </p>
        </div>
      </div>
    </div>
  )
}

export default index
