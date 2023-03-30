import React, { useState } from 'react'
import SLideMenu from '../../components/elements/Form/SLideMenu'
import Upload from '../Upload';
import Home from '../Home'
function index() {
  const [pages, setPages] = useState('Home');
  return (
    <div className='h-screen relative'>
      <div className='flex h-full'>
        <div className='shadow-2xl'>
          <SLideMenu pages={pages} setPages={setPages}/>
        </div>
        <div className='w-full'>
          
        </div>
      </div>
      <div className='absolute bottom-0 w-full bg-white h-[100px]'>
        <p className='w-fit mx-auto'>
          asda
        </p>
      </div>

    </div>

  )
}

export default index
