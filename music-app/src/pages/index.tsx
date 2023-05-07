
import { Inter } from "next/font/google";

import { useEffect } from "react";

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/Home",
      permanent: false,
    },
  };
}

export default function Home({
  
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
    </div>
  );
}
