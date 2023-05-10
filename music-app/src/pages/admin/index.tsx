import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/lib/utilts/model";
import ReactPaginate from "react-paginate";
import Userimg from "../../static/user.png";
import Image from "next/image";
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log(session);
  if (session === null) {
    return {
      redirect: {
        destination: "/Sorry",
        permanent: false,
      },
    };
  }
  if (session.user?.name !== "admin") {
    return {
      redirect: {
        destination: "/Profile",
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: {},
    },
  };
}
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
function Items({ currentItems }: any) {
  return (
    <>
      {currentItems &&
        currentItems.map((item: any) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

function Admin() {
  const [lists, setList] = useState<User[]>([]);
  const listUser: any = [];
  const [pageNumber, setPages] = useState(0);
  let sizeList = 5;
  let pagesVisited = pageNumber * sizeList;
  let pagesCount = 0;

  useEffect(() => {
    axios
      .get(`/api/user/${"admin"}`)
      .then((r) => {
        r.data.map((item: User) => {
          if (item.name !== "admin") {
            listUser.push(item);
          }
        });
        console.log(listUser);
        console.log("as");
        setList(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [pagesCount]);

  const changepage = ({ selected }: any) => {
    console.log(selected);
    setPages(selected);
  };
  return (
    <div className="bg-[#1e1e1f] font-font-slide overflow-y-scroll h-full w-full">
      <div className="mx-auto py-[32px] text-white border-[1px] border-white border-opacity-30 w-[1550px] h-fit mt-[50px] rounded-xl">
        <div className="text-3xl pb-12 pl-5">User Management</div>
        <div className="grid grid-cols-5  border-b-[1px] pl-12 text-[#19A7CE] border-white border-opacity-30 font-font-slide text-lg font-bold pb-2">
          <p>#</p>
          <p>Name</p>
          <p>Role</p>
          <p>Action</p>
          <p>Email</p>
        </div>
        {lists
          .slice(pagesVisited, pagesVisited + sizeList)
          .map((item: User, idx: number) => (
            <div
              key={idx}
              className="grid grid-cols-5 border-b-[1px] pl-12 border-white border-opacity-30 space-y-7 items-center pb-4"
            >
              <p>{idx}</p>
              <div className="flex items-center space-x-5">
                {item.image === "" ? (
                  <Image
                    src={Userimg}
                    alt="Image User"
                    className="w-[50px] aspect-square rounded-full object-cover"
                  ></Image>
                ) : (
                  <img
                    src={item.image}
                    alt="img User"
                    className="w-[50px] aspect-square rounded-full"
                  />
                )}
                <p>{item.name}</p>
              </div>
              <div>
                {item.name === "admin" ? <p>{item.name}</p> : <p>User</p>}
              </div>
              <p>Action</p>
              <p>{item.email}</p>
            </div>
          ))}
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={Math.ceil(lists.length / sizeList)}
          onPageChange={changepage}
          className="flex space-x-6 justify-end mt-12 pr-4 font-bold"
        />
      </div>
    </div>
  );
}

export default Admin;
