import useSWR from "swr";
import fetcher from "@/server/fetcher";
import { useSession } from "next-auth/react";

const userCurrent = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/getCurrentUser",
    fetcher
  );
  const { session } = useSession();

  if (!session) {
    return { data: null, error: null, isLoading: true, mutate };
  }

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default userCurrent;
