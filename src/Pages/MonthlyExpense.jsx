import React from 'react';
import { CiFilter } from 'react-icons/ci';
import { FaEdit } from 'react-icons/fa';
import { IoIosTrendingDown } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';

const MonthlyExpense = () => {
    return (
        <div>
                    <div className="bg-black text-white p-4 my-5">
                        <h2 className="text-lg font-semibold">মাসিক খরচ </h2>
                   </div>
       
                   <div className=' mt-5 w-[95%] mx-auto md:mx-6 lg:mx-[30px] p-6 bg-white rounded-md shadow-md'>
                       <div className='flex items-center justify-between'>
                           <h4>মাসিক খরচের হিসাব</h4>
                           <div>
                                <p className='text-sm'>মোট খরচ</p>
                          <p className='text-red-600 font-semibold'> ৳0.00 </p>
                          </div>
                       </div>
                       <div className='flex items-center gap-3'>
                           <CiFilter className='text-lg' />
       
                           <select
                               className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                               defaultValue=""
                           >
                               <option value="" disabled>Filter by</option>
                               <option value="today">আজকের</option>
                               <option value="week">এই সপ্তাহের</option>
                               <option value="month">এই মাসের</option>
                               <option value="year">এই বছরের</option>
                           </select>
                        </div>
       
                   </div>
                   <div className='mt-5  w-[95%] mx-auto md:mx-6 lg:mx-[30px] shadow-sm rounded-lg bg-white p-6'>
                       <h3 className='font-semibold mb-2'>মাসভিত্তিক সারসংক্ষেপ</h3>
                        <div className="stat shadow-sm rounded-lg bg-red-100 md:w-1/2 lg:w-1/2">
                                   <div className="stat-figure text-red-600">
                                     <IoIosTrendingDown className="text-4xl" />
                                   </div>
                                   <div className="stat-title">আগস্ট ২০২৫</div>
                                   <div className="stat-value">
                                     <span className="text-sm">৳</span> ৫,০০০
                                   </div>
                                   <div className="stat-desc">3 টি লেনদেন</div>
                                 </div>
                   </div>
       
                   <div className="mt-5 mt-5 w-[95%] mx-auto md:mx-6 lg:mx-[30px]">
                           <div className="bg-white ">
                             <h2 className="text-lg font-bold p-3"> সকল খরচের তালিকা </h2>
                              <div className="divider mt-0 pt-0 mb-0"></div>
                           </div>
                          
                            {/* Recent Transactions */}
                         <div className="overflow-x-auto  bg-white">
                           
                           <table className="table">
                             {/* Head */}
                             <thead>
                               <tr>
                                 <th>সেলসম্যান</th>
                                 <th>শিরোনাম</th>
                                 <th>টাকার পরিমাণ</th>
                                 <th>সময়/তারিখ</th>
                                 <th>অ্যাকশন</th>
                               </tr>
                             </thead>
                             <tbody>
                               {/* Row 1 */}
                               <tr>
                                 <th>01</th>
                                 <td>
                                   <div className="flex items-center gap-3">
                                     <div>
                                       <div className="font-bold">Hart Hagerty</div>
                                       <div className="text-sm opacity-50">United States</div>
                                     </div>
                                   </div>
                                 </td>
                                 <td>
                                   Zemlak, Daniel and Leannon
                                   <br />
                                   <span className="badge badge-ghost badge-sm">
                                     Desktop Support Technician
                                   </span>
                                 </td>
                                 <td>
                                   30/09/2025
                                   <br />
                                   <span className="badge badge-ghost badge-sm">
                                    02:59 pm
                                   </span>
                                 </td>
                                 <th className="flex gap-3">
                                   <button className=" "><FaEdit className="text-lg text-green-600 hover:scale-125"/></button>
                                   <button className=" "><MdDeleteForever className="text-lg text-red-600 hover:scale-125"/>
                   </button>
                                 </th>
                                 </tr>
                                   {/* Row 2 */}
                               <tr>
                                 <th>01</th>
                                 <td>
                                   <div className="flex items-center gap-3">
                                     <div>
                                       <div className="font-bold">Hart Hagerty</div>
                                       <div className="text-sm opacity-50">United States</div>
                                     </div>
                                   </div>
                                 </td>
                                 <td>
                                   Zemlak, Daniel and Leannon
                                   <br />
                                   <span className="badge badge-ghost badge-sm">
                                     Desktop Support Technician
                                   </span>
                                 </td>
                                 <td>
                                   30/09/2025
                                   <br />
                                   <span className="badge badge-ghost badge-sm">
                                    02:59 pm
                                   </span>
                                 </td>
                                 <th className="flex gap-3">
                                   <button className=" "><FaEdit className="text-lg text-green-600 hover:scale-125"/></button>
                                   <button className=" "><MdDeleteForever className="text-lg text-red-600 hover:scale-125"/>
                   </button>
                                 </th>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                        </div>
               </div>
    );
};

export default MonthlyExpense;