import useSWR from "swr";
import fetcher from "@/server/fetcher";
import { useSession } from "next-auth/react";

const userCurrent = () => {
    const session = useSession().data;
    
    if (!session) {
      return { null };
    }
    const { data, error, isLoading, mutate } = useSWR(
        "/api/getCurrentUser",
        fetcher
      );
      
      
      return {
        data,
        error,
        isLoading,
        mutate,
      };
};

export default userCurrent;