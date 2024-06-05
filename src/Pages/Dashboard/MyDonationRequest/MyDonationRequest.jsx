import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GiArmoredBoomerang } from "react-icons/gi";
import { Link } from "react-router-dom";

const MyDonationRequest = () => {

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()


    const { data = [] } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/create-donation-request/${user.email}`)
            return data
        }
    })

    return (
        <div>
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
                                <th>{idx + 1}</th>
                                <td>{singleData.recipientName}</td>
                                <td className="flex flex-col">
                                    <span>{singleData.district}</span>
                                    <span>{singleData.upazila}</span>
                                </td>
                                <td>{singleData.bloodGroup}</td>
                                <td>{singleData.donateDate}</td>
                                <td>{singleData.donateTime}</td>
                                <td>{singleData.status}</td>
                                <td>
                                    <FaEdit className="text-xl text-green-600 hover:scale-110"></FaEdit>

                                </td>
                                <td>
                                    <MdDeleteForever className="text-2xl text-red-600 hover:scale-110"></MdDeleteForever>
                                </td>

                                <td>
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