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
          <form>

          </form>
          <div>
            <button>
              Close
            </button>
          </div>
        </div>
      : ''}
    </div>
  )
}

export default Modaledit