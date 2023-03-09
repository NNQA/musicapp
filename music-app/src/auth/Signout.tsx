import React from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal'
import style from '../app/style/login.module.css'
import { FcGoogle } from "react-icons/fc";
import { FaGithubAlt } from "react-icons/fa";
import { HiFingerPrint, HiAtSymbol } from "react-icons/hi";

function Signout() {
  const [show, setShow] = React.useState(false);
  return (
    <div className='grid lg:grid-cols-2 
      h-3/4 w-full bg-white'>
      <div className={style.imgStyle}>
        <div className={style.cartoonImg}>

        </div>
      </div>
      <div className='flex flex-col bg-[#F4F4F2] space-y-1'>
        <h3 className='text-5xl ml-10 mt-10 text-[#495464] '>Explore</h3>
        <p className='text-[#BBBFCA] p-5 ml-3 text-sm'>“Music, once admitted to the soul, becomes a sort of spirit, and never dies.” ― Edward Bulwer Lytton</p>
        <div className='form'>
          <form action="">
            <div className='flex space-y-6 flex-col'>
              <div className='flex flex-col ml-6 relative'>
                <label htmlFor="" id='nameUser'>Username or email address</label>
                <input type="text" id='nameUser' name='nameUser' placeholder='User Name'
                  className='border-2 w-1/2 border-solid focus:border-none
                   border-b-gray-600 bg-[#E8E8E8] rounded-lg p-1' />
                <span className='absolute inset-x-40 inset-y-8 text-[#BBBFCA] hover:text-[#495464]'>
                  <HiAtSymbol />
                </span>
              </div>
              <div className='flex flex-col ml-6 relative focus:text-[# 95464]'>
                <label htmlFor="" id='password'>Password</label>
                <input type={`${show ? "text" : "password"}`} id='password' name='password' placeholder='Password'
                  className='border-2 w-1/2 border-solid focus:border-none
                   border-b-gray-600 bg-[#E8E8E8] rounded-lg p-1' />
                <span className='absolute inset-x-40 inset-y-8 text-[#BBBFCA] hover:text-[#495464]'
                  onClick={() => setShow(!show)}>
                  <HiFingerPrint />
                </span>
              </div>
              <div className='border-2 border-solid w-1/2 ml-6 
                 p-1  bg-[#BBBFCA] rounded-lg hover:bg-[#E8E8E8]
                 hover:text-[#495464] hover:shadow-2xl transition duration-300
                 hover:translate-x-2 hover:-translate-y-2 flex items-center 
                 space-x-2 justify-center'>
                <button type='submit'>
                  LogIn With Github
                </button>
                <FaGithubAlt className='justify-center h-5' />
              </div>
              <div className='border-2 border-solid w-1/2 ml-6 
                 p-1  bg-[#BBBFCA] rounded-lg hover:bg-[#E8E8E8]
                 hover:text-[#495464] hover:shadow-2xl transition duration-300
                 hover:translate-x-2 hover:-translate-y-2 flex items-center 
                 space-x-2 justify-center'>
                <button type='submit'>
                  LogIn With Google
                </button>
                <FcGoogle className='justify-center h-5' />
              </div>

              <button type='submit'
                className='border-2 border-solid w-1/2 ml-6 
                 p-1  bg-[#BBBFCA] rounded-lg hover:bg-[#E8E8E8]
                 hover:text-[#495464] hover:shadow-2xl transition duration-300
                 hover:translate-x-2 hover:-translate-y-2'>
                Sign in
              </button>
              <p>dont you have acccount </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signout