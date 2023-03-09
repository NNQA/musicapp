import React from 'react'

function SlibarMenu(props: any) {
  return (
    <div>
        <props.icon className='h-5' />
        <p>{props.text}</p>
    </div>
  )
}

export default SlibarMenu
