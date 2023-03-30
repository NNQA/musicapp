import React, { useState } from 'react'
import index from '.'
import { data } from './data'
import { BsFillFileEarmarkMusicFill } from "react-icons/bs"


import { RiSearchLine } from "react-icons/ri"
import { BiMenuAltRight } from "react-icons/bi"
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

function SLideMenu({pages, setPages}) {
    const router = useRouter();
    const handleSignIn = () => {
        router.push('/login');
    }

    return (
        <div className='xl:m-8'>
            <div className='flex items-center space-x-2 text-[#413543] pb-3'>
                <BsFillFileEarmarkMusicFill className='h-8 w-8 xl:justify-start' />
                <p className='text-xl hidden xl:inline'>Music Social</p>
            </div>
            <div className='flex items-center space-x-2 text-[#413543]'>
                <ul className=''>
                    {data.map((item, index) => [
                        <li key={index} className='list-none'>
                            <div className={`flex flex-row space-x-2 p-2 items-center
                            text-xl hover:font-bold hoverAnimation`}
                                onClick={() => props(item.name)}>
                                <item.icon></item.icon>
                                <p className='hidden xl:inline'>{item.name}</p>
                            </div>
                        </li>
                    ])}
                </ul>
            </div>
            <div>

            </div>
            <div></div>
        </div>
    )
}

export default SLideMenu