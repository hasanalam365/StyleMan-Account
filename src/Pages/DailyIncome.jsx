import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import useAxiosPublic from '../hooks/useAxiosPublic';
import {  toast } from 'react-toastify';

const DailyIncome = () => {

  const axiosPublic=useAxiosPublic()
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salesmanName, setSalesmanName] = useState("");
   // সময় ও তারিখ (বাংলায়)
    const now = new Date();
    const time = now.toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" });
const date = now.toLocaleDateString("en-US", {
  weekday: "long",   // শনিবার
  day: "numeric",    // ৯
  month: "long",     // আগস্ট
  year: "numeric"    // ২০২৫
});
const dateBD = now.toLocaleDateString("bn-BD", {
  weekday: "long",   // শনিবার
  day: "numeric",    // ৯
  month: "long",     // আগস্ট
  year: "numeric"    // ২০২৫
});




  const handleAddIncome = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const price = e.target.price.value;
    const offerPrice = e.target.offerPrice.value;
    const customerName = e.target.customerName.value;
    const phoneNumber = e.target.phoneNumber.value;
    const salesmanName = e.target.salesmanName.value;

   
    const dailyIncomeData = {
      title,
      price,
      offerPrice,
      customerName,
      phoneNumber,
      salesmanName,
      time,
      date,
    };

    
    try {
      const res = await axiosPublic.post("/dailyIncome", dailyIncomeData);
     if (res.data.insertedId) {
  setTitle("");
  setPrice("");
  setOfferPrice("");
  setCustomerName("");
  setPhoneNumber("");
  setSalesmanName("");
  toast("আপনার হিসাবটি সঠিক ভাবে এন্ট্রি হয়েছে");
}
      
     
    } catch (error) {
      console.error("Error adding income:", error);
      alert("কিছু ভুল হয়েছে, আবার চেষ্টা করুন");
    }
  };



  return (
    <div className='pb-5'>
      <div className="bg-black text-white p-4 my-5">
        <h2 className="text-lg font-semibold">দৈনিক আয় এন্ট্রি</h2>
      </div>

      <div className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto p-6 bg-white rounded-md shadow-md">
        <h4 className='text-white bg-blue-600 p-2 text-sm mb-2 rounded-lg'>
          <span className='font-semibold'>আজকের তারিখ:</span> ‍{dateBD}
        </h4>

        <form className="space-y-4" onSubmit={handleAddIncome}>
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              শিরোনাম <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="পণ্যের বা সেবার নাম"
           required />
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
              required/>
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

          {/* Customer Name & Phone Number */}
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
              required/>
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
              required/>
            </div>
          </div>

          {/* Salesman Name */}
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
            required/>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-1"
          >
            <FaPlus className='text-sm' /> আয় যোগ করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default DailyIncome;
