import React, { useState, useEffect } from "react";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import { LineChart } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { ScaleLoader } from "react-spinners";
import RecentIncomeData from "../components/RecentIncomeData";
import RecentExpenseData from "../components/RecentExpenseData";
import CategoryGraph from "../components/CategoryGraph";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const axiosPublic = useAxiosPublic();
   const { user } = useAuth()


  
  // ⏳ Time & Date real-time update state
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" })
      );
      setDate(
        now.toLocaleDateString("bn-BD", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };

    updateDateTime(); 
    const timer = setInterval(updateDateTime, 1000); 

    return () => clearInterval(timer); 
  }, []);

  // আজকের আয়
  const { data: todayIncomeData } = useQuery({
    queryKey: ["today-income"],
    queryFn: async () => {
      const res = await axiosPublic.get("/todayIncome");
      return res.data;
    },
    refetchInterval: 60 * 1000, 
  });

  // আজকের খরচ
  const { data: todayExpenseData } = useQuery({
    queryKey: ["today-expense"],
    queryFn: async () => {
      const res = await axiosPublic.get("/todayExpense");
      return res.data;
    },
    refetchInterval: 60 * 1000,
  });

  const totalIncome = todayIncomeData?.totalIncome?.toLocaleString("bn-BD");
  const totalExpense = todayExpenseData?.totalExpenses?.toLocaleString("bn-BD");

  const incomeValue = todayIncomeData?.totalIncome ?? 0;
  const expenseValue = todayExpenseData?.totalExpenses ?? 0;
  const balanceValue = incomeValue - expenseValue;

  // মাসিক আয়
  const { data: responseIncome, isLoading, error } = useQuery({
    queryKey: ["monthly-income"],
    queryFn: async () => {
      const res = await axiosPublic.get("/monthlyIncome");
      return res.data;
    },
    refetchInterval: 60 * 1000,
  });

  // মাসিক খরচ
  const { data: responseExpense } = useQuery({
    queryKey: ["monthly-expense"],
    queryFn: async () => {
      const res = await axiosPublic.get("/monthlyExpense");
      return res.data;
    },
    refetchInterval: 60 * 1000,
  });

  

  if (isLoading)
    return (
      <p className="flex justify-center items-center h-screen">
        <ScaleLoader color="#36d7b7" />
      </p>
    );
  if (error) return <p>কোনো সমস্যা হয়েছে!!!</p>;

  // months array
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  // monthlyIncome থেকে ডেটা সাজানো
  const monthlyIncome = responseIncome?.monthlyIncome || {};
  const incomeData = months.map((month) => {
    const year = new Date().getFullYear();
    const key = `${year}-${month}`;
    return monthlyIncome[key] || 0;
  });

  // monthlyExpense থেকে ডেটা সাজানো
  const monthlyExpense = responseExpense?.monthlyExpense || {};
  const expenseData = months.map((month) => {
    const year = new Date().getFullYear();
    const key = `${year}-${month}`;
    return monthlyExpense[key] || 0;
  });

  console.log(expenseData)

  return (
    <div>
      <div className="bg-black text-white p-4 my-5">
        <h2 className="text-lg font-semibold">ড্যাশবোর্ড</h2>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col md:flex-col lg:flex-row gap-5 w-[95%] mx-auto">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Income */}
          <div className="stat shadow-sm rounded-lg bg-white">
            <div className="stat-figure text-green-600">
              <IoIosTrendingUp className="text-4xl" />
            </div>
            <div className="stat-title">আজকের আয়</div>
            <div className="stat-value">
              <span className="text-sm">৳</span> {totalIncome || "০"}
            </div>
          </div>

          {/* Expense */}
          <div className="stat shadow-sm rounded-lg bg-white">
            <div className="stat-figure text-green-600">
              <IoIosTrendingDown className="text-4xl text-red-600" />
            </div>
            <div className="stat-title text-red-600">আজকের খরচ</div>
            <div className="stat-value">
              <p className="text-red-600">
                <span className="text-sm ">৳</span>{" "}
                <span>{totalExpense || "০"}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Balance */}
          <div className="stat shadow-sm rounded-lg bg-white">
            <div className="stat-figure text-green-600">
              <RiMoneyDollarCircleLine
                className={
                  balanceValue > 0
                    ? "text-green-600 text-4xl"
                    : "text-red-600 text-4xl"
                }
              />
            </div>
            <div
              className={
                balanceValue > 0
                  ? "text-green-600 stat-title"
                  : "text-red-600 stat-title"
              }
            >
              {" "}
              আজকের ব্যালেন্স
            </div>
            <div className="stat-value text-red-600">
              <p
                className={
                  balanceValue > 0 ? "text-green-600" : "text-red-600"
                }
              >
                <span className="text-sm">৳</span>
                <span>{balanceValue.toLocaleString("bn-BD")}</span>
              </p>
            </div>
          </div>

          {/* Today */}
          <div className="stat shadow-sm rounded-lg bg-white">
            <div className="stat-figure text-green-600">
              <IoCalendarOutline className="text-4xl text-blue-600" />
            </div>
            <div className="stat-title ">আজকের তারিখ</div>
            <div className="font-medium text-blue-600">
              {date} || <span className="font-medium">{time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="flex flex-col-reverse md:flex-row-reverse lg:flex-row-reverse justify-center md:gap-5 lg:gap-5 mt-5">
        <CategoryGraph />

        {/* Double Line Chart */}
        <div className="mt-6">
          <LineChart
            xAxis={[
              {
                scaleType: "point",
                data: [
                  "জানু",
                  "ফেব্রু",
                  "মার্চ",
                  "এপ্রিল",
                  "মে",
                  "জুন",
                  "জুলাই",
                  "আগস্ট",
                  "সেপ্টে",
                  "অক্টো",
                  "নভে",
                  "ডিসে",
                ],
              },
            ]}
            yAxis={[
              {
                min: 0,
                max: 16000,
                ticks: [0, 2000, 4000, 5000],
                labelFormatter: (val) =>
                  val === 0
                    ? "শূন্য"
                    : `${val.toLocaleString("bn-BD")} টাকা`,
              },
            ]}
            series={[
              {
                data: incomeData,
                label: "মাসিক আয়:",
                color: "green",
                showMark: true,
              },
              {
                data: expenseData,
                label: "মাসিক খরচ:",
                color: "red",
                showMark: true,
              },
            ]}
            grid={{ vertical: true, horizontal: true }}
            width={window.innerWidth < 768 ? 400 : 550}
            height={window.innerWidth < 768 ? 240 : 300}
          />
        </div>
      </div>

      {/* Recent Income */}
      <RecentIncomeData />
      {/* Recent Expense */}
      <RecentExpenseData />
    </div>
  );
};

export default Dashboard;
