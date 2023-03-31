
'use client';
import React, { useState } from 'react'
import img from "../../static/backgroundStart.jpg"
import imgMusic from "../../static/headphone.jpg"
import imgMusic1 from "../../static/mucic1.jpg"
import imgMusic2 from "../../static/music2.jpg"
import imgMusic3 from "../../static/music3.jpg"
import imgMusic4 from "../../static/music4.jpg"
import imgMusic5 from "../../static/musicFavorite.jpg"
import imgTrap from "../../static/trapImg.jpg"
import imgCm from "../../static/cmMusic.jpg"
import imgPop from "../../static/popMusic.jpg"
import mtp from "../../static/mtp.jpg"
import mck from "../../static/mck.jpg"
import wean from "../../static/wean.png"
import Image from 'next/image';
import { HiMenuAlt3, HiUser } from "react-icons/hi"
import { IoLogoFacebook } from "react-icons/io"
import { BsGithub } from "react-icons/bs"
import { AiFillTwitterCircle } from "react-icons/ai"
import { BsFillFileEarmarkMusicFill } from "react-icons/bs"
import { TiTick } from "react-icons/ti"
import { HiUsers } from "react-icons/hi"
import Carousel from 'react-bootstrap/Carousel';
import Router from 'next/router';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'


function StartUi() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };

    const session = useSession();
    const router = useRouter();
    const handleSignIn = () => {
        router.push('/login');
    }
    const handleSignUp = () => {
        router.push('/login');
    }
    return (
        <div className=''>
            <div className='flex justify-center items-center
            p-6 shadow-md sticky top-0 z-50 bg-white'>
                <div className='flex flex-row space-x-4 items-center mr-24'>
                    <BsFillFileEarmarkMusicFill className='h-10 w-8 text-gray-900' />
                    <p className='text-2xl'>Music Social</p>
                </div>
                <div className='flex flex-row space-x-24'>
                    <div className='flex flex-row space-x-5 items-center'>
                        <a href="/"
                            className='transition duration-200 transform hover:scale-75 hover:text-[#fb649c]'>
                            <p className='text-lg'>Product</p>
                        </a>
                        <a href="/"
                            className='transition duration-200 transform hover:scale-75 hover:text-[#fb649c]'>
                            <p className='text-lg'>Library</p>
                        </a>
                        <a href="/"
                            className='transition duration-200 transform hover:scale-75 hover:text-[#fb649c]'>
                            <p className='text-lg'>Solution</p>
                        </a>
                        <a href="/"
                            className='transition duration-200 transform hover:scale-75 hover:text-[#fb649c]'>
                            <p className='text-lg'>Blog</p>
                        </a>
                        <a href="/"
                            className='transition duration-200 transform hover:scale-75 hover:text-[#fb649c]'>
                            <p className='text-lg'>Services</p>
                        </a>
                        <a href="/"
                            className='transition duration-200 transform hover:scale-75 hover:text-[#fb649c]'>
                            <p className='text-lg'>Contact</p>
                        </a>
                    </div>
                    <div className='flex flex-row items-center justify-center text-xl'>
                        <HiMenuAlt3 className='m-2' />
                        <button className='transition duration-500 hover:shadow-4xl p-2
                        rounded-xl hover:translate-x-5 hover:-translate-y-2 hover:shadow-2xl
                        bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100
                        '
                            onClick={handleSignIn}
                        >
                            ListenNow
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center p-2 mt-24'>
                <div className='space-y-4 ml-[250px]'>
                    <p className='text-[#444443] font-sans font-bold text-xl'>
                        Music Collection 2023
                    </p>
                    <h2 className='text-[#303031] text-3xl font-bold'>
                        Music communication
                    </h2>
                    <p className='text-lg w-[70%]'>
                        Play POLICY on SoundCloud and discover followers on SoundCloud | Stream tracks, albums, playlists on desktop and mobile.
                    </p>
                    <div className='space-x-6'>
                        <button className='transition duration-500 hover:shadow-4xl px-10 py-2
                        border-solid border-2 border-[#2f2e2c] text-xl hover:bg-white hover:text-black
                        bg-[#2f2e2c] text-[#ebe9e4] rounded-xl hover:translate-x-5 hover:-translate-y-2'
                            onClick={handleSignIn}
                        >
                            Start
                        </button>
                        <button className='transition duration-500 hover:shadow-4xl px-10 py-2
                        border-solid border-2 border-[#2f2e2c] text-xl
                        rounded-xl hover:translate-x-5 hover:-translate-y-2'
                        >
                            Documentation
                        </button>
                    </div>
                </div>
                <div className='pr-[200px]'>
                    <Image
                        src={imgMusic5}
                        alt="image Music"
                        className='rounded-xl'
                    >
                    </Image>
                </div>

            </div>
            <div className='w-fit mx-auto mt-24 bg-willow-grove-50 py-12 px-24 rounded-2xl'>
                <div className='pb-12'>
                    <p className='text-lg opacity-20'>
                        2023 For new Genres
                    </p>
                    <h1 className='text-xl opacity'>
                        New Content 2023
                    </h1>
                </div>
                <div className='flex space-x-10'>
                    <div className='space-y-5'>
                        <div className='flex space-x-2 w-fit'>

                            <div className='relative border-2 border-gray-200 rounded-xl
                transition duration-300 hover:bg-slate-100 hover:translate-x-1 hover:-translate-y-2
                hover:shadow-2xl hover:border-none '>
                                <div className='absolute inset-6'>
                                    <h2 className='text-[#303031] font-bold'>
                                        Music communication
                                    </h2>
                                    <p className='text-[#444443]'>
                                        Music 2023
                                    </p>
                                </div>
                                <div className='p-2'>
                                    <Image
                                        src={imgMusic}
                                        alt="image Music"
                                        className='rounded-xl h-[200px] w-[210px]'
                                    >
                                    </Image>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row space-x-2'>
                            <div className='relative border-2 border-gray-200 rounded-xl
                transition duration-300 hover:bg-slate-100 hover:translate-x-2 hover:-translate-y-2
                hover:shadow-2xl hover:border-none'>
                                <div className='absolute inset-6'>
                                    <h2 className='text-[#303031] font-bold'>
                                        Music communication
                                    </h2>
                                    <p className='text-[#444443]'>
                                        Sing In
                                    </p>
                                </div>
                                <div className='p-2'>
                                    <Image
                                        src={imgMusic2}
                                        alt="image Music"
                                        className='rounded-xl h-[200px] w-[210px]'
                                    >
                                    </Image>
                                </div>
                            </div>
                        </div>
                        {/* <div className='flex flex-row space-x-2'>
                            <div className='relative border-2 border-gray-200 rounded-xl
                transition duration-300 hover:bg-slate-100 hover:translate-x-2 hover:-translate-y-2
                hover:shadow-2xl hover:border-none'>
                                <div className='absolute inset-6'>
                                    <h2 className='text-white font-bold'>
                                        Music communication
                                    </h2>
                                    <p className='text-gray-300'>
                                        Trap, Clound, Horror
                                    </p>
                                </div>
                                <div className='p-5'>
                                    <Image
                                        src={imgTrap}
                                        alt="image Music"
                                        className='rounded-xl h-[220px] w-[300px]'
                                    >
                                    </Image>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className='space-y-5'>
                        <div className='relative border-2 border-gray-200 rounded-xl
                transition duration-300 hover:bg-slate-100 hover:translate-x-2 hover:-translate-y-2
                hover:shadow-2xl hover:border-none'>
                            <div className='absolute inset-6'>
                                <h2 className='text-[#303031] font-bold'>
                                    New Type Music
                                </h2>
                                <p className='text-[#444443]'>
                                    Communication to Anyone
                                </p>
                            </div>
                            <div className='p-2'>
                                <Image
                                    src={imgCm}
                                    alt="image Music"
                                    className='rounded-xl h-[200px] w-[210px]'
                                >
                                </Image>
                            </div>
                        </div>
                        <div className='relative border-2 border-gray-200 rounded-xl
                transition duration-300 hover:bg-slate-100 hover:translate-x-2 hover:-translate-y-2
                hover:shadow-2xl hover:border-none'>
                            <div className='absolute inset-6'>
                                <h2 className='text-[#303031] font-bold'>
                                    Time For Social
                                </h2>
                                <p className='text-[#444443]'>
                                    Explore Collection
                                </p>
                            </div>
                            <div className='p-2'>
                                <Image
                                    src={imgMusic1}
                                    alt="image Music"
                                    className='rounded-xl h-[200px] w-[210px]'
                                >
                                </Image>
                            </div>
                        </div>
                        {/* <div className='relative border-2 border-gray-200 rounded-xl
                transition duration-300 hover:bg-slate-100 hover:translate-x-2 hover:-translate-y-2
                hover:shadow-2xl hover:border-none'>
                            <div className='absolute inset-6'>
                                <h2 className='text-white font-bold'>
                                    Popular Music Genres
                                </h2>
                                <p className='text-gray-300'>
                                    What's Pop Music?
                                </p>
                            </div>
                            <div className='p-5'>
                                <Image
                                    src={imgPop}
                                    alt="image Music"
                                    className='rounded-xl h-[220px] w-[300px]'
                                >
                                </Image>
                            </div>
                        </div> */}
                    </div>
                    <div className='flex flex-col space-y-6'>
                        <div className='border-l-2 pl-4 shadow-xl w-[300px] h-fit cursor-pointer bg-white'>
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
                        <div className='border-t-2 pl-4 shadow-2xl w-[300px] h-fit cursor-pointer bg-white'>
                            <h1 className='text-lg font-bold'>
                                For New Songs
                            </h1>
                            <div className='flex items-center space-x-6 my-4 
                            hover:p-2 hover:rounded-2xl hover:border-b-2 hover:border-black
                            '>
                                <Image
                                    src={mtp}
                                    alt='img artists'
                                    className='h-10 w-10 rounded-full border-2 hover:border-black'
                                />
                                <div className='space-y-1 w-[100px]'>
                                    <p className='text-sm'>
                                        Anh sai roi
                                    </p>
                                    <p className='flex'>
                                        <HiUsers></HiUsers>
                                        <span className='text-xs'>200k.Listen</span>
                                    </p>
                                </div>
                                <TiTick className='text-gray-600'></TiTick>
                            </div>
                            <div className='flex items-center space-x-6 my-4 
                            hover:p-2 hover:rounded-2xl hover:border-b-2 hover:border-black
                            '>
                                <Image
                                    src={wean}
                                    alt='img artists'
                                    className='h-10 w-10 rounded-full border-2 hover:border-black'
                                />
                                <div className='space-y-1 w-[100px]'>
                                    <p className='text-xs'>
                                        Mot nguoi vi em
                                    </p>
                                    <p className='flex'>
                                        <HiUsers></HiUsers>
                                        <span className='text-xs'>100k.Listen</span>
                                    </p>
                                </div>
                                <TiTick className='text-gray-600'></TiTick>
                            </div>
                            <div className='flex items-center space-x-6 my-4 
                            hover:p-2 hover:rounded-2xl hover:border-b-2 hover:border-black
                            '>
                                <Image
                                    src={mck}
                                    alt='img artists'
                                    className='h-10 w-10 rounded-full border-2 hover:border-black'
                                />
                                <div className='space-y-1 w-[100px]'>
                                    <p className='text-xs'>
                                        Ai moi la ke xau xa
                                    </p>
                                    <p className='flex'>
                                        <HiUsers></HiUsers>
                                        <span className='text-xs'>100k.Listen</span>
                                    </p>
                                </div>
                                <TiTick className='text-gray-600'></TiTick>
                            </div>


                        </div>
                    </div>


                </div>
            </div>
            <div className='flex flex-row justify-center items-center space-x-10 h-screen'>
                <div className='p-5'>
                    <Image
                        src={imgMusic3}
                        alt="image Music"
                        className='rounded-xl'
                    >
                    </Image>
                </div>
                <div className='flex flex-col w-[40%] space-y-3'>
                    <h1 className='text-6xl text-black font-bold'>We make the steps to build a music product</h1>
                    <p className='text-lg text-gray-800'>Description</p>
                    <p className='text-sm text-[#7d7d8f]'>Music, art concerned with combining vocal or instrumental sounds for beauty of form or emotional expression, usually according to cultural standards of rhythm, melody, and, in most Western music, harmony. Both the simple folk song and the complex electronic composition belong to the same activity, music. Both are humanly engineered; both are conceptual and auditory, and these factors have been present in music of all styles and in all periods of history, throughout the world.</p>
                    <button className='transition duration-500 hover:shadow-4xl p-3
                        bg-[#2f2e2c] text-white rounded-full text-xl
                        hover:translate-x-5 hover:-translate-y-2
                        hover:text-black hover:bg-white hover:border-2 hover:border-black'
                        onClick={handleSignIn}
                    >
                        Make A ProDuct
                    </button>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center space-y-4 p-4 mb-12'>
                <h1 className='text-3xl font-bold'>
                    Thanks for listening. Now join in.
                </h1>
                <p className='text-2xl'>
                    Save tracks, follow artists and build playlists. All for free.
                </p>
                <div className='flex flex-col space-y-6'>
                    <p className='w-[50%] mx-auto'>
                        We've got the music and sound effects you need to take your content to the next level.
                    </p>
                    <div className='mx-auto space-x-3'>
                        <button className='transition duration-500 hover:shadow-4xl px-4 py-2
                        hover:bg-[#2f2e2c] hover:text-white rounded-md
                        hover:translate-x-2 hover:-translate-y-2 text-lg
                        border-2 border-[#2f2e2c] mx-auto'
                            onClick={handleSignIn}
                        >
                            Explore Now
                        </button>
                        <button className='transition duration-500 hover:shadow-4xl px-4 py-2
                        hover:bg-[#2f2e2c] hover:text-white rounded-md
                        hover:translate-x-5 hover:-translate-y-2 text-lg
                        border-2 border-[#2f2e2c] mx-auto'
                            onClick={handleSignIn}
                        >
                            Listen Now
                        </button>
                    </div>
                </div>
            </div>
            <div className='bg-[#f4f3f3] grid grid-cols-4 items-center'>
                <div className='p-5'>
                    <Image
                        src={imgMusic4}
                        alt="image Music"
                        className='rounded-xl w-1/2'
                    >
                    </Image>
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold'>
                        Never stop listening
                    </h1>
                    <p className='w-[50%]'>SoundCloud is available on Web, iOS, Android, Sonos, Chromecast, and Xbox One.</p>
                </div>
                <div className='flex flex-col space-y-3 contact'>
                    <p className='text-xl text-black font-bold'>Contact Via Social</p>
                    <div className='flex flex-row space-x-8 text-slate-500
                    text-2xl'>
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
                    <p>Music satisfies the soul</p>
                </div>
                <div>
                    <h1 className='text-2xl font-bold'>
                        Support
                    </h1>
                    <p className='hover:text-[#fb649c] hover:shadow-2xl'>
                        Privacy Policy
                    </p>
                    <p className='hover:text-[#fb649c] hover:shadow-2xl'>
                        Report a bugb
                    </p>
                    <p className='hover:text-[#fb649c] hover:shadow-2xl'>
                        siteMap
                    </p>
                    <p className='hover:text-[#fb649c] hover:shadow-2xl'>
                        FAQs
                    </p>

                </div>
            </div>

        </div >
    )
}

export default StartUi


