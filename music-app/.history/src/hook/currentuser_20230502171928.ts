import userSWR from 'swr'
import fetcher from '@/server/fetcher'

getCurrentUser
const userCurrent : any = () => {
    const { data, error, isLoading, mutate } = useSwr('/api/getCurrentUser', fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  }
};
export default userCurrent;