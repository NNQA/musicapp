import userSWR from 'swr'
import fetcher from '@/server/fetcher'


const userCurrent = () => {
    const {data, error, isLoading} = userSWR('/api/getCurrentUser', fetcher);
    return {
        data,
        error,
        isLoading
    }
};
export default userCurrent;