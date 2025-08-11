import React, { useState } from 'react';
import { CiFilter } from "react-icons/ci";
import { FaEdit } from 'react-icons/fa';
import { IoIosTrendingUp } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import useAxiosPublic from '../hooks/useAxiosPublic';
import {
  useQuery,
} from '@tanstack/react-query'

const MonthlyIncome = () => {
  const axiosPublic = useAxiosPublic()
  const now = new Date();
  const date = now.toLocaleDateString("bn-BD", {
    month: "long",
    year: "numeric"
  });

  const { data: dailyIncomes } = useQuery({
    queryKey: ['monthlyIncome'],
    queryFn: async () => {
      const res = await axiosPublic.get('/dailyIncome')
      return (res.data)
    }
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate monthly income safely
  const monthlyIncome = (dailyIncomes || []).reduce((total, dailyIncome) => {
    const amount = Number(
      Number(dailyIncome.offerPrice) === 0
        ? dailyIncome.price
        : dailyIncome.offerPrice
    );
    return total + amount;
  }, 0);
  const monthlyIncomeBN = monthlyIncome.toLocaleString("bn-BD");

  // Pagination logic - slice the dailyIncomes array according to page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (dailyIncomes || []).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((dailyIncomes?.length || 0) / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="bg-black text-white p-4 my-5">
        <h2 className="text-lg font-semibold">মাসিক আয় </h2>
      </div>

      <div className=' w-[95%] mx-auto md:mx-6 lg:mx-[30px] p-6 bg-white rounded-md shadow-md'>
        <div className='flex items-center justify-between'>
          <h4>মাসিক আয়ের হিসাব</h4>
          <div>
            <p className='text-sm'>মোট আয়</p>
            <p className='text-green-600 font-semibold'> ৳{monthlyIncomeBN} </p>
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
      <div className='mt-5 w-[95%] mx-auto md:mx-6 lg:mx-[30px] shadow-sm rounded-lg bg-white p-6'>
        <h3 className='font-semibold mb-2'>মাসভিত্তিক সারসংক্ষেপ</h3>
        <div className="stat shadow-sm rounded-lg bg-gray-100 md:w-1/2 lg:w-1/2">
          <div className="stat-figure text-green-600">
            <IoIosTrendingUp className="text-4xl" />
          </div>
          <div className="stat-title">{date}</div>
          <div className="stat-value">
            <span className="text-sm">৳</span> {monthlyIncomeBN}
          </div>
          <div className="stat-desc">{dailyIncomes?.length.toLocaleString("bn-BD")} টি লেনদেন</div>
        </div>
      </div>

      <div className="mt-5 w-[95%] mx-auto md:mx-6 lg:mx-[30px]">
        <div className="bg-white ">
          <h2 className="text-lg font-bold p-3"> সকল আয়ের তালিকা </h2>
          <div className="divider mt-0 pt-0 mb-0"></div>
        </div>

        {/* Recent Transactions */}
        <div className="overflow-x-auto  bg-white">

          <table className="table">
            {/* Head */}
            <thead>
              <tr>
                <th>হিসাবকারীর নাম</th>
                <th>শিরোনাম</th>
                <th>টাকার পরিমাণ</th>
                <th>সময়/তারিখ</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {/* Show only current page items */}
              {
                currentItems.map(dailyIncome => <tr key={dailyIncome._id}>
                  <th>{dailyIncome.salesmanName}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{dailyIncome.title}</div>
                        <div className="text-sm opacity-50">কাস্টমারের নাম: {dailyIncome.customerName}</div>
                      </div>
                    </div>
                  </td>
                  <td className='text-green-600 font-medium'>৳
                    {Number(dailyIncome.offerPrice) === 0
                      ? Number(dailyIncome.price).toLocaleString("bn-BD")
                      : Number(dailyIncome.offerPrice).toLocaleString("bn-BD")
                    }
                  </td>

                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {dailyIncome.time}
                    </span>
                    <br />
                    {dailyIncome.date}
                  </td>
                  <th className="flex gap-3">
                    <button className=" "><FaEdit className="text-lg text-green-600 hover:scale-125" /></button>
                    <button className=" "><MdDeleteForever className="text-lg text-red-600 hover:scale-125" />
                    </button>
                  </th>
                </tr>)
              }

            </tbody>
          </table>

          {/* Pagination buttons */}
          <div className="flex justify-center mt-4 gap-2">
            {[...Array(totalPages).keys()].map(number => (
              <button
                key={number + 1}
                onClick={() => handlePageChange(number + 1)}
                className={`px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {number + 1}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MonthlyIncome;
