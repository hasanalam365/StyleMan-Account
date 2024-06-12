import TestimonialRight from "../../../Components/TestimonialRight/TestimonialRight";

const Testimonial = () => {

    return (
        <div className="flex flex-col md:flex-col lg:flex-row  gap-10 bg-gray-100 p-4 md:p-8 lg:p-16 ">
            {/* testimonital left */}
            <div className="w-full md:2/5 lg:w-2/5 space-y-3">
                <h5 className="font-medium text-red-600">Testimonial</h5>
                <h3 className="text-3xl font-semibold">Testimonials</h3>
                <p>Inspirational stories from our donors and recipients. Learn how ordinary people become extraordinary heroes through the simple act of giving blood, and the profound impact it has on countless lives</p>
                <button className="btn bg-red-500 text-white">View More</button>
            </div>
            {/* testimonials rigth  */}
            <div className="w-full lg:w-3/5">
                <TestimonialRight></TestimonialRight>
            </div>
        </div>
    );
};

export default Testimonial;