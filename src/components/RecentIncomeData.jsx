import React from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { IoIosTrendingUp } from 'react-icons/io';

const RecentIncomeData = () => {

    const axiosPublic=useAxiosPublic()

    const { data: recentIncomeData = [], isError,isLoading } = useQuery({
  queryKey: ['recent-Income-Data'],
  queryFn: async () => {
    const res = await axiosPublic.get('/recentIncomeData');
    return res.data;
  }
});

const currentIncomeItems = recentIncomeData?.length;

    return (
         <div className="mt-5 p-4">
                <div className="bg-white ">
                  <h2 className="text-lg text-green-600 font-bold p-3 flex items-center gap-2"> সাম্প্রতিক আয়ের লেনদেন  <IoIosTrendingUp className="text-2xl text-green-600" /></h2>
                   <div className="divider mt-0 pt-0 mb-0"></div>
                </div>
               
              {/* Recent Transactions */}
        <div className="overflow-x-auto bg-white">
          <table className="table">
            {/* Head */}
            <thead>
              <tr>
                <th>হিসাবকারীর নাম</th>
                <th>কাস্টমারের তথ্য</th>
                <th>শিরোনাম/টাকা</th>
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
              {!isLoading && !isError && currentIncomeItems === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">কোনো লেনদেন পাওয়া যায়নি।</td>
                </tr>
              )}
        
              {/* Data Rows */}
              {!isLoading && !isError && recentIncomeData.map((data) => (
                <tr key={data?._id}>
                  <th className="font-normal">{data?.salesmanName || "—"}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                       
                        {data?.customerName && (
                          <div className="text-sm ">
                             {data?.customerName}
                          </div>
                                  )}
                                   <div className='opacity-80'> {data?.phoneNumber || "—"}</div>
                      </div>
                    </div>
                  </td>
                 
                       <td className=' font-medium'>
                    
                    <div className="flex items-center gap-3">
                      <div>
                       
                        <div className=""> {data?.title}</div>
                        <div className='text-green-600'>
                           ৳  {Number(data.offerPrice) === 0
                      ? Number(data.price).toLocaleString("bn-BD")
                      : Number(data.offerPrice).toLocaleString("bn-BD")
                    }
                      </div>
                      </div>
                    </div>
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

export default RecentIncomeData;