import React from "react";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import axios, { AxiosResponse } from "axios";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import userCurrent from "@/hook/currentuser";
import { Console } from "console";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import formidable from "formidable";
import { Session } from "next-auth";

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props: {}
//   }
// }
function Modaledit({ actionModal, setActionModal }: any) {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState();
  const [checker, setCheckError] = useState();
  
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState("");
  const [cloudinaryImage, setCloudinaryImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const {data: userI} = userCurrent();
  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      if (session !== null) {
        setSession(session);
      }
    }
    fetchData();
  }, []);
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFile(event.target.files && event.target.files[0]);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }: any) => name === "file"
    ) as HTMLInputElement;
    const formData = new FormData();
    console.log(fileInput.files);
    const files = fileInput.files ? Array.from(fileInput.files as File[]) : [];
    console.log(files);
    for (const file of files) {
      formData.append("file", file);
    }
    formData.append("upload_preset", "upload");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dgmss9oy4/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    setCloudinaryImage(data.secure_url)
    console.log(data.secure_url);
    const id: string = userI.id
    const tempVariant: AxiosResponse = await axios.put(`/api/user/[id]`, {
      id, user, cloudinaryImage,
    });
    console.log(tempVariant); 
  };
  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div className="opacity-95">
      <button
        className="border-2 rounded-lg text-white px-2 py-1"
        onClick={() => {
          toggle(), setActionModal(!actionModal);
        }}
      >
        Edit Profile
      </button>
      {modal ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black">
          <div className="w-[30%] h-2/3 mt-24 m-auto bg-gray-500 text-white">
            <div className="flex justify-between p-5 border-b-2">
              <h3>Edit your profile</h3>
              <button
                className=""
                onClick={() => {
                  toggle(), setActionModal(!actionModal);
                }}
              >
                Close
              </button>
            </div>
            <div className="py-1 w-fit mx-auto">
              <form className="flex flex-col space-y-1" onSubmit={handleSubmit}>
                <div className="w-1/2 m-5">
                  <label htmlFor="name" className="block pb-2">
                    UserName
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="block text-black p-1"
                    value={user}
                    onChange={(ev: any) => {
                      setUser(ev.target.value);
                    }}
                  />
                </div>
                <div className="m-5 space-y-3">
                  <label htmlFor="file" className="block">
                    Image
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="block"
                    onChange={handleFileInputChange}
                  />
                </div>
                <div className="m-5 pt-12 w-2/3">
                  <button
                    className="border-2 px-4 py-2 rounded-2xl w-full"
                    type="submit"
                  >
                    finish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Modaledit;
