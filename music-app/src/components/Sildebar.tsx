"use server"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SlibarMenu from './SlibarMenuItem'
import { HomeIcon } from '@heroicons/react/24/outline'
import { data } from "./DataItem"


function Sildebar() {


  return (
    <div className="flex-col sm:flex p-2 xl:items-start">
      {/* list link (menu option) */}
      <div className=''>
        {data.map((item, index) => {
          return (
            <li key={index} className='list-none'>
                <SlibarMenu text={item.name} icon={item.icon} />
            </li>
          )
        })}
      </div>
      {/* profile */}
      <div className='hoverEffect flex items-center space-x-3' >
        <img src="https://i.pinimg.com/564x/25/59/68/255968aab4c2692b43d0f0a0f6c789d7.jpg"
          alt="asdsads" className='rounded-full h-5 w-5'
        />
        <div className='hidden lg:flex flex-row leading-3'>
          <h4 className='font-bold'>AA</h4>
          <p>@music.social.com</p>
        </div>
      </div>
    </div>
  )
}

export default Sildebar
