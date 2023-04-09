import React, { ReactNode, useState } from 'react'
import SLideMenu from '../../components/elements/Form/SLideMenu'
import Upload from '../Upload';
import Home from '../Home'
import Playlist from '../PlayList'
import handle from '../api/register';
function index() {
  const [pages, setPages] = useState(1);
  const numberPages = [<Home></Home>, <Upload></Upload>, <Playlist></Playlist>, <Upload />];

  // fetch user/server
  function handleReturnPages(): React.ReactNode {
    return (
      <>
        {numberPages[pages]}
      </>
    )
  }
  const handleSubmit = (e: any) => {
    console.log(e)
  }
  return (
    <div className='h-screen relative'>
      <div className='flex h-full'>
        <div className='shadow-2xl w-[20%]'>
          <SLideMenu pages={pages} setPages={setPages} />
        </div>
        <div className='w-full'>
          {handleReturnPages()}
        </div>
      </div>
      <div className='absolute bottom-0 w-full bg-white h-[100px]'>
        <form onSubmit={handleSubmit}>
        <input type="file" id='file' />
        <label htmlFor="file">asdsad</label>
        <p className='w-fit mx-auto'>
          asda
        </p></form>
      </div>


    </div>

  )
}

export default index
