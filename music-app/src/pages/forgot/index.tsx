import Input from "@/components/elements/Form/Input";
import axios from "axios";
import React, { FormEventHandler, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorLogin("");
    try {
      axios
        .post("/api/retrievPassword", {
          email,
        })
        .then((data) => {
          setLoading(false);
          setVerify("Please Check Your mail");
        }).catch(e => {
          setLoading(false);
          setErrorLogin(e.response.data.message);
          console.log(e.response.data.message);
        })
    } catch (error: any) {
      setLoading(false);
      console.log(error.response.data.message);
      setErrorLogin(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="cursor-pointer overflow-y-auto h-full bg-[#1e1e1f]">
      <div className="px-[40px] pt-[32px] pb-[8px]" >
        <p className="text-3xl font-font-slide text-white font-bold border-b-[0.01px] pb-[10px] border-white border-opacity-25">
          Password retrieval
        </p>
      </div>
      <form className="item-center space-y-3 bg w-fit mx-auto mt-[150px]" onSubmit={handleSubmit}>
        <div className="flex space-x-12 items-center">
          <p className="text-xl font-font-slide text-white font-bold mb-[8px] space-x-2">
            Enter your email
          </p>
          <div className="flex flex-row space-x-2 items-center">
            <Input
              label="Email"
              onChange={(ev: any) => setEmail(ev.target.value)}
              id="email"
              type="email"
              value={email}
            />
          </div>
        </div>

        <button className="bg-white w-full p-2 rounded-xl">
          Retriev
        </button>
      </form>
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
  );
}

export default Forgot;
