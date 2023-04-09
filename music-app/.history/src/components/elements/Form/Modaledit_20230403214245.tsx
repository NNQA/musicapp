import React, { useState } from 'react'

function Modaledit() {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }
  return (
    <div className='opacity-70'>
      <button className='text-sm bg-gray-300 px-4 py-2 rounded-2xl'
        onClick={() => toggle()}>
        Edit
      </button>
      {modal ?
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black'>
          <div className='w-2/3 h-2/3 mt-24 m-auto text-white bg-white'>
            <div className='flex justify-between'>
              <h3>Edit your profile</h3>
              <button className='text-white m-auto'
                onClick={() => toggle()}>
                Close
              </button>

            </div>
            <form>
              <input type="text" />
              <label htmlFor="">asdsad</label>
            </form>
          </div>
        </div>
        : ''}
    </div>
  )
}

export default Modaledit