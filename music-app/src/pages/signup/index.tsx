import { AiOutlineLock } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import Input from "../../components/elements/Form/Input";
import { FormEventHandler, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Router, { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import { signIn } from "next-auth/react";

function Signup() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfpassword, setCfpassword] = useState("");
  const [showpw, setShowpw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState("");

  const hanldeSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorLogin("");

    try {
      axios
        .post("/api/user/[id]", {
          email,
          user,
          password,
          cfpassword,
        })
        .then((data) => {
          setLoading(false);
          setVerify("Please Check Your mail");
        });
    } catch (error: any) {
      setLoading(false);
      setErrorLogin(error.response.data.message);
      console.log(error.response.data.message);
    }
    
  };
  return (
    <div className="cursor-pointer overflow-y-auto h-full bg-[#1e1e1f]">
      <div className="px-[40px] pt-[32px] pb-[8px]">
        <p className="text-3xl font-font-slide text-white font-bold border-b-[0.01px] pb-[10px] border-white border-opacity-25">
          SignUp to experience
        </p>
      </div>
      <div className="rounded-2xl w-fit mx-auto border-[1px] mt-[50px] border-[#E2E2E2] text-white">
        <div className="p-2">
          <div className="px-[32px] pt-[28px] pb-[8px]">
            <p className="text-3xl font-font-slide text-white font-bold mb-[8px]">
              Sign Up
            </p>
            <hr />
          </div>
          <div className="ml-20 mr-16 my-2 px-[25px]">
            <form className="item-center space-y-3" onSubmit={hanldeSubmit}>
              <div className="space-y-3">
                <p className="text-base font-font-slide text-white font-bold mb-[8px]">
                  Name
                </p>

                <div className="flex space-x-2 text-black">
                  <Input
                    label="User"
                    onChange={(ev: any) => setUser(ev.target.value)}
                    id="user"
                    type="text"
                    value={user}
                  />
                  <FiUser className="rounded-full h-5 w-5 text-white mt-2"></FiUser>
                </div>
                {user.length !== 0 && (user.length < 3 || user.length >= 15) ? (
                  <div className="text-[#d83a6f] text-[10px] ml-2 tracking-wide w-[80%]">
                    Should be too more than 15 Character and greater than 3
                  </div>
                ) : (
                  <span className="hidden"></span>
                )}
                <hr></hr>
              </div>
              <div className="space-y-3">
                <p className="text-base font-font-slide text-white font-bold mb-[8px]">
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
                <p className="text-base font-font-slide text-white font-bold mb-[8px]">
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

                <hr />
              </div>

              <div className="pb-3 space-y-3">
                <p className="text-base font-font-slide text-white font-bold mb-[8px]">
                  ConfirmPassword
                </p>
                <div className="flex flex-row space-x-2 items-center">
                  <Input
                    label="Cfpassword"
                    onChange={(ev: any) => setCfpassword(ev.target.value)}
                    id="Cfpassword"
                    type={`${showCpw ? "text" : "password"}`}
                    value={cfpassword}
                  />
                  <span
                    onClick={() => {
                      setShowCpw(!showCpw),
                        console.log(`${showCpw ? "text" : "password"}`);
                    }}
                  >
                    <AiOutlineLock className="rounded-full h-5 w-5 text-white"></AiOutlineLock>
                  </span>
                </div>
                {password !== cfpassword && cfpassword !== "" ? (
                  <span className="text-[#d83a6f] text-[10px] ml-2 tracking-wide">
                    Confirmpassword not match together
                  </span>
                ) : (
                  ""
                )}
                <hr />
              </div>
              <button
                className="bg-white rounded-lg bg-opacity-20 w-[86%] px-1 py-2
                                    transition duration-300 hover:translate-x-2 hover:shadow-2xl hover:-translate-y-2"
              >
                Register
              </button>
              <div className="w-fit p-2">
                <p>
                  Already have account?
                  <Link
                    href="/login"
                    className="text-[#00ADB5] hover:border-b-1 border-[#00ADB5]"
                  >
                    {" "}
                    Login
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
        {verify ? (
          <div className="items-center">
            <p className="w-fit mx-auto pb-3 text-[#00ADB5]">{verify}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Signup;
