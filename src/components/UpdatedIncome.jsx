import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet-async";
import { useQuery } from '@tanstack/react-query';

const UpdatedIncome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // form states
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]); // {name, price}
  const [currentPrice, setCurrentPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salesmanName, setSalesmanName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const now = new Date();
  const dateBD = now.toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const date = now.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  // fetch existing income
  const { data: incomeData = {} } = useQuery({
    queryKey: ['updated-income', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/income-data/${id}`);
      return res.data;
    },
  });

  // pre-fill form when data loaded
  useEffect(() => {
    if (incomeData && Object.keys(incomeData).length > 0) {
      setTitle(incomeData.title || "");
      setCategories(incomeData.categories || []);
      setTotalPrice(incomeData.totalPrice || 0);
      setCustomerName(incomeData.customerName || "");
      setPhoneNumber(incomeData.phoneNumber || "");
      setSalesmanName(incomeData.salesmanName || "");
    }
  }, [incomeData]);

  // Add category with price
  const handleAddCategory = () => {
    if (!selectedCategory) return;
    if (!currentPrice) {
      toast.error("প্রথমে প্রাইস লিখুন");
      return;
    }

    const newCategory = { name: selectedCategory, price: Number(currentPrice) };
    setCategories([...categories, newCategory]);
    setTotalPrice(prev => prev + Number(currentPrice));

    setSelectedCategory("");
    setCurrentPrice("");
  };

  // remove category
  const removeCategory = (index) => {
    const removed = categories[index];
    setTotalPrice(prev => prev - removed.price);
    setCategories(categories.filter((_, i) => i !== index));
  };

  // Update income
  const handleUpdateIncome = async (e) => {
    e.preventDefault();
    if (categories.length === 0) {
      toast.error("কমপক্ষে একটি category যোগ করুন");
      return;
    }

    const updatedData = {
      title,
      categories,
      totalPrice,
      customerName,
      phoneNumber,
      salesmanName,
      date,
      time,
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
    <div className="pb-5">
      <Helmet>
        <title>স্টাইলম্যান | সংশোধন দৈনিক আয়</title>
      </Helmet>

      <div className="bg-black text-white p-4 my-5">
        <h2 className="text-lg font-semibold">দৈনিক আয় সংশোধন</h2>
      </div>

      <div className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto p-6 bg-white rounded-md shadow-md">
        <h4 className="text-white bg-blue-600 p-2 text-sm mb-2 rounded-lg">
          <span className="font-semibold">আজকের তারিখ:</span> ‍{dateBD}
        </h4>

        <form className="space-y-4" onSubmit={handleUpdateIncome}>
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
              required
            />
          </div>

          {/* Price input */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              দাম (৳) <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              id="price"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="প্রতিটি ক্যাটাগরি এর দাম"
            />
          </div>

          {/* Category select */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              ক্যাটাগরি (একাধিক যোগ করতে পারবেন) <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <select
                id="category"
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
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-green-500 text-white px-3 rounded-md text-sm"
              >
                যোগ করুন
              </button>
            </div>

            {/* Selected categories with price */}
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1"
                >
                  {cat.name}: {cat.price}
                  <button
                    type="button"
                    onClick={() => removeCategory(idx)}
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
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

          <div className="text-right font-semibold">মোট দাম: {totalPrice} ৳</div>

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
