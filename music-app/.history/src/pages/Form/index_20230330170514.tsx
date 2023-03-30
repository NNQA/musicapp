import React, { ReactNode, useState } from 'react'
import SLideMenu from '../../components/elements/Form/SLideMenu'
import Upload from '../Upload';
import Home from '../Home'
import Playlist from '../PlayList'
import handle from '../api/register';
function index() {
  const [pages, setPages] = useState(0);
  const numberPages = [<Home></Home>, <Upload></Upload>, <Playlist></Playlist>];

  function handleReturnPages(pages: any): React.ReactNode {
    return (
      <>
        {numberPages[0]}
      </>
    )
  }
  return (
    <div className='h-screen relative'>
      <div className='flex h-full'>
        <div className='shadow-2xl'>
          <SLideMenu pages={pages} setPages={setPages} />
        </div>
        <div className='w-full'>
          {handleReturnPages(pages)}
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
