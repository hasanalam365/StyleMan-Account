import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { IoIosTrendingDown } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const RecentExpenseData = () => {

    const axiosPublic=useAxiosPublic()

     const { data: recentExpenseData=[],isError,isLoading } = useQuery({
    queryKey: ['recent-Expense-Data'],
    queryFn: async () => {
      const res = await axiosPublic.get('/recentExpenseData')
      return res.data
    }
  })
  const currentExpenseItems = recentExpenseData?.length;

    return (
        <div className=" p-4">
        <div className="bg-white ">
          <h2 className="text-lg text-red-600 font-bold p-3 flex items-center gap-2"> সাম্প্রতিক খরচের লেনদেন  <IoIosTrendingDown className="text-2xl text-red-600" /></h2>
           <div className="divider mt-0 pt-0 mb-0"></div>
        </div>
       
      {/* Recent Expense Transactions */}
<div className="overflow-x-auto bg-white">
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
      {/* Loading State */}
      {isLoading && (
        <tr>
          <td colSpan="5" className="text-center py-4">লোড হচ্ছে...</td>
        </tr>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <tr>
          <td colSpan="5" className="text-center py-4 text-red-600">
            ডাটা আনতে সমস্যা হয়েছে!
          </td>
        </tr>
      )}

      {/* No Data State */}
      {!isLoading && !isError && currentExpenseItems === 0 && (
        <tr>
          <td colSpan="5" className="text-center py-4">কোনো লেনদেন পাওয়া যায়নি।</td>
        </tr>
      )}

      {/* Data Rows */}
      {!isLoading && !isError && recentExpenseData.map((data) => (
        <tr key={data?._id}>
          <th className="font-normal">{data?.salesmanName || "—"}</th>
          <td>
            <div className="flex items-center gap-3">
              <div>
                <div>{data?.title || "—"}</div>
                {data?.customerName && (
                  <div className="text-sm opacity-50">
                    কাস্টমারের নাম: {data?.customerName}
                  </div>
                )}
              </div>
            </div>
          </td>
          <td className={data?.phoneNumber ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            ৳
            {data?.offerPrice
              ? Number(data?.offerPrice).toLocaleString("bn-BD")
              : Number(data?.price || 0).toLocaleString("bn-BD")}
          </td>
          <td>
            {data?.date
              ? new Date(data.date).toLocaleDateString("bn-BD", {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : "—"}
            <br />
            <span className="badge badge-ghost badge-sm">
              {data?.time || "—"}
            </span>
          </td>
          <th className="flex gap-3">
            <button><FaEdit className="text-lg text-green-600 hover:scale-125" /></button>
            <button><MdDeleteForever className="text-lg text-red-600 hover:scale-125" /></button>
          </th>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    );
};

export default RecentExpenseData;