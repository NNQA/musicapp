import React, { useState } from 'react'

function Modaledit() {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }
  return (
    <div>
      <button className=' bg-gray-100'>
        edit
      </button>
    </div>
  )
}

export default Modaledit