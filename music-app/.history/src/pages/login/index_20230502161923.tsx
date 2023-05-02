import { signIn, getSession } from "next-auth/react";
import { AiOutlineLock } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import Input from "../../components/elements/Form/Input";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import { sign } from "crypto";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session !== null) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default function Component() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkErrorLogin, setCheckErrorLogin] = useState("");
  const [showpw, setShowpw] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const [loading, setLoading] = useState(false);

  const [variant, setVariant] = useState("login");

  const hanldeSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorLogin("");
    try {
      console.log(1);
      const a = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      console.log(1);

      setLoading(false);
      if (a?.error) {
        e.preventDefault();
        setErrorLogin(a?.error);
      } else {
        router.push("/");
      }
    } catch (error: any) {
      setErrorLogin(error.message);
      console.log("wtf", error);
    }
  };
  const handleSignInGG = () => {
    signIn("google",{callbackUrl: "/"});
  }

  return (
    <div className="cursor-pointer overflow-y-auto h-full bg-[#1e1e1f]">
      <div className="px-[40px] pt-[32px] pb-[8px]">
        <p className="text-3xl font-font-slide text-white font-bold border-b-[0.01px] pb-[10px] border-white border-opacity-25">
          Login to experience
        </p>
      </div>
      <div className="rounded-2xl w-fit mx-auto border-[1px] mt-[50px] border-[#E2E2E2] text-white">
        <div className="p-2">
          <div className="px-[32px] pt-[28px] pb-[8px]">
            <p className="text-3xl font-font-slide text-white font-bold mb-[8px]">
              Sign In
            </p>
            <hr />
          </div>
          <div className="ml-20 mr-16 my-2 px-[25px]">
            <form className="item-center space-y-3" onSubmit={hanldeSubmit}>
              <div className="space-y-3">
                <p className="text-xl font-font-slide text-white font-bold mb-[8px] space-x-2">
                  Email
                </p>
                <div className="flex flex-row space-x-2 items-center">
                  <Input
                    label="Email"
                    onChange={(ev: any) => setEmail(ev.target.value)}
                    id="email"
                    type="email"
                    value={email}
                  />
                  <HiOutlineMail className="rounded-full h-5 w-5 text-white"></HiOutlineMail>
                </div>
                {email.match("@") || email === "" ? (
                  ""
                ) : (
                  <span className="text-[#d83a6f] text-[10px] ml-2 tracking-wide">
                    It is not valid email address
                  </span>
                )}
                <hr />
              </div>
              <div className="space-y-3">
                <p className="text-xl font-font-slide text-white font-bold mb-[8px]">
                  Password
                </p>
                <div className="flex flex-row space-x-2 items-center ">
                  <Input
                    label="Password"
                    onChange={(ev: any) => setPassword(ev.target.value)}
                    id="password"
                    type={`${showpw ? "text" : "password"}`}
                    value={password}
                  />
                  <span
                    onClick={() => {
                      setShowpw(!showpw),
                        console.log(`${showpw ? "text" : "password"}`);
                    }}
                  >
                    <AiOutlineLock className="rounded-full h-5 w-5 text-white"></AiOutlineLock>
                  </span>
                </div>
                <div>
                  {setCheckErrorLogin === null ? (
                    <span className="text-[#d83a6f] text-[10px] ml-2 tracking-wide">
                      setCheckErrorLogin
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <hr />
              </div>
              <button
                className="bg-white rounded-lg bg-opacity-20 w-[86%] px-1 py-2
                                transition duration-300 hover:translate-x-2 hover:shadow-2xl hover:-translate-y-2"
              >
                Log in
              </button>
              <div className="grid grid-cols-3 text-gray-900 items-center w-[80%]">
                <hr className="border-gray-500" />
                <p className="text-[10px] text-center text-white">OR</p>
                <hr className="border-gray-500" />
              </div>
              <div
                className="bg-white rounded-lg bg-opacity-20 px-1 py-2 
                                transition duration-300 hover:translate-x-2 hover:shadow-2xl 
                                hover:-translate-y-2 flex items-center justify-center w-[86%]"
                onClick={handleSignInGG}
              >
                <p>Log in with Google</p>
                <FcGoogle className="pt-1 h-5 w-5" />
              </div>
              <div className="w-fit p-2">
                <p>
                  Dont have account ?
                  <Link href="/signup" className="text-[#00ADB5] ">
                    {" "}
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        {loading ? (
          <div className="w-fit mx-auto">
            <ClipLoader size={10} color="#36d7b7" loading={loading} />
          </div>
        ) : (
          ""
        )}
        {errorLogin ? (
          <div className="items-center">
            <p className="w-fit mx-auto pb-3 text-red-600">{errorLogin}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
