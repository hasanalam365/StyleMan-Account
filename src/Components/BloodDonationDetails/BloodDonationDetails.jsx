import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const BloodDonationDetails = () => {

    const { user } = useAuth()
    const loadUpdateData = useLoaderData()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleDonate = async (e) => {
        e.preventDefault()
        const bloodDonarName = user.displayName
        const bloodDonarEmail = user.email
        const status = "inprogress"

        const bloodDonarConfirmInfo = { bloodDonarName, bloodDonarEmail, status }

        Swal.fire({
            title: "Are you sure?",
            text: "You want to donate blood!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, donate!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosPublic.put(`/donarDonateBlood/${loadUpdateData._id}`, bloodDonarConfirmInfo)

                if (res.data.modifiedCount > 0) {
                    toast.success(`Thank you ${user.displayName} for donating blood`)
                    navigate('/')
                }
            }
        });

    }

    return (
        <div>
            <section className="p-6 bg-gray-100 dark:text-gray-900">
                <form onSubmit={handleDonate} noValidate="" action="" className="container flex flex-col mx-auto space-y-4">
                    <div className="col-span-full lg:col-span-1 mx-auto">
                        <p className="text-3xl ml-5  md:text-4xl lg:text-4xl font-semibold">Donation Request Information</p>

                    </div>
                    <fieldset className=" p-6 rounded-md shadow-sm dark:bg-gray-50">
                        <div className="grid grid-cols-6  gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-lg  ">Recipient Name</label>
                                <input id="Recipient Name" type="text" placeholder="Recipient Name"
                                    value={loadUpdateData.recipientName}
                                    name="recipientName" className="w-full rounded-md
                                p-2 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="hospitalName" className="text-lg  ">Hospital Name</label>
                                <input id="lastname" type="text" name="hospitalName"
                                    value={loadUpdateData.hospitalName} placeholder="exp: Dhaka Medical College Hospital" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600  p-2 dark:border-gray-300" />
                            </div>

                            <div className="col-span-full grid grid-cols-6 lg:flex-row  gap-5 ">
                                <div className="flex flex-col col-span-full md:col-span-2  lg:col-span-2 ">
                                    <label className="text-lg  " htmlFor="">Select Blood Group</label>
                                    <select name="bloodGroup" className="select select-success">

                                        <option value={loadUpdateData.bloodGroup}>{loadUpdateData.bloodGroup}</option>

                                    </select>
                                </div>
                                <div className="flex flex-col col-span-full md:col-span-2  lg:col-span-2 ">
                                    <label className="text-lg  " htmlFor="">Select District</label>
                                    <select name="district" className="select select-success">
                                        <option value={loadUpdateData.district}>{loadUpdateData.district}</option>

                                    </select>
                                </div>
                                <div className="flex flex-col col-span-full md:col-span-2 lg:col-span-2">
                                    <label className="text-lg  " htmlFor="">Select Upazila</label>
                                    <select name="upazila" className="select select-success">
                                        <option value={loadUpdateData.upazila}>{loadUpdateData.upazila}</option>

                                    </select>
                                </div>

                            </div>
                            <div className=" col-span-6">
                                <label className="text-lg  ">Full Address</label>
                                <input id="Recipient Name" type="text" placeholder="exp: Zahir Raihan Rd, Dhaka"
                                    value={loadUpdateData.fullAddress}
                                    name="fullAddress" className="w-full rounded-md
                                p-2 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300" />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="Request Message" className="text-lg">Request Message</label>
                                <textarea id="requestMessage" name="requestMessage" placeholder="why you need blood?"
                                    value={loadUpdateData.requestMessage} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"></textarea>
                            </div>
                            <div className="col-span-3 flex flex-col">
                                <label htmlFor="Select Date" className="text-lg">Donation Date</label>
                                <DatePicker
                                    showIcon
                                    value={loadUpdateData.donateDate.split(',')[0]}

                                    className="w-full "
                                />
                            </div>
                            <div className="col-span-3 flex flex-col md:col-span-3 lg:col-span-3">
                                <label htmlFor="Select Date" className="text-lg">Donation Time</label>
                                <DatePicker

                                    className="p-1 w-full"
                                    showTimeSelect
                                    value={loadUpdateData.donateTime.split(',')[1]}
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
                                <button className="btn btn-secondary">Donate Blood</button>
                            </div>
                        </div>
                    </fieldset>

                </form>
            </section>
        </div>
    );
};

export default BloodDonationDetails;