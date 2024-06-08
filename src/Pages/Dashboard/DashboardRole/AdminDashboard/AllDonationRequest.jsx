import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdOutlineCancel } from "react-icons/md";
import useRoleCheckFetch from "../../../../Hooks/useRoleCheckFetch";
import { toast } from "react-toastify";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const AllDonationRequest = () => {

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()

    const [roleChecked] = useRoleCheckFetch()

    const isAdmin = roleChecked.role
    const isVolunteer = roleChecked.role


    const { data: allRequests = [], refetch } = useQuery({
        queryKey: ['my-donation-request'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/create-donation-request`)
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


    const handleCancel = async (data) => {

        const status = data.status === 'canceled' ? 'done' : 'canceled'

        const res = await axiosPublic.patch(`/changeStatus/${data._id}`, { status })
        if (res.data.modifiedCount > 0) {
            toast.success(`${data.status === 'done' ? 'Done' : 'Canceled'}`)
            refetch()
        }
    }
    const handleDone = async (data) => {

        const status = data.status === 'done' ? 'canceled' : 'done'

        const res = await axiosPublic.patch(`/changeStatus/${data._id}`, { status })
        if (res.data.modifiedCount > 0) {
            toast.success(`${data.status === 'done' ? 'Canceled' : 'Done'}`)
            refetch()
        }
    }

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
                            <th>Donar Info</th>
                            <th>Donation Status</th>
                            <th>Updated Status</th>
                            {
                                isAdmin === 'admin' &&

                                <th>Actions</th>


                            }

                            <th>Details</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            allRequests.map((singleData, idx) => <tr key={singleData._id}>
                                <th>{idx + 1}</th>
                                <td>{singleData.recipientName}</td>
                                <td className="">
                                    <span>{singleData.district},</span>
                                    <span>{singleData.upazila}</span>
                                </td>
                                <td>{singleData.bloodGroup}</td>
                                <td>{singleData.donateDate.split(',')[0]}</td>
                                <td>{singleData.donateTime.split(',')[1]}</td>

                                <td>
                                    {
                                        singleData.status === 'inprogress' ? <div className="flex flex-col">
                                            <p>{singleData.bloodDonarName}</p>
                                            <p>{singleData.bloodDonarEmail}</p>
                                        </div>
                                            :
                                            <h3 className="text-red-400">Anyone don't agree!</h3>
                                    }
                                </td>



                                <td className={` ${singleData.status === 'pending' && 'text-[#FF5733]' || singleData.status === 'inprogress' && 'text-[#3498DB]' || singleData.status === 'done' && 'text-green-600' || singleData.status === 'canceled' && 'text-red-900'} text-lg `}>{singleData.status}</td>
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
                                        : <td></td>

                                }


                                {isAdmin === 'admin' &&
                                    <td >
                                        <div className="flex">
                                            <button>
                                                <Link to={`/dashboard/updated-donation-request/${singleData._id}`}>
                                                    <FaEdit className="text-xl text-green-600 hover:scale-110"></FaEdit>
                                                </Link>

                                            </button>
                                            <button onClick={() => handleDelete(singleData._id)}>
                                                <MdDeleteForever className="text-2xl text-red-600 hover:scale-110"></MdDeleteForever>
                                            </button>
                                        </div>

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
    );
};

export default AllDonationRequest;