import { data } from "@/components/elements/Form/data";
import userCurrent from "@/hook/currentuser";
import axios, { AxiosResponse } from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const App: React.FC = () => {
  const [id, setId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState();
  const [checker, setCheckError] = useState("");
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: userI } = userCurrent();

  useEffect(() => {
    if (userI && userI.id) {
      setId(userI.id);
    }
  }, [userI]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }: any) => name === "file"
    ) as HTMLInputElement;
    const formData = new FormData(e.currentTarget);
    console.log(fileInput.files);
    const files = fileInput.files
      ? Array.from(fileInput.files as unknown as File[])
      : [];
    console.log(files);
    for (const file of files) {
      formData.append("file", file);
    }
    formData.append("name", user);
    if (id !== null) {
      formData.append("id", id);
    }
    console.log(id);
    try {
      axios
        .post("/api/playlist/server", formData)
        .then((data) => {
          setLoading(false);
          setSuccess("Successfully");
          Router.push("/Playlist");
          console.log(data);
        })
        .catch((e) => {
          setLoading(false);
          setSuccess("Create Failure");
          console.log(e);
        });
    } catch (error: any) {
      setLoading(false);
      setSuccess("Create Failure");
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#1e1e1f] font-font-slide overflow-y-scroll h-full">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#535353] bg-opacity-60">
        <div className="w-[25%] h-[500px] mt-24 m-auto bg-[#1e1e1f] text-white">
          <div className="flex justify-between p-5 border-b-2">
            <h3>Create a playlist</h3>
            <button
              className=""
              onClick={() => {
                Router.push("/Playlist");
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
                    className="font-font-slide text-base font-bold"
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
              </div>
              <div className="w-1/2 m-5">
                <label htmlFor="name" className="block pb-2">
                  Name Playlist
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
                {checker !== "" ? (
                  <span className="text-[#d83a6f] text-[10px] ml-2 tracking-wide">
                    {checker}
                  </span>
                ) : (
                  ""
                )}
                {success !== "" ? (
                  <span className="text-[#00ADB5] text-[10px] ml-2 tracking-wide">
                    {success}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
