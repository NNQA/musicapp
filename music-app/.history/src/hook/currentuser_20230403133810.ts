import userSWR from 'swr'
import fetcher from '@/server/fetcher'


const userCurrent = () => {
    const {data, error, isLoading, mulate} = userSWR('/api/current', fetcher);
}