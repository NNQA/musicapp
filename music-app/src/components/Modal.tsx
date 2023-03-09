import Signin from '@/auth/Signin';
import Signout from '@/auth/Signout';
import { sign } from 'crypto';
import React from 'react'

function Modal(props: any) {
    const [signIn, setSignIn] = React.useState(true);
    const [signUp, setSignUp] = React.useState(true);
    if (!props.open) return null;
    return (
        <div className='overlay inset-0 fixed bg-black bg-opacity-75 backdrop-opacity-10
            flex justify-center items-center'>
            <div className='modalRight w-1/2 h-full flex flex-col 
                justify-center items-center relative'>
                <p onClick={props.onClose} className=' absolute top-[86px] right-0 text-2xl 
                font-bold text-[#495464] hover:cursor-pointer'>X</p>
                {signIn ? <Signin signUp = {() => {
                    setSignIn(false);
                    setSignUp(true)
                }} /> : <Signout />}
            </div>  
        </div>
    )
}

export default Modal
