import React, { useState } from 'react'

function Modaledit() {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }
  return (
    <div className=''>
      <button className='text-sm bg-gray-300 px-4 py-2 rounded-2xl'
        onClick={() => toggle()}>
        Edit
      </button>
      {modal ?
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black w-2/3 h-2/3'>
          asdasd
        </div>
      : ''}
    </div>
  )
}

export default Modaledit