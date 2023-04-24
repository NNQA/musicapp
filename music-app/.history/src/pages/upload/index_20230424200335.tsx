import React, { useEffect, useState } from "react";

import userCurrent from "@/hook/currentuser";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import ClipLoader from "react-spinners/ClipLoader";

function Upload() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [descript, setDescription] = useState("");
  const [imgcl, setImgcl] = useState("");
  const [audioCl, setAudioCl] = useState("");
  const { data: userI } = userCurrent();
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [errorlogin, setErrorlogin] = useState("");
  const [success, setSuccess] = useState("");
  let option = "getone";
  useEffect(() => {
    getSession({}).then((session) => {
      if (session !== null) {
        setSession(session);
      }
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;

    const fileImages = Array.from(form.elements).find(
      ({ name }: any) => name === "file"
    ) as HTMLInputElement;
    const fileAudios = Array.from(form.elements).find(
      ({ name }: any) => name === "mp3"
    ) as HTMLInputElement;
    const formData = new FormData(form);
    const fileImage = fileImages.files
      ? Array.from(fileImages.files as unknown as File[])
      : [];
    const fileAudio = fileAudios.files
      ? Array.from(fileAudios.files as unknown as File[])
      : [];
    for (const file of fileImage) {
      formData.append("image", file);
    }
    for (const audio of fileAudio) {
      formData.append("audio", audio);
    }
    const id: string = userI.id;
    formData.append("id", id);
    try {
      const tempVariant: AxiosResponse = await axios.post(
        "/api/song/server",
        formData
      );
      setLoading(false);
      setErrorlogin("");
      setSuccess("Successfully");
      setImgcl("");
      setAudioCl("");
      setImage("");
      setDescription("");
    } catch (error: any) {
      setErrorlogin(error.response.data.message);
      setLoading(false);
      console.log(error.response.data.message);
    }
    setImgcl("");
    setAudioCl("");
    setImage("");
    setDescription("");
    // } else {
    //   setLoading(false);
    //   setErrorLogin(
    //     "Bad Request your fileAudio and your File Image have trouble"
    //   );
  };
  return (
    <div className="bg-[#1e1e1f] font-font-slide overflow-y-scroll h-full">
      <div className="px-[40px] pt-[32px] pb-[8px]">
        <p className="text-3xl font-font-slide text-white font-bold border-b-[0.01px] pb-[10px] border-white border-opacity-25">
          Upload
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="px-[20px] py-[20px] my-[20px] text-white
          border-white border-opacity-50 rounded-md
         space-y-10 border-[1px] w-fit mx-auto"
      >
        <div className="flex space-x-10">
          <label
            htmlFor="name"
            className="font-font-slide text-base font-bold w-[150px]"
          >
            Song Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your song name"
            className="outline-none border-b-[1px] bg-transparent"
            onChange={(e) => {
              setName(e.currentTarget.value), setSuccess("");
            }}
          />
        </div>
        <div className="flex space-x-10">
          <label
            htmlFor="descript"
            className="font-font-slide text-base font-bold w-[150px]"
          >
            Description Song:
          </label>
          <textarea
            name="descript"
            id="descript"
            placeholder="Enter your description"
            className="outline-none border-b-[1px] bg-transparent"
            onChange={(e) => {
              setDescription(e.currentTarget.value);
            }}
          />
        </div>
        <div className="flex space-x-10">
          <label
            htmlFor="image"
            className="font-font-slide text-base font-bold w-[150px]"
          >
            Image:
          </label>
          <input
            type="file"
            name="file"
            id="imge"
            className="w-[250px]"
            onChange={(e) => {
              if (e.currentTarget.files) {
                setImage(URL.createObjectURL(e.currentTarget.files[0]));
              }
            }}
          />
        </div>
        <div className="h-[100px] w-fit border-dashed border-2 p-2 border-white">
          {image ? (
            <img src={image} alt="aa" className="h-full" />
          ) : (
            "No image selected"
          )}
        </div>
        <div className="flex space-x-10">
          <label
            htmlFor="mp3"
            className="font-font-slide text-base font-bold w-[150px]"
          >
            Audio:
          </label>
          <input type="file" name="mp3" id="mp3" className="w-[250px]" />
        </div>
        <div className="flex">
          <button className="bg-[#00ADB5] text-white hover:shadow-2xl hover:scale-75 duration-200 items-center px-2 py-1 rounded-md">
            submit
          </button>

          {loading ? (
            <div className="w-fit mx-auto">
              <ClipLoader size={10} color="#36d7b7" loading={loading} />
            </div>
          ) : (
            ""
          )}
        </div>
        {errorlogin ? (
          <div className="items-center">
            <p className="w-fit mx-auto pb-3 text-red-600">{errorlogin}</p>
          </div>
        ) : (
          ""
        )}
        {success ? (
          <div className="items-center">
            <p className="w-fit mx-auto pb-3 text-green-600">{success}</p>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default Upload;
