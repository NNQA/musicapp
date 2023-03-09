"use server"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from "../static/musiclogo.svg"
import SlibarMenu from './SlibarMenuItem'
import { HomeIcon } from '@heroicons/react/24/outline'
import { data } from "./DataItem"


function Sildebar() {


  return (
    <div>
      {/* logo app */}
      <div>
        <Image className='h-10 w-10' src={logo} alt="Logo of the page" />
      </div>

      {/* list link (menu option) */}
      <div>
        {data.map((item, index) => {
          return (
            <li key={index} className='list-none'>
              <Link href='/'>
                <SlibarMenu text={item.name} icon={item.icon} />
              </Link>
            </li>
          )
        })}
      </div>
      {/* profile */}
      <div className='' >

      </div>
    </div>
  )
}

export default Sildebar
