

import TestimonialRight from "../../../Components/TestimonialRight/TestimonialRight";

const Testimonial = () => {


    return (
        <div className="flex gap-10 bg-gray-100 p-16 mb-10">
            {/* testimonital head */}
            <div className="w-2/5 space-y-3">
                <h5 className="font-medium text-red-600">Testimonial</h5>
                <h3 className="text-3xl font-semibold">Testimonials</h3>
                <p>Inspirational stories from our donors and recipients. Learn how ordinary people become extraordinary heroes through the simple act of giving blood, and the profound impact it has on countless lives</p>
                <button className="btn bg-red-500 text-white">View More</button>
            </div>
            {/* review  */}
            <div className="w-3/5">
                <TestimonialRight></TestimonialRight>
            </div>
        </div>
    );
};

export default Testimonial;