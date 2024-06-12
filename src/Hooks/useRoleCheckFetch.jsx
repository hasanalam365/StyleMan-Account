import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRoleCheckFetch = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: roleChecked = [], isPending } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`)
            return res.data
        }
    })

    return [roleChecked, isPending]
};

export default useRoleCheckFetch;