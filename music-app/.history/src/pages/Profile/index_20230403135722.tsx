import React from 'react'
import {getSession} from "next-auth/react";
import { NextPageContext } from 'next'


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if(!session) {
    return {
      redirect:{
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props:{}
  }
}
function index() {
  return (
    <div>profile</div>
  )
}

export default index