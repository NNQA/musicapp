import Link from 'next/link'
import React from 'react'

function Sorry() {
  return (
    <div className="bg-[#1e1e1f] font-font-slide h-full text-white text-center space-y-12">
    <p className="mt-[220px] text-3xl">
      Sorry you need to login to make this side effect
    </p>
    <div className="flex w-fit mx-auto space-x-12">
      <p className="text-base">
        Login with your account <Link href="/login" className="text-[#00ADB5] ">Login</Link>
      </p>
      <p className="text-base">
        Haven't account  <Link href="/signup" className="text-[#00ADB5] ">Register</Link>
      </p>
    </div>
  </div>
  )
}

export default Sorry
