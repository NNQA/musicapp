
'use client';
import React from 'react'
import img from "../../../static/backgroundStart.jpg"
import iconMusic from "../../../static/sing-icon.svg"
import Image from 'next/image';
import { HiMenuAlt3 } from "react-icons/hi"
import { IoLogoFacebook } from "react-icons/io"
import { BsGithub } from "react-icons/bs"
import { AiFillTwitterCircle } from "react-icons/ai"
import { BsFillFileEarmarkMusicFill } from "react-icons/bs"

import Router from 'next/router';
import {} from '../../../components/elements/Form/index'
import Link from 'next/link';


function StartUi() {
    const sendProps = () => {
        Router.push({
            pathname: '/FormMain',
        })
    }
    return (
        <div className='relative'>
            <Image
                src={img}
                alt='asdasd' />
            <div className='absolute top-12 inset-x-2/3 flex flex-row pr-20 
                text-white space-x-5 p-2'>
                <p className='text-lg'>Product</p>
                <p className='text-lg'>Library</p>
                <p className='text-lg'>Solution</p>
            </div>
            <div className='absolute flex text-white text-2xl
                cursor-pointer top-12 right-12 pt-2'>
                <HiMenuAlt3 />
                <button className='transition duration-500 hover:shadow-4xl
                hover:bg-[#ca383b] rounded-full px-4 hover:translate-x-5 hover:-translate-y-2'
                > 
                <Link href="/posts/[id]">GetStarted</Link>
                </button>
            </div>
            <div className='absolute inset-y-3/4 text-white inset-x-20'>
                <p>Music satisfies the soul</p>
                <div className='flex flex-row space-x-8
                text-2xl'>
                    <p>Contact Via Social</p>
                    {/* icon contact */}
                    <IoLogoFacebook />
                    <BsGithub></BsGithub>
                    <AiFillTwitterCircle />
                </div>
            </div>
            <div className='absolute top-12 text-white inset-x-20
                flex flex-row space-x-4 items-center'>
                <BsFillFileEarmarkMusicFill className='h-10 w-8' />
                <p className='text-2xl'>Music Social</p>
            </div>

        </div>
    )
}

export default StartUi
