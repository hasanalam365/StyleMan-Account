import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useDataLoad from "../../Hooks/useDataLoad";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdatedDonationRequest = () => {

    const { user } = useAuth()
    const [districts, upazilas] = useDataLoad()

    const loadUpdateData = useLoaderData()
    const [startDate, setStartDate] = useState(new Date(loadUpdateData.donateDate));
    const [time, setStartTime] = useState(new Date(loadUpdateData.donateTime));

    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()


    const handleUpdated = async (e) => {
        e.preventDefault()
        const form = e.target;
        const recipientName = form.recipientName.value;
        const hospitalName = form.hospitalName.value;
        const requesterName = user.displayName
        const requesterEmail = user.email
        const district = form.district.value;
        const upazila = form.upazila.value;
        const bloodGroup = form.bloodGroup.value;
        const donateDate = startDate.toLocaleString()
        const donateTime = time.toLocaleString()

        const requestMessage = form.requestMessage.value
        const fullAddress = form.fullAddress.value
        const status = "pending"

        const donationUpdatedDetails = { recipientName, hospitalName, district, upazila, bloodGroup, requestMessage, fullAddress, donateDate, donateTime, requesterName, requesterEmail, status }


        try {
            const res = await axiosPublic.patch(`/updated-request/${loadUpdateData._id}`, donationUpdatedDetails)

            if (res.data.modifiedCount > 0) {
                toast.success('Your request has been updated')
                navigate('/dashboard/my-donation-requests')

            }
        } catch (err) {
            toast.err(err.message)
        }


    }

    return (
        <div>
            <section className="p-6 bg-gray-100 dark:text-gray-900">
                <form onSubmit={handleUpdated} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className=" ">Updated Donation Request Information</p>

                        </div>
                        <div className="grid grid-cols-6  gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-lg  ">Recipient Name</label>
                                <input id="Recipient Name" type="text" placeholder="Recipient Name"
                                    defaultValue={loadUpdateData.recipientName}
                                    name="recipientName" className="w-full rounded-md
                                    p-2 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="hospitalName" className="text-lg  ">Hospital Name</label>
                                <input id="lastname" type="text" name="hospitalName"
                                    defaultValue={loadUpdateData.hospitalName} placeholder="exp: Dhaka 
Medical College Hospital" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600  p-2 dark:border-gray-300" />
                            </div>

                            <div className="flex flex-col  sm:col-span-6 lg:flex-row  gap-5 ">
                                <div className="flex flex-col sm:col-span-2">
                                    <label className="text-lg  " htmlFor="">Select Blood Group</label>
                                    <select name="bloodGroup" className="select select-success">

                                        <option value={loadUpdateData.bloodGroup}>{loadUpdateData.bloodGroup}</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>

                                    </select>
                                </div>
                                <div className="flex flex-col sm:col-span-2">
                                    <label className="text-lg  " htmlFor="">Select District</label>
                                    <select name="district" className="select select-success">
                                        <option value={loadUpdateData.district}>{loadUpdateData.district}</option>
                                        {/* districts map */}
                                        {
                                            districts.map(district => <option key={district.id}>
                                                {district.name}
                                            </option>)
                                        }

                                    </select>
                                </div>
                                <div className="flex flex-col sm:col-span-2">
                                    <label className="text-lg  " htmlFor="">Select Upazila</label>
                                    <select name="upazila" className="select select-success">
                                        <option value={loadUpdateData.upazila}>{loadUpdateData.upazila}</option>
                                        {/* districts map */}
                                        {
                                            upazilas.map(upazila => <option key={upazila.id}>
                                                {upazila.name}
                                            </option>)
                                        }

                                    </select>
                                </div>

                            </div>
                            <div className="col-span-full sm:col-span-6">
                                <label className="text-lg  ">Full Address</label>
                                <input id="Recipient Name" type="text" placeholder="exp: Zahir Raihan Rd, Dhaka"
                                    defaultValue={loadUpdateData.fullAddress}
                                    name="fullAddress" className="w-full rounded-md
                                    p-2 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300" />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="Request Message" className="text-lg">Request Message</label>
                                <textarea id="requestMessage" name="requestMessage" placeholder="why you need blood?"
                                    defaultValue={loadUpdateData.requestMessage} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"></textarea>
                            </div>
                            <div className="col-span-3 flex flex-col">
                                <label htmlFor="Select Date" className="text-lg">Donation Date</label>
                                <DatePicker
                                    showIcon
                                    selected={startDate}
                                    onSelect={(date) => setStartDate(date)}
                                />
                            </div>
                            <div className="col-span-3 flex flex-col">
                                <label htmlFor="Select Date" className="text-lg">Donation Time</label>
                                <DatePicker
                                    selected={time}
                                    onChange={(time) => setStartTime(time)}
                                    className="p-2 rounded-lg"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-lg ">Requester Name</label>
                                <input id="Requester Name" type="text" value={user.displayName}
                                    name="requesterName" className="w-full rounded-md
                                    p-2 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="Requester Email" className="text-lg">Requester Email</label>
                                <input id="lastname" type="text" name="requesterEmail" value={user.email} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600
                                p-2 dark:border-gray-300" />
                            </div>
                            <div className="form-control col-span-full mt-6">
                                <button className="btn btn-primary">Updated</button>
                            </div>
                        </div>
                    </fieldset>

                </form>
            </section>
        </div>
    );
};

export default UpdatedDonationRequest;