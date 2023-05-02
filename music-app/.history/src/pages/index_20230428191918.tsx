
import { Inter } from "next/font/google";

import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

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
