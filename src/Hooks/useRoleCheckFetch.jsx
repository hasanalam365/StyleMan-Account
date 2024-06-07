import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRoleCheckFetch = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: roleChecked } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`)
            console.log(res.data)
            return res.data
        }
    })

    return [roleChecked]
};

export default useRoleCheckFetch;