import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';

const UpdatedIncome = () => {

    const getId = useParams()
const axiosPublic=useAxiosPublic()

    
    const { data: updatedIncomeData = [] } = useQuery({
        queryKey: ['updated-incom'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/income-data/${getId.id}`)
            return res.data
        }
    })
    
    console.log(updatedIncomeData)

    return (
        <div>
          
        </div>
    );
};

export default UpdatedIncome;