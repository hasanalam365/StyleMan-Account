import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDataLoad = () => {

    const axiosPublic = useAxiosPublic()

    const { data: districts = [] } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/districts")
            return data
        }
    })
    const { data: upazilas = [] } = useQuery({
        queryKey: ['upazilas'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/upazilas")
            return data
        }
    })


    return [districts, upazilas]
};

export default useDataLoad;