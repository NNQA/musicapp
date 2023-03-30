import React from 'react'
import SLideMenu from '../../components/elements/Form/SLideMenu'

function FormMain() {
  return (
    <div className='h-screen relative'>
      <div className='flex h-full'>
        <div className='shadow-2xl'>
          <SLideMenu />
        </div>
        <div className='bg-slate-200 w-full'>
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
