import React from "react";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from "@mui/x-charts";



  




const Dashboard = () => {
  return (
    <div>
      <div className="bg-black text-white p-4 my-5">
        <h2 className="text-lg font-semibold">ড্যাশবোর্ড</h2>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col md:flex-col lg:flex-row gap-5 w-[90%] mx-auto">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Income */}
          <div className="stat shadow-sm rounded-lg bg-white">
            <div className="stat-figure text-green-600">
              <IoIosTrendingUp className="text-4xl" />
            </div>
            <div className="stat-title">এ মাসের আয়</div>
            <div className="stat-value">
              <span className="text-sm">৳</span> ৫,০০০
            </div>
            <div className="stat-desc">জানু ০১ - ফেব্রু ০১</div>
          </div>

          {/* Expense */}
          <div className="stat shadow-sm rounded-lg bg-white">
            <div className="stat-figure text-green-600">
              <IoIosTrendingDown className="text-4xl text-red-600" />
            </div>
            <div className="stat-title">এ মাসের খরচ</div>
            <div className="stat-value">
              <span className="text-sm">৳</span> ৫,০০০
            </div>
            <div className="stat-desc">জানু ০১ - ফেব্রু ০১</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Balance */}
          <div className="stat shadow-sm rounded-lg bg-white">
            <div className="stat-figure text-green-600">
              <RiMoneyDollarCircleLine className="text-4xl text-red-600" />
            </div>
            <div className="stat-title">ব্যালেন্স</div>
            <div className="stat-value text-red-600">
              <span className="text-sm">৳ </span>-৫,০০০
            </div>
            <div className="stat-desc">জানু ০১ - ফেব্রু ০১</div>
          </div>

          {/* Today */}
          <div className="stat shadow-sm rounded-lg bg-white">
            <div className="stat-figure text-green-600">
              <IoCalendarOutline className="text-4xl text-blue-600" />
            </div>
            <div className="stat-title">আজকের তারিখ</div>
            <div className="stat-value">31/12/2025</div>
          </div>
        </div>
      </div>

      {/* Graph */}

      <div className="flex flex-row-reverse  justify-center gap-20 mt-5">
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
    xAxis={[
      {
        scaleType: "point",
        data: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
      },
    ]}
    yAxis={[{ min: 0, max: 16000 }]} // y-axis limit
    series={[
      {
        data: [5000, 7200, 8100, 6400, 9500, 10200, 9800, 11500, 12300, 11800, 13500, 0],
        label: "Monthly Income",
        color: "green",
        showMark: true, // data points দেখাবে
      },
      {
        data: [3200, 4100, 5300, 10000, 5700, 6400, 6000, 6900, 7500, 7300, 7800, 8200],
        label: "Monthly Expense",
        color: "red",
        showMark: true,
      },
    ]}
    grid={{ vertical: true, horizontal: true }} // grid line
    width={600}
    height={300}
  />
</div>
      </div>

      <div className="mt-5">
        <div className="bg-white ">
          <h2 className="text-lg font-bold p-3"> সাম্প্রতিক লেনদেন</h2>
           <div className="divider mt-0 pt-0 mb-0"></div>
        </div>
       
         {/* Recent Transactions */}
      <div className="overflow-x-auto  bg-white">
        
        <table className="table">
          {/* Head */}
          <thead>
            <tr>
              <th>সেলসম্যান</th>
              <th>শিরোনাম</th>
              <th>টাকার পরিমাণ</th>
              <th>সময়/তারিখ</th>
              <th>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr>
              <th>01</th>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span>
              </td>
              <td>
                30/09/2025
                <br />
                <span className="badge badge-ghost badge-sm">
                 02:59 pm
                </span>
              </td>
              <th className="flex gap-3">
                <button className=" "><FaEdit className="text-lg text-green-600 hover:scale-125"/></button>
                <button className=" "><MdDeleteForever className="text-lg text-red-600 hover:scale-125"/>
</button>
              </th>
              </tr>
                {/* Row 2 */}
            <tr>
              <th>01</th>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span>
              </td>
              <td>
                30/09/2025
                <br />
                <span className="badge badge-ghost badge-sm">
                 02:59 pm
                </span>
              </td>
              <th className="flex gap-3">
                <button className=" "><FaEdit className="text-lg text-green-600 hover:scale-125"/></button>
                <button className=" "><MdDeleteForever className="text-lg text-red-600 hover:scale-125"/>
</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
     </div>
    </div>
  );
};

export default Dashboard;
