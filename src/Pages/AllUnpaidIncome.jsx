import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const AllUnpaidIncome = () => {

  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

    const { data: unpaidIncomes = [],refetch } = useQuery({
        queryKey: ['all-unpaid-incomes'],
        queryFn: async () => {
            const res = await axiosPublic.get('/unPaidIncome')
            return res.data
        }
})

    
  const handleUpdate = (id) => {
    navigate(`/unPaid-Update/${id}`)
  }

  // const handleDelete = async (id) => {
  //   const res = await axiosPublic.delete(`/unpaid-income/${id}`)
  //   if (res.data.deletedCount === 1) {
  //     toast.success('delete done')
  //     refetch()
  //   } else {
  //     alert('error')
  //   }
  // }

const handleDelete = async (id, data) => {
  Swal.fire({
    title: 'আপনি কি বকেয়ার সম্পূর্ণ টাকা পেয়েছেন?',
    text: 'প্রাপ্ত টাকার পরিমাণ লিখুন',
    input: 'number', // custom input
    inputPlaceholder: 'টাকার পরিমাণ লিখুন',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'হ্যাঁ, নিশ্চিত',
    cancelButtonText: 'বাতিল',
    inputValidator: (value) => {
      if (!value) {
        return 'অনুগ্রহ করে একটি পরিমাণ লিখুন';
      }
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const enteredAmount = Number(result.value);
toast(`delete amount: ${enteredAmount}`)
      //   // dailyIncome এ পাঠানোর ডাটা
      //   const dailyIncomeData = {
      //     title: data.title,
      //     price: enteredAmount, 
      //     category: data.category,
      //     customerName: data.customerName,
      //     phoneNumber: data.phoneNumber,
      //     salesmanName: data.salesmanName,
      //     time: data.time,
      //     date: data.date,
      //   };

      //   // প্রথমে dailyIncome DB তে সেভ
      //   await axiosPublic.post("/dailyIncome", dailyIncomeData);

      // const categoryData = { categoryName: data.category, price: enteredAmount, categoryId: data.time,
      // date: data.date }
      
      // await axiosPublic.post('/category',categoryData)
        // এরপর unpaid থেকে ডিলিট
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


  
    return (
        <div>
            <Helmet>
                                <title>স্টাইলম্যান | বকেয়া লেনদেনগুলো</title>
                            </Helmet>
                  <div className="bg-red-600 text-white p-4 my-5 text-center ">
                          <h2 className=" font-semibold"> বকেয়া লেনদেনগুলো</h2>
                          
                  </div>
            <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th>নং</th>
        <th>হিসাবকারীর নাম</th>
        <th>কাস্টমারের নাম</th>
        <th>শিরোনাম</th>
        <th>টাকার পরিমাণ (৳)</th>
    
        <th>তারিখ</th>
        <th>ফোন নাম্বার</th>
        <th>অ্যাকশন </th>
      </tr>
                    </thead>
                    
    <tbody className='divide-y'>
                        {
                            unpaidIncomes?.map((data,idx)=><tr key={data._id}>
                                <th>{ idx + 1}</th>
                                <th>{ data.salesmanName}</th>
                                <td>{ data.customerName}</td>
                                <td>{ data.title}</td>
                                <td className='font-medium'>নগদ: <span className='text-green-600'>{data.paidTk}</span> , বকেয়া: <span className='text-red-600'>{ data.totalUnpaid}</span></td>
                                <td>{ data.date}</td>
                                <td>{ data.phoneNumber}</td>
       <th className="flex gap-3">
                           <button onClick={()=> handleUpdate(data._id)}><FaEdit className="text-lg text-green-600 hover:scale-125" /></button>
                           <button onClick={() => handleDelete(data._id,data)}>
                             <MdDeleteForever className="text-lg text-red-600 hover:scale-125" />
                           </button>
                         </th>
      </tr>)
      }
      
      
    </tbody>
  
  </table>
</div>
        </div>
    );
};

export default AllUnpaidIncome;