import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdOutlineCancel } from "react-icons/md";
import Swal from "sweetalert2";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { toast } from "react-toastify";

const DonorDashboard = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()


    const { data = [], refetch } = useQuery({
        queryKey: ['my-donation-request'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/recentThreeData/${user.email}`)
            return data
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
            <h1 className="text-3xl font-semibold mb-8">Welcome to <span className="text-orange-600">{user?.displayName}</span></h1>
            {
                !data.length == [] && <>
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
                                        <th>Actions</th>
                                        <th>Donar Info</th>
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
                    <div>
                        <Link to="/dashboard/my-donation-requests">
                            <button className="btn text-white bg-orange-500 hover:btn-ghost mt-5">View my all</button>
                        </Link>
                    </div>
                </>
            }

        </div>
    );
};

export default DonorDashboard;