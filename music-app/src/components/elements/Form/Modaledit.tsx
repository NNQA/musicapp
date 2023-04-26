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
import ClipLoader from "react-spinners/ClipLoader";

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
  const [checker, setCheckError] = useState("");
  const [image, setImage] = useState("");

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState("");
  const [cloudinaryImage, setCloudinaryImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: userI } = userCurrent();
  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      if (session !== null) {
        setSession(session);
      }
    }
    fetchData();
  }, []);
  const id: string | undefined = userI?.id;
  useEffect(() => {
    if (cloudinaryImage !== "" && id !== "") {
      const id: string = userI.id;
      axios
        .put(`/api/user/[id]`, {
          id,
          user,
          cloudinaryImage,
        })
        .then((response) => {
          setCheckError("Update Successfully")
          setLoading(false);
        })
        .catch((error) => {
          setCheckError(error.message)
          setLoading(false);
        });
    }
    setCheckError("Update Successfully")
  }, [cloudinaryImage, user, userI?.id]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }: any) => name === "file"
    ) as HTMLInputElement;
    const formData = new FormData();
    console.log(fileInput.files);
    const files = fileInput.files
      ? Array.from(fileInput.files as unknown as File[])
      : [];
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
    )
      .then((r) => r.json())
      .catch((e) => {
        setCheckError(e.message)
        setLoading(false);
      });
    setCloudinaryImage(data.secure_url);
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
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#535353] bg-opacity-60">
          <div className="w-[30%] h-2/3 mt-24 m-auto bg-[#1e1e1f] text-white">
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
                <div className="m-5 space-y-3 overflow-x-auto w-[250px]">
                  <div>
                    <label
                      htmlFor="file"
                      className="font-font-slide text-base font-bold w-[150px]"
                    >
                      Image:
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="w-[250px]"
                      onChange={(e) => {
                        if (e.currentTarget.files) {
                          setImage(
                            URL.createObjectURL(e.currentTarget.files[0])
                          );
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
                </div>
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
                <div className="m-5 pt-12 w-2/3">
                  <button
                    className="border-2 px-4 py-2 rounded-2xl w-full"
                    type="submit"
                  >
                    finish
                  </button>
                  {loading ? (
                    <div className="w-fit mx-auto">
                      <ClipLoader size={10} color="#36d7b7" loading={loading} />
                    </div>
                  ) : (
                    ""
                  )}
                  {checker === null ? (
                    <span className="text-[#d83a6f] text-[10px] ml-2 tracking-wide">
                      checker
                    </span>
                  ) : (
                    ""
                  )}
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
