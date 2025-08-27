import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet-async";
import { NavLink } from 'react-router-dom';

const UnpaidIncome = () => {
  const axiosPublic = useAxiosPublic();

  // Form states
  const [paidTk, setPaidTk] = useState("");
  const [categories, setCategories] = useState([]); // [{name, price}]
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salesmanName, setSalesmanName] = useState("");
  const [unPaid, setUnPaid] = useState(0);

  // সময় ও তারিখ
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
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

  // Add category
  const handleAddCategory = () => {
    if (!selectedCategory) {
      toast.error("প্রথমে ক্যাটাগরি নির্বাচন করুন");
      return;
    }
    if (!currentPrice) {
      toast.error("প্রথমে প্রাইস লিখুন");
      return;
    }

    const newCat = { name: selectedCategory, price: Number(currentPrice) };
    setCategories([...categories, newCat]);
    setUnPaid(prev => prev + Number(currentPrice));

    // Reset category input
    setSelectedCategory("");
    setCurrentPrice("");
  };

  // Remove category
  const removeCategory = (index) => {
    const removed = categories[index];
    setCategories(categories.filter((_, i) => i !== index));
    setUnPaid(prev => prev - removed.price);
  };



  const totalUnpaid = unPaid - paidTk


  // Submit form
  const handleAddUnpaidIncome = async (e) => {
    e.preventDefault();

    if (!paidTk || categories.length === 0 || !customerName || !phoneNumber || !salesmanName) {
      toast.error("সব ফিল্ড পূরণ করুন এবং কমপক্ষে একটি ক্যাটাগরি যোগ করুন");
      return;
    }

    const unpaidIncomeData = {
      paidTk,
      categories,
      totalUnpaid,
      customerName,
      phoneNumber,
      salesmanName,
      time,
      date: dateBD,
    
    };

  




    try {
      const res = await axiosPublic.post("/unPaidIncome", unpaidIncomeData);

      if (res.data.insertedId) {
         const catData = { categories, date, time, catId: res.data.insertedId }
        await axiosPublic.post("/categories", catData);
      
        // Reset form
        setPaidTk("");
        setCategories([]);
        setSelectedCategory("");
        setCurrentPrice("");
        setCustomerName("");
        setPhoneNumber("");
        setSalesmanName("");
        setUnPaid(0);

        toast.success("আপনার বকেয়া হিসাবটি সঠিকভাবে এন্ট্রি হয়েছে ✅");
      }
    } catch (error) {
      console.error("Error adding unpaid income:", error);
      toast.error("কিছু ভুল হয়েছে, আবার চেষ্টা করুন");
    }
  };

  return (
    <div className='pb-5'>
      <Helmet>
        <title>স্টাইলম্যান | বকেয়া হিসাব</title>
      </Helmet>

      <div className="bg-black text-white p-4 my-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">বকেয়া হিসাব</h2>
        <NavLink to={'/all-unpaid-income'}>
          <button className='text-sm md:text-lg lg:text-lg text-red-600 underline hover:scale-110'>
            বকেয়া হিসাবগুলো দেখুন
          </button>
        </NavLink>
      </div>

      <div className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto p-6 bg-white rounded-md shadow-md">
        <h4 className='text-white bg-red-600 p-2 text-sm mb-2 rounded-lg'>
          <span className='font-semibold'>আজকের তারিখ:</span> ‍{dateBD}
        </h4>

        <form className="space-y-4" onSubmit={handleAddUnpaidIncome}>
        

          {/* Add categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ক্যাটাগরি ও বকেয়া টাকা (একাধিক যোগ করতে পারবেন) <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">-- ক্যাটাগরি নির্বাচন করুন --</option>
                <option value="শার্ট">শার্ট</option>
                <option value="টি-শার্ট">টি-শার্ট</option>
                <option value="প্যান্ট">প্যান্ট</option>
                <option value="পাঞ্জাবী">পাঞ্জাবী</option>
                <option value="শীতবস্ত্র">শীতবস্ত্র</option>
                <option value="অন্যান্য">অন্যান্য</option>
              </select>

              <input
                type="number"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(e.target.value)}
                placeholder="৳"
                className="px-3 py-2 border border-gray-300 rounded-md w-28"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-green-500 text-white px-3 rounded-md text-sm"
              >
                যোগ করুন
              </button>
            </div>

            {/* Selected categories */}
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((cat, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                  {cat.name}: {cat.price.toLocaleString("bn-BD")} ৳
                  <button type="button" onClick={() => removeCategory(idx)} className="text-red-500 font-bold">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Customer & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ক্রেতার নাম <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="ক্রেতার নাম"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ফোন নাম্বার <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="+৮৮ ০১২ ৩৪৫৬ ৭৮৯০"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Salesman */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              হিসাবকারীর নাম <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={salesmanName}
              onChange={(e) => setSalesmanName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="হিসাবকারীর নাম"
              required
            />
          </div>
  {/* paidTk */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
               নগদ (৳)
            </label>
            <input
              type="number"
              value={paidTk}
              onChange={(e) => setPaidTk(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="পণ্যের বা সেবার নাম"
              required
            />
          </div>
         </div>
          <div className="text-right font-semibold">
            মোট বকেয়া: {totalUnpaid.toLocaleString("bn-BD")} ৳
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-1"
          >
            <FaPlus className='text-sm' /> বকেয়া যোগ করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default UnpaidIncome;
