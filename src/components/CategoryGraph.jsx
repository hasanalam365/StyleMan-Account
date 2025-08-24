import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { PieChart } from '@mui/x-charts';

const CategoryGraph = () => {
  const axiosPublic = useAxiosPublic();

  // ক্যাটাগরি ডেটা ফেচ
  const { data: dailyIncomes = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axiosPublic.get('/category');
      return res.data;
    }
  });

  // ক্যাটাগরি অনুযায়ী count এবং total price বের করা
  const categoryStats = dailyIncomes.reduce((acc, curr) => {
    // curr.categories হলো array
    curr.categories.forEach(cat => {
      const name = cat.name;
      const price = parseFloat(cat.price) || 0;

      if (!acc[name]) {
        acc[name] = { count: 0, totalPrice: 0 };
      }

      acc[name].count += 1;
      acc[name].totalPrice += price;
    });

    return acc;
  }, {});

  // Pie Chart-এর জন্য ডেটা তৈরি
  const chartData = Object.entries(categoryStats).map(([name, stats], index) => ({
    id: index,
    value: stats.totalPrice,
    label: `${name} (${stats.count.toLocaleString("bn-BD")} পিস, ৳ ${stats.totalPrice.toLocaleString("bn-BD")})`
  }));

  return (
    <div className="mt-5">
      <h2 className="text-center mb-4 bg-orange-600 text-white p-2">
        ক্যাটাগরি অনুযায়ী সেল
      </h2>
      {chartData.length > 0 ? (
        <PieChart
          series={[
            {
              data: chartData,
            },
          ]}
          width={400}
          height={250}
        />
      ) : (
        <div className="text-center text-gray-500">এই মাসে কোনো ডেটা নেই</div>
      )}
    </div>
  );
};

export default CategoryGraph;
