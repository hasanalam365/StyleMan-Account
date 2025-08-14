import React, { useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { FaEdit } from 'react-icons/fa';
import { IoIosTrendingDown } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { ScaleLoader } from 'react-spinners';

const MonthlyExpense = () => {
  const axiosPublic = useAxiosPublic();

  // বাংলা মাসের নাম (১ থেকে ১২)
  const banglaMonthNames = [
    "জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল",
    "মে", "জুন", "জুলাই", "আগস্ট",
    "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentYear = now.getFullYear();

  // Filter state
  const [filterBy, setFilterBy] = useState('');
  const [filterMonth, setFilterMonth] = useState(currentMonth);
  const [filterYear, setFilterYear] = useState(currentYear);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // বছর অপশন (২০২৪ থেকে বর্তমান বছর পর্যন্ত)
  const yearOptions = [];
  for (let y = 2024; y <= currentYear; y++) {
    yearOptions.push(y);
  }

  // API Call with filters in query params
  const { data: dailyExpenses=[], isLoading, isError, refetch } = useQuery({
    queryKey: ['monthlyExpense', filterBy, filterMonth, filterYear],
    queryFn: async () => {
      let url = '/dailyExpense'; // আপনার ব্যাকএন্ড API এন্ডপয়েন্ট এখানে দিন

      if (filterBy === 'month') {
        url += `?filterBy=month&month=${filterMonth}&year=${filterYear}`;
      } else if (filterBy === 'year') {
        url += `?filterBy=year&year=${filterYear}`;
      } else if (filterBy === 'today') {
        url += `?filterBy=today`;
      }

      const res = await axiosPublic.get(url);
      return res.data;
    },
    keepPreviousData: true,
  });

  // Calculate total monthly expense safely
  const monthlyExpense = (dailyExpenses || []).reduce((total, expense) => {
    const amount =   Number(expense.price)
    return total + amount;
  }, 0);



  const monthlyExpenseBN = monthlyExpense.toLocaleString("bn-BD");

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (dailyExpenses || []).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((dailyExpenses?.length || 0) / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const val = e.target.value;
    setFilterBy(val);
    setCurrentPage(1);

    if (val === 'month') {
      setFilterMonth(currentMonth);
      setFilterYear(currentYear);
    } else if (val === 'year') {
      setFilterMonth('');
      setFilterYear(currentYear);
    } else {
      setFilterMonth('');
      setFilterYear('');
    }
  };

  // Delete handler with SweetAlert2 confirmation
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'আপনি কি সত্যিই লেনদেনটি মুছে ফেলতে চান?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'হ্যাঁ, মুছে ফেলুন!',
      cancelButtonText: 'বাতিল',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/dailyExpense/${id}`);

          if (res.data.deletedCount === 1) {
            toast.error('লেনদেনটি মুছে ফেলা হয়েছে');
            refetch();
          } else {
            toast.error('কোনো লেনদেন পাওয়া যায়নি');
          }
        } catch (error) {
          toast.error('ডিলিট করতে সমস্যা হয়েছে');
        }
      }
    });
  };

 if (isLoading) return <p className="flex justify-center items-center h-screen">  <ScaleLoader color="#36d7b7" /></p>;
  
  return (
    <div>
      <div className="bg-black text-white p-4 my-5">
        <h2 className="text-lg font-semibold">মাসিক খরচ</h2>
      </div>

      <div className="w-[95%] mx-auto md:mx-6 lg:mx-[30px] p-6 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between">
          <h4>মাসিক খরচের হিসাব</h4>
          <div>
            <p className="text-sm">মোট খরচ</p>
            <p className="text-red-600 font-semibold"> ৳{monthlyExpenseBN} </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <CiFilter className="text-lg" />
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filterBy}
            onChange={handleFilterChange}
          >
            <option value="">ফিল্টার করুন</option>
            <option value="today">আজকের লেনদেন</option>
            <option value="month">মাস নির্বাচন করুন</option>
            <option value="year">বছর নির্বাচন করুন</option>
          </select>

          {/* মাস ফিল্টার হলে মাস ও বছর সিলেক্ট দেখাও */}
          {filterBy === 'month' && (
            <>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={filterMonth}
                onChange={(e) => setFilterMonth(Number(e.target.value))}
              >
                {banglaMonthNames.map((monthName, idx) => (
                  <option key={idx + 1} value={idx + 1}>{monthName}</option>
                ))}
              </select>

              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={filterYear}
                onChange={(e) => setFilterYear(Number(e.target.value))}
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </>
          )}

          {/* বছর ফিল্টার হলে শুধু বছর সিলেক্ট দেখাও */}
          {filterBy === 'year' && (
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={filterYear}
              onChange={(e) => setFilterYear(Number(e.target.value))}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="mt-5 w-[95%] mx-auto md:mx-6 lg:mx-[30px] shadow-sm rounded-lg bg-white p-6">
        <h3 className="font-semibold mb-2">মাসভিত্তিক সারসংক্ষেপ</h3>
        <div className="stat shadow-sm rounded-lg bg-red-100 md:w-1/2 lg:w-1/2">
          <div className="stat-figure text-red-600">
            <IoIosTrendingDown className="text-4xl" />
          </div>
          <div className="stat-title">
            {filterBy === 'month'
              ? `${banglaMonthNames[filterMonth - 1]} ${filterYear}`
              : filterBy === 'year'
                ? `${filterYear}`
                : new Date().toLocaleDateString("bn-BD", { month: "long", year: "numeric" })
            }
          </div>
          <div className="stat-value">
            <span className="text-sm">৳</span> {monthlyExpenseBN}
          </div>
          <div className="stat-desc">{(dailyExpenses?.length || 0).toLocaleString("bn-BD")} টি লেনদেন</div>
        </div>
      </div>

      <div className="mt-5 w-[95%] mx-auto md:mx-6 lg:mx-[30px]">
        <div className="bg-white">
          <h2 className="text-lg font-bold p-3">সকল খরচের তালিকা</h2>
          <div className="divider mt-0 pt-0 mb-0"></div>
        </div>

        <div className="overflow-x-auto bg-white">
          <table className="table w-full">
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
              {isLoading && (
                <tr>
                  <td colSpan="5" className="text-center py-4">লোড হচ্ছে...</td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-red-600">ডাটা আনতে সমস্যা হয়েছে!</td>
                </tr>
              )}
              {!isLoading && !isError && currentItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">কোনো লেনদেন পাওয়া যায়নি।</td>
                </tr>
              )}

              {!isLoading && !isError && currentItems.map(expense => (
                <tr key={expense._id}>
                  <th>{expense.salesmanName}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{expense.title}</div>
                       
                      </div>
                    </div>
                  </td>
                  <td className="text-red-600 font-medium">৳
                    { Number(expense.price).toLocaleString("bn-BD")
                    }
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">{expense.time}</span>
                    <br />
                    {new Date(expense.date).toLocaleDateString("bn-BD", {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>

                  <th className="flex gap-3">
                    <button><FaEdit className="text-lg text-green-600 hover:scale-125" /></button>
                    <button onClick={() => handleDelete(expense._id)}>
                      <MdDeleteForever className="text-lg text-red-600 hover:scale-125" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination buttons */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 gap-2 mb-4">
              {[...Array(totalPages).keys()].map(number => (
                <button
                  key={number + 1}
                  onClick={() => handlePageChange(number + 1)}
                  className={`px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-[#FF8040] text-white' : 'bg-gray-200'}`}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyExpense;
