import React, { useState } from 'react'
import FormMain from '../Home/FormMain'
import { prisma } from "../../server/prisma"

function index() { 
  return (
    <FormMain/>
  )
}
export default index

