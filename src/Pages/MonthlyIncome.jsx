import React from 'react';

const MonthlyIncome = () => {
    return (
        <div>
             <div className="bg-black text-white p-4 my-5">
        <h2 className="text-lg font-semibold">মাসিক আয় </h2>
            </div>

            <div className=' w-[90%] mx-auto p-6 bg-white rounded-md shadow-md'>
                <div className='flex items-center justify-between'>
                    <h4>মাসিক আয়ের হিসাব</h4>
                    <div>
                         <p className='text-sm'>মোট আয়</p>
                   <p className='text-green-600 font-semibold'> ৳0.00 </p>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyIncome;