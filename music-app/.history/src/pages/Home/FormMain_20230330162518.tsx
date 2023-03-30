import React, { useState } from 'react'
import SLideMenu from '../../components/elements/Form/SLideMenu'
import IndexU from '../Upload';
function FormMain() {
  const [pages, setPages] = useState();
  return (
    <div className='h-screen relative'>
      <div className='flex h-full'>
        <div className='shadow-2xl'>
          <SLideMenu props={setPages}/>
        </div>
        <div className='w-full'>
        <Showpage ></Showpage>
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

export default FormMain
