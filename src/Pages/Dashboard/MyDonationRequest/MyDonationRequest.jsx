import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const MyDonationRequest = () => {

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()


    const { data = [], refetch } = useQuery({
        queryKey: ['my-donation-request'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/create-donation-request/${user.email}`)
            return data
        }
    })



    const [category, setCategory] = useState('');
    // const [search, setSearch] = useState([]);
    console.log(category)
    const { data: seachData = [] } = useQuery({
        queryKey: ['filter-search'],
        queryFn: async () => {
            const res = await axiosPublic.get('/search', {
                params: { category },
            })
            return res.data
        }
    })

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosPublic.delete(`/donation-request-delete/${id}`)
                console.log(res.deletedCount)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your request has been deleted.",
                        icon: "success"
                    });
                    refetch()
                }

            }
        });
    }

    const [set, setSet] = useState()

    const handleSearch = async () => {
        const response = await fetch(`/search?category=${category}`);
        const data = await response.json();
        setSet(data);
    };

    console.log(set)
    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div>
            <div>
                <select value={category} onChange={handleChange} className="select select-bordered w-full max-w-xs">
                    <option disabled selected value=''>Filter Information</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">Inprogress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>

                </select>
                <button onClick={
                    handleSearch
                } className="btn btn-ghost">Search</button>

            </div>
            <div className="overflow-x-auto">

                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipient Name</th>
                            <th>Recipient Location</th>
                            <th>Blood Group</th>
                            <th>Donation Date</th>
                            <th>Donation Time</th>
                            <th>Donation Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((singleData, idx) => <tr key={singleData._id}>
                                <th className="text-lg">{idx + 1}</th>
                                <td className="text-lg">{singleData.recipientName}</td>
                                <td className="flex flex-col text-lg">
                                    <span>{singleData.district}</span>
                                    <span>{singleData.upazila}</span>
                                </td>
                                <td className="text-lg">{singleData.bloodGroup}</td>
                                <td className="text-lg">{singleData.donateDate.split(',')[0]}</td>
                                <td className="text-lg">{singleData.donateTime.split(',')[1]}</td>

                                <td className={` ${singleData.status === 'pending' && 'text-[#FF5733]' || singleData.status === 'inprogress' && 'text-[#3498DB]' || singleData.status === 'done' && 'text-green-600' || singleData.status === 'canceled' && 'text-red-900'} text-lg `}>{singleData.status}</td>

                                <td>
                                    <Link to={`/dashboard/updated-donation-request/${singleData._id}`}>
                                        <FaEdit className="text-xl text-green-600 hover:scale-110"></FaEdit>
                                    </Link>

                                </td>
                                <td onClick={() => handleDelete(singleData._id)}>
                                    <MdDeleteForever className="text-2xl text-red-600 hover:scale-110"></MdDeleteForever>
                                </td>

                                <td className="text-lg">
                                    <Link>View</Link>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonationRequest;