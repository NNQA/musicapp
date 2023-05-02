
import { Inter } from "next/font/google";

import { useEffect } from "react";

export async function getServerSideProps() {
  
}

export default function Home({
  
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log("asdsd");
  });
  return (
    <div>
    </div>
  );
}
