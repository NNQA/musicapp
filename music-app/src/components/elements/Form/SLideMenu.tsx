import React, { useState } from "react";
import { data } from "./data";
import { AiOutlineLogout } from "react-icons/ai";
import { FcMusic } from "react-icons/fc";
import { signOut } from "next-auth/react";
import Link from "next/link";
import router from "next/router";
import Router from "next/router";

interface ButtonProps {
  isSelected: number;
  check: boolean;
  onClick: () => void;
}
function SLideMenu() {
  const initialButtonState: ButtonProps = {
    isSelected: 0,
    check: true,
    onClick: () => {},
  };
  const [buttonState, setButtonState] = useState(initialButtonState);
  const handleButtonClick = (idx: number) => {
    setButtonState({ ...buttonState, isSelected: idx, check: true });
    buttonState.onClick();
  };
  const handleSignOut = () => signOut();

  return (
    <div className="w-[260px] border-r-[0.1px] border-white border-opacity-25 h-screen bg-[#2c2c2e] text-white cursor-pointer">
      <div className="pb-3 w-[200px] px-[30px] pt-[20px] flex items-center space-x-2">
        <FcMusic></FcMusic>
        <p className="text-xl font-font-slide">Music Social</p>
      </div>
      <div
        className="px-[30px] h-[65px] mt-[12px] space-x-4"
        onClick={() => Router.push("/Search")}
      >
        <div className="w-fit items-center border-[0.1px] border-white border-opacity-25 flex p-1 rounded-xl">
          <svg height="12" width="14" viewBox="0 0 16 16" aria-hidden="true">
            <path
              fill="#FFFFFF"
              d="M11.87 10.835c.018.015.035.03.051.047l3.864 3.863a.735.735 0 1 1-1.04 1.04l-3.863-3.864a.744.744 0 0 1-.047-.051 6.667 6.667 0 1 1 1.035-1.035zM6.667 12a5.333 5.333 0 1 0 0-10.667 5.333 5.333 0 0 0 0 10.667z"
            ></path>
          </svg>
          <p className="w-[174px] focus:border-none py-[0.8px] pl-[1.5px] ml-[1px] pr-[0.8px] bg-transparent outline-none">
            Search
          </p>
        </div>
      </div>
      <div className="flex items-center font-font-slide px-[28px]">
        <ul className="">
          {data.map((item, index) => (
            <li
              key={index}
              className={`list-none py-3 px-2 w-[209px] ${
                buttonState.isSelected === index
                  ? "bg-white rounded-lg bg-opacity-20"
                  : ""
              }`}
              onClick={() => handleButtonClick(index)}
            >
              <div
                className="flex flex-row space-x-2 items-center text-lg font-font-slide"
                onClick={() =>
                  router.push(`/${item.name}`, undefined, { shallow: true })
                }
              >
                <item.icon className="text-[#fa586a]"></item.icon>
                <p
                  className={`-m-3 text-sm font-bold ${
                    buttonState.isSelected === index ? "text-base" : ""
                  }`}
                >
                  {item.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <hr className="border-[0.1px] border-white border-opacity-25" />
      </div>
      <div
        className="flex px-[30px] items-center my-4 space-x-1"
        onClick={handleSignOut}
      >
        <AiOutlineLogout></AiOutlineLogout>
        <p className="font-font-slide ">Log out</p>
      </div>
    </div>
  );
}

export default SLideMenu;
