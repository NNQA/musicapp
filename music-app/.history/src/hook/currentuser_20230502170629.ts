import userSWR from 'swr'
import fetcher from '@/server/fetcher'


const userCurrent : any = () => {
    const {data, error, isLoading} = userSWR('/api/getCurrentUser', fetcher);
    return {
        data,
        error,
        isLoading
    }
};
export default userCurrent;