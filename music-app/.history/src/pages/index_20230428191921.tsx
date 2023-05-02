
import { Inter } from "next/font/google";

import { useEffect } from "react";

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
  return {
    props: {
      data: {},
    },
  };
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
