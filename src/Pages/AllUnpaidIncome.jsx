import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';

const AllUnpaidIncome = () => {

  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

    const { data: unpaidIncomes = [],refetch,isLoading } = useQuery({
        queryKey: ['all-unpaid-incomes'],
        queryFn: async () => {
            const res = await axiosPublic.get('/unPaidIncome')
            return res.data
        }
})

    
  
const totalUnpaid = unpaidIncomes.reduce((sum, item) => sum + item.totalUnpaid, 0);


  
  const handleUpdate = (id) => {
    navigate(`/unPaid-Update/${id}`)
  }



const handleDelete = async (id) => {
  Swal.fire({
    title: 'আপনি কি বকেয়ার সম্পূর্ণ টাকা পেয়েছেন?',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'হ্যাঁ, নিশ্চিত',
    cancelButtonText: 'বাতিল',
   
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {

        const res = await axiosPublic.delete(`/unpaid-income/${id}`);

        if (res.data.deletedCount === 1) {
          toast.success('লেনদেনটি সফলভাবে ট্রান্সফার ও ডিলিট হয়েছে');
          refetch();
        } else {
          toast.error('কোনো লেনদেন পাওয়া যায়নি');
        }
      } catch (error) {
        toast.error('প্রক্রিয়ায় সমস্যা হয়েছে');
      }
    }
  });
};

 if (isLoading) {
    return (
      <p className="flex justify-center items-center h-screen">
        <ScaleLoader color="#36d7b7" />
      </p>
    );
  }
  
    return (
        <div>
            <Helmet>
                                <title>স্টাইলম্যান | বকেয়া লেনদেনগুলো</title>
                            </Helmet>
                  <div className="bg-red-600 text-white p-4 my-5  flex items-center justify-between">
                          <h2 className=" font-semibold"> বকেয়া লেনদেনগুলো</h2>
          <h2 className=" "> মোট বকেয়া: ৳ { totalUnpaid.toLocaleString("bn-BD")} </h2>
                          
                  </div>
           <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th>নং</th>
        <th>হিসাবকারীর নাম</th>
        <th>কাস্টমারের নাম</th>
        <th>ক্যাটাগরি</th>
        <th>টাকার পরিমাণ (৳)</th>
        <th>তারিখ</th>
        <th>ফোন নাম্বার</th>
        <th>অ্যাকশন</th>
      </tr>
    </thead>

    <tbody className="divide-y">
      {unpaidIncomes?.map((data, idx) => (
        <tr key={data._id}>
          <th>{idx + 1}</th>
          <td>{data.salesmanName}</td>
          <td>{data.customerName}</td>

          {/* ✅ Category গুলোকে join করে দেখানো */}
          <td>
            {data.categories?.map((category, i) => (
              <span key={i} className="px-1">
                {category.name}
                {i < data.categories.length - 1 && ","}
              </span>
            ))}
          </td>

          <td className="font-medium">
            নগদ: <span className="text-green-600"> {Number(data.paidTk).toLocaleString("bn-BD")}</span> , বকেয়া:{" "}
            <span className="text-red-600">{data.totalUnpaid.toLocaleString("bn-BD")}</span>
          </td>

          <td>{data.date}</td>
          <td>{data.phoneNumber}</td>

          <td className="flex gap-3">
            <button onClick={() => handleUpdate(data._id)}>
              <FaEdit className="text-lg text-green-600 hover:scale-125" />
            </button>
            <button onClick={() => handleDelete(data._id)}>
              <MdDeleteForever className="text-lg text-red-600 hover:scale-125" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
    );
};

export default AllUnpaidIncome;