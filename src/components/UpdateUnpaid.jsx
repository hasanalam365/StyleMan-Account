import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";

const UpdateUnpaid = () => {
  const { id } = useParams(); // এখানে শুধু string id আসবে
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [paidTK, setPaidTK] = useState("");
  const [unPaidTK, setUnpaidTK] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salesmanName, setSalesmanName] = useState("");

  // ডেটা ফেচ করা হচ্ছে
  const { data: unpaidData, isLoading } = useQuery({
    queryKey: ["unpaid-income-get", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/unpaid-Income-Paid/${id}`);
      return res.data;
    },
    enabled: !!id, // id না থাকলে query চলবে না
  });

  // unpaidData আসলে form এ সেট করে দিচ্ছি
  useEffect(() => {
    if (unpaidData) {
      setTitle(unpaidData.title || "");
      setCategory(unpaidData.category || "");
      setPaidTK(unpaidData.paidTK || "");
      setUnpaidTK(unpaidData.unPaidTK || "");
      setCustomerName(unpaidData.customerName || "");
      setPhoneNumber(unpaidData.phoneNumber || "");
      setSalesmanName(unpaidData.salesmanName || "");
    }
  }, [unpaidData]);

  // সময় ও তারিখ (বাংলায়)
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dateBD = now.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Update handler
  const handleUpdateUnpaidIncome = async (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      category,
      paidTK,
      unPaidTK,
      customerName,
      phoneNumber,
      salesmanName,
      time,
      date,
    };

    try {
      const res = await axiosPublic.put(`/unpaid-Income-Paid/${id}`, updatedData);

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
    return <p className="flex justify-center items-center h-screen">  <ScaleLoader color="#36d7b7" /></p>;
  }

  return (
    <div className="pb-5">
      <Helmet>
        <title>স্টাইলম্যান | আপডেট বকেয়া হিসাব </title>
      </Helmet>
      <div className="bg-black text-white p-4 my-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">বকেয়া হিসাব আপডেট</h2>
        <NavLink to={"/all-unpaid-income"}>
          <button className="text-sm md:text-lg lg:text-lg text-red-600 underline hover: scale-110 ">
            বকেয়া হিসাবগুলো দেখুন
          </button>
        </NavLink>
      </div>

      <div className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto p-6 bg-white rounded-md shadow-md">
        <h4 className="text-white bg-red-600 p-2 text-sm mb-2 rounded-lg">
          <span className="font-semibold">আজকের তারিখ:</span> ‍{dateBD}
        </h4>

        <form className="space-y-4" onSubmit={handleUpdateUnpaidIncome}>
          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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

          {/* Paid & Unpaid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="paidTK"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                নগদ (৳) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="paidTK"
                value={paidTK}
                onChange={(e) => setPaidTK(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="0.00 ৳"
                required
              />
            </div>
            <div>
              <label
                htmlFor="unPaidTK"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                বকেয়া (৳) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="unPaidTK"
                value={unPaidTK}
                onChange={(e) => setUnpaidTK(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="0.00 ৳"
              />
            </div>
          </div>

          {/* Customer & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="customerName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
            <label
              htmlFor="salesmanName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
            <FaPlus className="text-sm" /> আপডেট করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUnpaid;
