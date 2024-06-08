import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {

    // const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users')
            return data
            //jwt create korar por headers kora add kora hoyese
        }
    })

    return [users, refetch]
};

export default useAllUsers;