import userSWR from 'swr'
import fetcher from '@/server/fetcher'


const userCurrent = () => {
    const {data, error, isLoading} = userSWR('/api/current', fetcher);
    console.log(data);
    return {
        data,
        error,
        isLoading
    }
};
export default userCurrent;