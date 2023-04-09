import React, { useState } from 'react'

function Modaledit() {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }
  return (
    <div>
      <button className='text-lg bg-gray-300 px-4 py-2 rounded-2xl'>
        Edit
      </button>
    </div>
  )
}

export default Modaledit