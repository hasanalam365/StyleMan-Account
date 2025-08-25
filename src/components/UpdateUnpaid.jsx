import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";

const UpdateUnpaid = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // states
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [paidTk, setPaidTk] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salesmanName, setSalesmanName] = useState("");
  const [unPaid, setUnPaid] = useState(0);

  // fetch unpaid data
  const { data: unpaidData, isLoading } = useQuery({
    queryKey: ["unpaid-income-get", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/unpaid-Income-Paid/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // set fetched data into form
  useEffect(() => {
    if (unpaidData) {
      setCategories(unpaidData.categories || []);
      setPaidTk(unpaidData.paidTk || "");
      setCustomerName(unpaidData.customerName || "");
      setPhoneNumber(unpaidData.phoneNumber || "");
      setSalesmanName(unpaidData.salesmanName || "");

      // total price of all categories
      const totalCat = (unpaidData.categories || []).reduce(
        (sum, c) => sum + Number(c.price || 0),
        0
      );
      setUnPaid(totalCat);
    }
  }, [unpaidData]);

  // calculate total unpaid
  const totalUnpaid = unPaid - Number(paidTk || 0);

  // add category
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
    setUnPaid((prev) => prev + Number(currentPrice));

    setSelectedCategory("");
    setCurrentPrice("");
  };

  // remove category
  const removeCategory = (index) => {
    const removed = categories[index];
    setCategories(categories.filter((_, i) => i !== index));
    setUnPaid((prev) => prev - removed.price);
  };

  // update handler
  const handleUpdateUnpaidIncome = async (e) => {
    e.preventDefault();

    const updatedData = {
      paidTk,
      categories,
      totalUnpaid,
      customerName,
      phoneNumber,
      salesmanName,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    try {
      const res = await axiosPublic.put(
        `/unpaid-Income-Paid/${id}`,
        updatedData
      );
      if (res.data.modifiedCount > 0) {
        toast.success("বকেয়া হিসাব সফলভাবে আপডেট হয়েছে 🎉");
        navigate("/all-unpaid-income");
      } else {
        toast.info("কোনো পরিবর্তন হয়নি");
      }
    } catch (error) {
      console.error("Error updating income:", error);
      toast.error("কিছু ভুল হয়েছে, আবার চেষ্টা করুন!");
    }
  };

  if (isLoading) {
    return (
      <p className="flex justify-center items-center h-screen">
        <ScaleLoader color="#36d7b7" />
      </p>
    );
  }

  return (
    <div className="pb-5">
      <Helmet>
        <title>স্টাইলম্যান | আপডেট বকেয়া হিসাব</title>
      </Helmet>
      <div className="bg-black text-white p-4 my-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">বকেয়া হিসাব আপডেট</h2>
        <NavLink to={"/all-unpaid-income"}>
          <button className="text-sm md:text-lg lg:text-lg text-red-600 underline hover:scale-110">
            বকেয়া হিসাবগুলো দেখুন
          </button>
        </NavLink>
      </div>

      <div className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto p-6 bg-white rounded-md shadow-md">
        <form className="space-y-4" onSubmit={handleUpdateUnpaidIncome}>
          {/* categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ক্যাটাগরি ও টাকা (একাধিক যোগ করতে পারবেন)
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

            {/* selected categories */}
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1"
                >
                  {cat.name}: {cat.price.toLocaleString("bn-BD")} ৳
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

          {/* customer info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ক্রেতার নাম
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ফোন নাম্বার
              </label>
              <input
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* salesman & paidTk */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                হিসাবকারীর নাম
              </label>
              <input
                type="text"
                value={salesmanName}
                onChange={(e) => setSalesmanName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                নগদ (৳)
              </label>
              <input
                type="number"
                value={paidTk}
                onChange={(e) => setPaidTk(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* total unpaid */}
          <div className="text-right font-semibold">
            মোট বকেয়া: {totalUnpaid.toLocaleString("bn-BD")} ৳
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-1"
          >
            <FaPlus className="text-sm" /> আপডেট করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUnpaid;
