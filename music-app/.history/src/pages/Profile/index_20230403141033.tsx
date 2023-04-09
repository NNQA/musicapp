import React from 'react'
import { getSession } from "next-auth/react";
import { NextPageContext } from 'next'
import user from "../../static/user.png"
import Image from 'next/image';


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}
function index() {
  return (
    <div className='bg-gray-100'>
      <div className='flex justify-between  bg-gray-300'>
        <Image
          src={user}
          alt="Image User"
          className='h-30 w-30 rounded-2xl'>

        </Image>
        <div>
          <input type="file" id='updateImage'></input>

        </div>
      </div>
      <div>
        track
      </div>
      <div>
        edit
      </div>
    </div>
  )
}

export default index