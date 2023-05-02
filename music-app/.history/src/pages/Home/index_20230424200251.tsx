import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";

function Home() {
  // const session = useSession();

  // useEffect(() => {
  //   if (session?.data?.expires === "RefreshAccessTokenError") {
  //     console.error('An error occurred: RefreshAccessTokenError');
  //     signIn();
  //   }
  // }, [session]);
  return <div className="w-full">asdsad</div>;
}

export default Home;
