import { useSession, signIn, signOut, getProviders, ClientSafeProvider, getSession } from "next-auth/react"
import { AiOutlineLock } from "react-icons/ai"
import { HiOutlineMail } from "react-icons/hi"
import { FcGoogle } from "react-icons/fc"
import { FiUser } from "react-icons/fi"
import Image from 'next/image'
import headphone from '../../static/headphone.jpg'
import Input from "../../components/elements/Form/Input"
import { useCallback, useState } from "react"
import axios from "axios"



export default function Component() {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cfpassword, setCfpassword] = useState('');

    const [variant, setVariant] = useState('login');

    var toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    const handlingLogin = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl:'/user'
            })
        }
        catch(error) {
            console.log(error)
        }
    },[email,
        password])
    const handleSignInGG = () => {
        signIn('google', { callbackUrl: '/user' });
    }

    const handleRegister = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                user,
                password,
                cfpassword,
            });
        } catch (error) {
            console.log(error);
        }
    }, [email,
        user,
        password,
        cfpassword,]);

    return (
        <div className='flex items-center justify-center h-screen cursor-pointer'>
            <div className="bg-[#EEEEEE] max-w-3xl flex rounded-2xl">
                <div className="w-1/2">
                    <div className=" p-2">
                        <p className="text-[#00ADB5] text-2xl font-bold">Explore</p>
                        <p className="text-[#393E46] text-opacity-25 shadow-2xl">Music is the moonlight in the gloomy night of life.</p>
                        <p className="text-[#222831]">
                            {variant === 'login' ? 'Sign In' : 'Sign Up'}</p>
                    </div>
                    <div className="p-2">
                        <form className="item-center space-y-3" method="GET">
                            {variant === 'register' && (
                                <div className="flex flex-row space-x-2 items-center">
                                    <Input
                                        label="User"
                                        onChange={(ev: any) => setUser(ev.target.value)}
                                        id="user"
                                        type="text"
                                        value={user}
                                    />
                                    <FiUser className="rounded-full h-5 w-5 text-[#393E46]"></FiUser>
                                </div>
                            )}
                            <div className="flex flex-row space-x-2 items-center">
                                <Input
                                    label="Email"
                                    onChange={(ev: any) => setEmail(ev.target.value)}
                                    id="email"
                                    type="email"
                                    value={email}
                                />
                                <HiOutlineMail className="rounded-full h-5 w-5 text-[#393E46]"></HiOutlineMail>
                            </div>
                            <div className="flex flex-row space-x-2 items-center">
                                <Input
                                    label="Password"
                                    onChange={(ev: any) => setPassword(ev.target.value)}
                                    id="password"
                                    type="password"
                                    value={password}
                                />
                                <AiOutlineLock className="rounded-full h-5 w-5 text-[#393E46]"></AiOutlineLock>
                            </div>
                            {variant === 'register' && (
                                <div className="flex flex-row space-x-2 items-center">
                                    <Input
                                        label="Cfpassword"
                                        onChange={(ev: any) => setCfpassword(ev.target.value)}
                                        id="Cfpassword"
                                        type="password"
                                        value={cfpassword}
                                    />
                                    <AiOutlineLock className="rounded-full h-5 w-5 text-[#393E46]"></AiOutlineLock>
                                </div>
                            )}
                            <button
                                type="submit"
                                className="bg-[#393E46] w-[60%] p-1 rounded-2xl bg-opacity-20
                                transition duration-300 hover:translate-x-2 hover:shadow-2xl hover:-translate-y-2"
                                onClick={handleRegister}>
                                {variant === 'login' ? 'Log in' : 'Register'}
                            </button>
                            {variant === 'login' && (
                                <div className="grid grid-cols-3 text-gray-900 items-center w-[60%]">
                                    <hr className="border-gray-500" />
                                    <p className="text-[10px] text-center">OR</p>
                                    <hr className="border-gray-500" />
                                </div>
                            )}
                            {variant === 'login' && (
                                <div className="bg-[#393E46] w-[60%] p-1 rounded-2xl bg-opacity-20
                                transition duration-300 hover:translate-x-2 hover:shadow-2xl 
                                hover:-translate-y-2 flex items-center justify-center"
                                    onClick={handleSignInGG}>
                                    <p>Log in with Google</p>
                                    <FcGoogle className="pt-1 h-5 w-5" />
                                </div>
                            )}
                            <div className="p-1">
                                <p>
                                    Join World Music With Me
                                    <span className="text-[#00ADB5]
                                        hover:shadow-2xl"
                                        onClick={toggleVariant}>
                                        {variant === 'register' ? ' Log in' : ' Register'}</span></p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='w-1/2 p-8'>
                    <Image src={headphone}
                        alt="headphone"
                        className={`${variant === 'register' ? 'rounded-2xl h-full pb-3 pt-2' : 'rounded-xl h-full'}`}
                    />
                </div>
            </div>
        </div>
    )

}
