import React from 'react';
import { FiMinus } from 'react-icons/fi';

const DailyExpense = () => {
    return (
      <div className=' pb-5'>
            <div className="bg-black text-white p-4 my-5">
        <h2 className="text-lg font-semibold">দৈনিক খরচ এন্ট্রি</h2>
            </div>
            {/* input form */}
            <div className="w-[90%] md:w-1/2 lg:w-1/2 mx-auto p-6 bg-white rounded-md shadow-md">
                <h4 className='text-white bg-red-600 p-2 text-sm mb-2 rounded-lg'> <span className='font-semibold'>আজকের তারিখ:</span> ‍শনিবার, 9 আগস্ট 2025</h4>
   <form className="space-y-4">
    <div>
      <label htmlFor="text1" className="block text-sm font-medium text-gray-700 mb-1">
        শিরোনাম  <span className='text-red-600'>*</span>
      </label>
      <input
        type="text"
        id="title"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="পণ্যের বা সেবার নাম"
      />
    </div>

    <div>
      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
       দাম (৳) <span className='text-red-600'>*</span>
      </label>
      <input
        type="number"
        id="price"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="0.00 ৳"
      />
    </div>
   

    <div>
      <label htmlFor="salesmanName" className="block text-sm font-medium text-gray-700 mb-1">
       হিসাবকারীর নাম  <span className='text-red-600'>*</span>
      </label>
      <input
        type="text"
        id="salesmanName"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="হিসাবকারীর নাম"
      />
    </div>

   <button
       type="submit"
       className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-1"
     >
       <FiMinus className='text-sm'/> খরচ যোগ করুন
     </button>
  </form>

</div>

        </div>
    );
};

export default DailyExpense;