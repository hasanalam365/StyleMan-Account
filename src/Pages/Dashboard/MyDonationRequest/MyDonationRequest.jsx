import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaCandyCane, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyDonationRequest = () => {

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()


    const { data = [], refetch } = useQuery({
        queryKey: ['my-donation-request'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/create-donation-request/${user.email}`, {
                params: { category },
            })
            return data
        }
    })



    const [category, setCategory] = useState('');
    // const [search, setSearch] = useState([]);
    // console.log(category, 'category is power bu tnot change')
    // const { data: seachData = [] } = useQuery({
    //     queryKey: ['filter-search'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/search', {
    //             params: { category },
    //         })
    //         return res.data
    //     }
    // })

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


    const handleSearch = () => {
        refetch()

    };


    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    const handleCancel = async (data) => {

        const status = data.status === 'canceled' ? 'done' : 'canceled'

        const res = await axiosPublic.patch(`/changeStatus/${data._id}`, { status })
        if (res.data.modifiedCount > 0) {
            toast.success(`${data.status === 'done' ? 'Done' : 'Canceled'}`)
            navigate('/dashboard')
        }
    }
    const handleDone = async (data) => {

        const status = data.status === 'done' ? 'canceled' : 'done'

        const res = await axiosPublic.patch(`/changeStatus/${data._id}`, { status })
        if (res.data.modifiedCount > 0) {
            toast.success(`${data.status === 'done' ? 'Canceled' : 'Done'}`)
            navigate('/dashboard')
        }
    }

    return (
        <div>
            <div>
                <select value={category} onChange={handleChange} className="select select-bordered w-full max-w-xs">
                    <option selected value=''>All Status</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">Inprogress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>

                </select>
                <button onClick={
                    handleSearch
                } className="btn btn-ghost">Search</button>

            </div>
            {
                data.length === 0 ? <div>
                    <h1 className="text-4xl mt-52 w-1/4 mx-auto">No data Found!!</h1>
                </div>
                    :
                    <div>

                        <div className="overflow-x-auto mr-5 mt-5 ">

                            <table className="table table-zebra ">
                                {/* head */}
                                <thead className="bg-orange-600 text-white">
                                    <tr>
                                        <th>#</th>
                                        <th>Recipient Name</th>
                                        <th>Recipient Location</th>
                                        <th>Blood Group</th>
                                        <th>Donation Date</th>
                                        <th>Donation Time</th>
                                        <th>Donation Status</th>
                                        <th>Donar Info</th>
                                        <th>Actions</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        data.map((singleData, idx) => <tr key={singleData._id}>
                                            <th>{idx + 1}</th>
                                            <td>{singleData.recipientName}</td>
                                            <td className="">
                                                <span>{singleData.district},</span>
                                                <span>{singleData.upazila}</span>
                                            </td>
                                            <td>{singleData.bloodGroup}</td>
                                            <td>{singleData.donateDate.split(',')[0]}</td>
                                            <td>{singleData.donateTime.split(',')[1]}</td>


                                            <td className={` ${singleData.status === 'pending' && 'text-[#FF5733]' || singleData.status === 'inprogress' && 'text-[#3498DB]' || singleData.status === 'done' && 'text-green-600' || singleData.status === 'canceled' && 'text-red-900'} text-lg `}>{singleData.status}</td>

                                            <td>
                                                {
                                                    singleData.status === 'inprogress' ? <div>
                                                        <p>{singleData.bloodDonarName},</p>
                                                        <p>{singleData.bloodDonarEmail}</p>
                                                    </div>
                                                        :
                                                        <h3 className="text-red-400">Anyone don't agree!</h3>
                                                }
                                            </td>

                                            {
                                                singleData.status === 'inprogress' ?

                                                    <td className="flex gap-1">
                                                        <button onClick={() => handleCancel(singleData)} className="tooltip" data-tip="cancel">
                                                            <MdOutlineCancel className="text-xl  text-red-600 hover:scale-110" ></MdOutlineCancel>
                                                        </button>
                                                        <button onClick={() => handleDone(singleData)} className="tooltip" data-tip="done">
                                                            <IoCheckmarkDoneCircle className="text-xl  text-green-600 hover:scale-110"></IoCheckmarkDoneCircle>
                                                        </button>

                                                    </td>

                                                    :
                                                    <td className="flex gap-1">
                                                        <button>
                                                            <Link to={`/dashboard/updated-donation-request/${singleData._id}`} className="tooltip" data-tip="updated">
                                                                <FaEdit className="text-xl text-green-600 hover:scale-110"></FaEdit>
                                                            </Link>

                                                        </button>
                                                        <button onClick={() => handleDelete(singleData._id)} className="tooltip" data-tip="delete">
                                                            <MdDeleteForever className="text-2xl text-red-600 hover:scale-110"></MdDeleteForever>
                                                        </button>
                                                    </td>
                                            }



                                            <td>
                                                <Link to={`/donarRequestDetails/${singleData._id}`}>View</Link>
                                            </td>
                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>

    );
};

export default MyDonationRequest;