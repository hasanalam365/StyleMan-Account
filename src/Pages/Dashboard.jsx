import React from "react";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { ScaleLoader } from "react-spinners";
import RecentIncomeData from "../components/RecentIncomeData";
import RecentExpenseData from "../components/RecentExpenseData";

  
const Dashboard = () => {

  const axiosPublic = useAxiosPublic()
 

     const now = new Date();
    const time = now.toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" });
const date = now.toLocaleDateString("bn-BD", {
  weekday: "long",   
  day: "numeric",    
  month: "long",     
  year: "numeric"    
});


 const { data: todayIncomeData } = useQuery({
  queryKey: ['today-income'],
  queryFn: async () => {
    const res = await axiosPublic.get('/todayIncome');
    return res.data;
  }
});
 const { data: todayExpenseData } = useQuery({
  queryKey: ['today-expense'],
  queryFn: async () => {
    const res = await axiosPublic.get('/todayExpense');
    return res.data;
  }
});


 
 

const totalIncome=todayIncomeData?.totalIncome.toLocaleString("bn-BD")
const totalExpense=todayExpenseData?.totalExpenses.toLocaleString("bn-BD")
  
  
const incomeValue = todayIncomeData?.totalIncome ?? 0;
const expenseValue = todayExpenseData?.totalExpenses ?? 0;
const balanceValue = incomeValue - expenseValue;


const { data: responseIncome, isLoading, error } = useQuery({
    queryKey: ['monthly-income'],
    queryFn: async () => {
      const res = await axiosPublic.get('/monthlyIncome');
      return res.data;
    }
  });
const { data: responseExpense } = useQuery({
    queryKey: ['monthly-expense'],
    queryFn: async () => {
      const res = await axiosPublic.get('/monthlyExpense');
      return res.data;
    }
  });

  if (isLoading) return <p className="flex justify-center items-center h-screen">  <ScaleLoader color="#36d7b7" /></p>;
  if (error) return <p>কোনো সমস্যা হয়েছে!!!</p>;

  // months array যেটা xAxis এ লাগবে, এবং index ধরে ডাটা সাজাবো
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  // response থেকে monthlyIncome টা নিয়ে আসছি
  const monthlyIncome = responseIncome?.monthlyIncome || {};

  const incomeData = months.map(month => {
    const year = new Date().getFullYear(); // যেমন 2025

    const key = `${year}-${month}`;
    return monthlyIncome[key] || 0;
  });

  // responseExpense থেকে monthlyExpense টা নিয়ে আসছি
  const monthlyExpense = responseExpense?.monthlyExpense || {};

  const expenseData = months.map(month => {
    const year = new Date().getFullYear(); // যেমন 2025

    const key = `${year}-${month}`;
    return monthlyExpense[key] || 0;
  });


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
                 <span className="text-sm ">৳</span> <span>{totalExpense || "০"}</span>
             </p>
            </div>
            {/* <div className="stat-desc">জানু ০১ - ফেব্রু ০১</div> */}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Balance */}
          <div className="stat shadow-sm rounded-lg bg-white">
            <div className="stat-figure text-green-600">
              <RiMoneyDollarCircleLine className={balanceValue > 0 ? "text-green-600 text-4xl" : "text-red-600 text-4xl"} />
            </div>
            <div className={balanceValue > 0 ? "text-green-600 stat-title" : "text-red-600 stat-title"}> আজকের ব্যালেন্স</div>
            <div className="stat-value text-red-600">
            <p className={balanceValue > 0 ? "text-green-600" : "text-red-600"}>
  <span className="text-sm">৳</span> 
  <span>{balanceValue.toLocaleString("bn-BD")}</span>
</p>

            </div>
            {/* <div className="stat-desc">জানু ০১ - ফেব্রু ০১</div> */}
          </div>

          {/* Today */}
          <div className="stat shadow-sm rounded-lg bg-white">
            <div className="stat-figure text-green-600">
              <IoCalendarOutline className="text-4xl text-blue-600" />
            </div>
            <div className="stat-title ">আজকের তারিখ</div>
            <div className="font-medium text-blue-600">{ date} || <span className="font-medium">{ time}</span></div>
            
          </div>
        </div>
      </div>

      {/* Graph */}

      <div className="flex flex-col-reverse md:flex-row-reverse lg:flex-row-reverse  justify-center md:gap-5 lg:gap-5 mt-5">
        <div className="mt-5">
          <h2 className="text-lg font-bold text-center mb-4">আয় বনাম ব্যয়</h2>
               <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      width={200}
      height={200}
        />
     </div>
        
        {/* Double Line Chart */}
        <div>
             <LineChart
  xAxis={[{ scaleType: "point", data: ["জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টে", "অক্টো", "নভে", "ডিসে"] }]}
   yAxis={[
    {
      min: 0,
      max: 16000,
      ticks: [0, 2000, 4000, 5000],
      labelFormatter: (val) => val === 0 ? 'শূন্য' : `${val.toLocaleString("bn-BD")} টাকা`,
    }
  ]}
  series={[
    { data: incomeData, label: "মাসিক আয়:", color: "green", showMark: true },
    { data: expenseData, label: "মাসিক খরচ:", color: "red", showMark: true },
  ]}
  grid={{ vertical: true, horizontal: true }}
  width={window.innerWidth < 768 ? 400 : 550}
  height={window.innerWidth < 768 ? 240 : 300}
/>

</div>
      </div>

{/* সাম্প্রতিক আয়ের লেনদেন */}
      <RecentIncomeData></RecentIncomeData>
      
{/* সাম্প্রতিক খরচের লেনদেন */}
      <RecentExpenseData></RecentExpenseData>
      

      

    </div>
  );
};

export default Dashboard;
