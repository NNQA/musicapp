import React from 'react'
import { getSession } from "next-auth/react";
import { NextPageContext } from 'next'
import Userimg from "../../static/user.png"
import Image from 'next/image';
import userCurrent from '@/hook/currentuser';
import { data } from '@/components/elements/Form/data';


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
  const {data: user} = userCurrent();
  return (
    <div className='bg-gray-100'>
      <div className='flex p-10 bg-gray-200'>
        <Image
          src={Userimg}
          alt="Image User"
          className='h-30 w-30 rounded-2xl'>

        </Image>
        <div>
          <p>
            {user?.name}
          </p>

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