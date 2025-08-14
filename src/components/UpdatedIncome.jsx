import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UpdatedIncome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // States for form inputs
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salesmanName, setSalesmanName] = useState("");

     const now = new Date();
    const time = now.toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" });
const date = now.toLocaleDateString("en-US", {
  weekday: "long",   
  day: "numeric",    
  month: "long",    
  year: "numeric"   
});
    const dateBD = now.toLocaleDateString("bn-BD", {
  weekday: "long", 
  day: "numeric",    
  month: "long",    
  year: "numeric"   
});

  // Fetch existing income data
  const { data: incomeData = [] } = useQuery({
    queryKey: ['updated-income', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/income-data/${id}`);
      return res.data;
    },
 
  });

 
    
  // Pre-fill form fields when data is loaded
  useEffect(() => {
    if (incomeData) {
      setTitle(incomeData.title || "");
      setCategory(incomeData.category || "");
      setPrice(incomeData.price || "");
      setOfferPrice(incomeData.offerPrice || "");
      setCustomerName(incomeData.customerName || "");
      setPhoneNumber(incomeData.phoneNumber || "");
      setSalesmanName(incomeData.salesmanName || "");
    }
  }, [incomeData]);


  // Update function
  const handleUpdateIncome = async (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      category,
      price,
      offerPrice,
      customerName,
      phoneNumber,
      salesmanName,
        date,
      time
    };

    try {
      const res = await axiosPublic.put(`/income-data-update/${id}`, updatedData);
      if (res.data.modifiedCount > 0 || res.data.success) {
        toast.success("আয় তথ্য সফলভাবে সংশোধন হয়েছে");
        navigate("/monthlyIncome"); 
      } else {
        toast.warn("কোন পরিবর্তন পাওয়া যায়নি");
      }
    } catch (error) {
      console.error(error);
      toast.error("আপডেট করতে ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className='pb-5'>
      <div className="bg-black text-white p-4 my-5">
        <h2 className="text-lg font-semibold">দৈনিক আয় সংশোধন</h2>
      </div>

      <div className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto p-6 bg-white rounded-md shadow-md">
        <h4 className='text-white bg-blue-600 p-2 text-sm mb-2 rounded-lg'>
          <span className='font-semibold'>আজকের তারিখ:</span> ‍{dateBD}
        </h4>

        <form className="space-y-4" onSubmit={handleUpdateIncome}>
          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                শিরোনাম <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                              id="title"
                            value={incomeData.title}
                
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="পণ্যের বা সেবার নাম"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                ক্যাটাগরি <span className="text-red-600">*</span>
              </label>
             <select
  id="category"
  value={category} 
  onChange={(e) => setCategory(e.target.value)}
  className="w-full px-3 py-2 border border-gray-300 rounded-md"
  required
>
  <option value="">-- ক্যাটাগরি নির্বাচন করুন --</option>
  <option value="শার্ট">শার্ট</option>
  <option value="টি-শার্ট">টি-শার্ট</option>
  <option value="প্যান্ট">প্যান্ট</option>
  <option value="পাঞ্জাবী">পাঞ্জাবী</option>
  <option value="শীতবস্ত্র">শীতবস্ত্র</option>
  <option value="অন্যান্য">অন্যান্য</option>
</select>

            </div>
          </div>

          {/* Price & Offer Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                দাম (৳) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="0.00 ৳"
                required
              />
            </div>
            <div>
              <label htmlFor="offerPrice" className="block text-sm font-medium text-gray-700 mb-1">
                ছাড়ের দাম (৳) [ঐচ্ছিক]
              </label>
              <input
                type="number"
                id="offerPrice"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="0.00 ৳"
              />
            </div>
          </div>

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                ক্রেতার নাম <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="ক্রেতার নাম"
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                ফোন নাম্বার <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="+৮৮ ০১২ ৩৪৫৬ ৭৮৯০"
                required
              />
            </div>
          </div>

          {/* Salesman */}
          <div>
            <label htmlFor="salesmanName" className="block text-sm font-medium text-gray-700 mb-1">
              হিসাবকারীর নাম <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="salesmanName"
              value={salesmanName}
              onChange={(e) => setSalesmanName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="হিসাবকারীর নাম"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-1"
          >
            <FaPlus className='text-sm' /> সংশোধন করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatedIncome;
