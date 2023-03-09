'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Sildebar from '@/components/Sildebar';
import Header from '@/components/Header';
import Head from 'next/head';
import img from "../static/music-note.png"
import Signin from '@/auth/Signin';
import Modal from '../components/Modal';
import React from 'react'
import logo from "../static/musiclogo.svg"
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';




export default function Home() {
  const [openModal, setModal] = React.useState(false);
  
 
  return (
    <div className=''>
      <div className='grid grid-cols-3 bg-[#E8E8E8]'>
        {/* logo app */}
        <div className='flex mx-auto py-3 items-center pr-10 cursor-pointer'>
          <Image className='h-12 w-12' src={logo} alt="Logo of the page" />
          <p className='text-xl'>MusicApp</p>
        </div>

        {/* search */}
        <div className='mx-auto flex items-center w-full relative'>
          <input type="text" placeholder='Searching....'
            className='rounded-l-2xl w-2/3 h-[41px] items-center border' />
          <button className='search z-2'>
            <MagnifyingGlassIcon className='h-[25px]'></MagnifyingGlassIcon>
            {/* //submit */}
          </button>
        </div>
        {/* userlogin */}
        <div className='flex items-center'>
          <button className='items-center' onClick={() => setModal(true)}>
            Login </button>
            <Modal open={openModal} onClose={()=> setModal(false)}/>
        </div>
      </div>
      <div className='grid grid-cols-3'>
        <main className='flex min-h-screen mx-auto'>
          <Sildebar />
        </main>
        <div className=''>
          addsasdasd
        </div>
        <div></div>
      </div>

    </div>
  );
}
