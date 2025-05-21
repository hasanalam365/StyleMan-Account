import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { LiaQuoteLeftSolid } from 'react-icons/lia';

const Testimonials = () => {

    const axiosPublic = useAxiosPublic();

    const { data: testimonials = [] } = useQuery({
        queryKey: ['testimonials-all'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/testimonials");
            return data;
        }
    });


    return (
        <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                testimonials.map((testimonial, index) => (
                    <div 
                        key={testimonial._id || index}  
                        className="bg-base-100 shadow-xl p-8 h-[220px] space-y-2"
                    >
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-5 items-center'>
                                <img 
                                    className='h-[50px] w-[50px] rounded-full' 
                                    src={testimonial.photo} 
                                    alt="photo" 
                                />
                                <div>
                                    <h4 className='text-xl font-medium'>{testimonial.name}</h4>
                                    <p>{testimonial.designation}</p>
                                </div>
                            </div>
                            <div>
                                <LiaQuoteLeftSolid className='text-4xl text-red-600' />
                            </div>
                        </div>
                        <p>{testimonial.text}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default Testimonials;
