import React, { useEffect, useState } from 'react';
import { FiMinus } from 'react-icons/fi';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from "react-helmet-async";

const DailyExpense = () => {
  const axiosPublic = useAxiosPublic();
const { id } = useParams();
  const navigate = useNavigate();
 const [title, setTitle] = useState(""); 
   const [price, setPrice] = useState("");
   const [salesmanName, setSalesmanName] = useState("");

 

     const now = new Date();

    const dateBD = now.toLocaleDateString("bn-BD", {
  weekday: "long", 
  day: "numeric",    
  month: "long",    
  year: "numeric"   
});

  // Fetch existing income data
  const { data: expenseData = [] } = useQuery({
    queryKey: ['updated-expense', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/expense-data/${id}`);
      return res.data;
    },
 
  });

   useEffect(() => {
  if (expenseData) {
    setTitle(expenseData.title || "");
    setPrice(expenseData.price || "");
    setSalesmanName(expenseData.salesmanName || "");
  }
}, [expenseData]);

    
    const handleUpdateExpense = async(e) => {
       e.preventDefault();
      
          const updatedData = {
            title,
            price,
            salesmanName,
             
          };
      
            
            
          try {
            const res = await axiosPublic.put(`/expense-data-update/${id}`, updatedData);
              if (res.data.modifiedCount > 0 || res.data.success) {
                
                
      
              toast.success("আয় তথ্য সফলভাবে সংশোধন হয়েছে");
              navigate("/monthlyExpense"); 
            } else {
              toast.warn("কোন পরিবর্তন পাওয়া যায়নি");
            }
          } catch (error) {
            console.error(error);
            toast.error("আপডেট করতে ব্যর্থ হয়েছে");
          }
    }

  return (
    <div className='pb-5'>
      <Helmet>
                    <title>স্টাইলম্যান | সংশোধন দৈনিক খরচ</title>
                </Helmet>
      <div className="bg-black text-white p-4 my-5">
        <h2 className="text-lg font-semibold">দৈনিক খরচ এন্ট্রি</h2>
      </div>

      <div className="w-[90%] md:w-1/2 lg:w-1/2 mx-auto p-6 bg-white rounded-md shadow-md">
         <h4 className='text-white bg-red-600 p-2 text-sm mb-2 rounded-lg'>
          <span className='font-semibold'>আজকের তারিখ:</span> ‍{dateBD}
        </h4>

        <form className="space-y-4" onSubmit={handleUpdateExpense}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              শিরোনাম <span className='text-red-600'>*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="পণ্যের বা সেবার নাম"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              দাম (৳) <span className='text-red-600'>*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="0.00 ৳"
              required
              step="0.01"
            />
          </div>

          <div>
            <label htmlFor="salesmanName" className="block text-sm font-medium text-gray-700 mb-1">
              হিসাবকারীর নাম <span className='text-red-600'>*</span>
            </label>
            <input
              type="text"
              id="salesmanName"
              name="salesmanName"
              value={salesmanName}
              onChange={e => setSalesmanName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="হিসাবকারীর নাম"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition flex items-center justify-center gap-1"
          >
            <FiMinus className='text-sm' /> খরচ সংশোধন করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default DailyExpense;
