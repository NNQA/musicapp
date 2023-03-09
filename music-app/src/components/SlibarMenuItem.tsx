import React from 'react'

function SlibarMenu(props: any) {
  return (
    <div className='flex items-center hoverEffect text-gray-700 
      space-x-3'>
        <props.icon className='h-6 ' />
        <p className='text text-xl hidden md:flex'>{props.text}</p>
    </div>
  )
}

export default SlibarMenu
