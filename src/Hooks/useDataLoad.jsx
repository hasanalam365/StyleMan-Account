import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDataLoad = () => {

    const axiosPublic = useAxiosPublic()

    //donation Request data load
    const { data: donationRequests = [] } = useQuery({
        queryKey: ['donationRequests'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/create-donation-request")
            return data
        }
    })


    //district data load
    const { data: districts = [] } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/districts")
            return data
        }
    })

    //upazila data load
    const { data: upazilas = [] } = useQuery({
        queryKey: ['upazilas'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/upazilas")
            return data
        }
    })





    return [donationRequests, districts, upazilas]
};

export default useDataLoad;