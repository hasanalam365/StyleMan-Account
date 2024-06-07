

import { useQuery } from "@tanstack/react-query";
import TestimonialRight from "../../../Components/TestimonialRight/TestimonialRight";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Testimonial = () => {

    const axiosPublic = useAxiosPublic()

    const { data: testimonials = [] } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/testimonials")
            return data
        }
    })


    return (
        <div className="flex gap-10 bg-gray-100 p-16 mb-10">
            {/* testimonital left */}
            <div className="w-2/5 space-y-3">
                <h5 className="font-medium text-red-600">Testimonial</h5>
                <h3 className="text-3xl font-semibold">Testimonials</h3>
                <p>Inspirational stories from our donors and recipients. Learn how ordinary people become extraordinary heroes through the simple act of giving blood, and the profound impact it has on countless lives</p>
                <button className="btn bg-red-500 text-white">View More</button>
            </div>
            {/* testimonials rigth  */}
            <div className="w-3/5">
                <TestimonialRight></TestimonialRight>
            </div>
        </div>
    );
};

export default Testimonial;