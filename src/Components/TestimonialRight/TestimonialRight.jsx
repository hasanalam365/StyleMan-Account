import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { LiaQuoteLeftSolid } from "react-icons/lia";

const TestimonialRight = () => {

    const axiosPublic = useAxiosPublic()

    const { data: testimonials = [] } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/testimonials")
            return data
        }
    })

    return (
        <div className="">
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                slidesPerView={1}
                spaceBetween={30}
                pagination={true}
                modules={[Autoplay]}
                className="mySwiper"
            >
                {
                    testimonials.map(testimonial => <SwiperSlide key={testimonial._id}>
                        <div className="bg-base-100 shadow-xl p-8 h-[220px]  space-y-2">
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-5 items-center'>
                                    <img className='h-[50px] w-[50px] rounded-full' src={testimonial.photo} alt="photo" />
                                    <div>
                                        <h4 className='text-xl font-medium'>{testimonial.name}</h4>
                                        <p>
                                            {testimonial.designation}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <LiaQuoteLeftSolid className='text-4xl text-red-600'></LiaQuoteLeftSolid>
                                </div>
                            </div>
                            <p>{testimonial.text}</p>

                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </div >
    );
};

export default TestimonialRight;