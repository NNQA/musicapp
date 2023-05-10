import React from "react";
import { RiHeadphoneFill } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

function BarUser() {
  const route = useRouter();
  return (
    <div className="bg-[#1e1e1f] border-b-[1px] border-white border-opacity-25 py-4 w-full cursor-pointer">
      <div className="flex justify-between items-center h-full text-[#f5f5f7]">
        <div className="font-font-slide h-[32px] ml-12 flex items-end space-x-2">
          <p>Enjoin World Music</p>
          <RiHeadphoneFill className="mb-1"></RiHeadphoneFill>
        </div>
        <div className="flex space-x-6 mr-24 items-center">
          <BiCategoryAlt></BiCategoryAlt>
          <FaUserCircle
            className="text-2xl"
            onClick={() => route.push("/admin")}
          ></FaUserCircle>
        </div>
      </div>
    </div>
  );
}

export default BarUser;
