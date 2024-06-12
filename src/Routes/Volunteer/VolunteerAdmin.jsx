import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const VolunteerAdmin = () => {

    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data: userDataSingle = [] } = useQuery({
        queryKey: ['kalankaree'],
        queryFn: async () => {
            const res = await axiosPublic.get(`users-all-donations-request/${user.email}`)
            return res.data
        }
    })

    console.log('paisipaisi', userDataSingle)
    return (
        <div>

        </div>
    );
};

export default VolunteerAdmin;