import React, { useState } from 'react'

function Modaledit() {
  const [modal, setModal] = useState();

  const toggle = () => {
    setModal(!modal);
  }
  return (
    <div></div>
  )
}

export default Modaledit