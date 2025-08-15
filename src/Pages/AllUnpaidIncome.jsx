import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AllUnpaidIncome = () => {

const axiosPublic=useAxiosPublic()

    const { data: unpaidIncomes = [] } = useQuery({
        queryKey: ['all-unpaid-incomes'],
        queryFn: async () => {
            const res = await axiosPublic.get('/unPaidIncome')
            return res.data
        }
})

    
    console.log(unpaidIncomes)
    
    return (
        <div>
            <Helmet>
                                <title>স্টাইলম্যান | বকেয়া লেনদেনগুলো</title>
                            </Helmet>
                  <div className="bg-red-600 text-white p-4 my-5 text-center ">
                          <h2 className=" font-semibold"> বকেয়া লেনদেনগুলো</h2>
                          
                  </div>
            <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th>নং</th>
        <th>হিসাবকারীর নাম</th>
        <th>কাস্টমারের নাম</th>
        <th>শিরোনাম</th>
        <th>টাকার পরিমাণ (৳)</th>
    
        <th>তারিখ</th>
        <th>ফোন নাম্বার</th>
        <th>অ্যাকশন </th>
      </tr>
                    </thead>
                    
    <tbody className='divide-y'>
                        {
                            unpaidIncomes?.map((data,idx)=><tr key={data._id}>
                                <th>{ idx + 1}</th>
                                <th>{ data.salesmanName}</th>
                                <td>{ data.customerName}</td>
                                <td>{ data.title}</td>
                                <td className='font-medium'>নগদ: <span className='text-green-600'>{data.paidTK}</span> , বকেয়া: <span className='text-red-600'>{ data.unPaidTK}</span></td>
                                <td>{ data.date}</td>
                                <td>{ data.phoneNumber}</td>
        <td>Edit/Delete</td>
      </tr>)
      }
      
      
    </tbody>
  
  </table>
</div>
        </div>
    );
};

export default AllUnpaidIncome;