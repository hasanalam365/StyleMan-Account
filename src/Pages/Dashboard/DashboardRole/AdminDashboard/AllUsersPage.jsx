
import useAllUsers from "../../../../Hooks/useAllUsers";
// import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import UserRoleModal from "../../../../Components/Modal/UserRoleModal";
import { Description, Field, Label, Select } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { FaSortDown } from 'react-icons/fa';

const AllUsersPage = () => {
    const [users] = useAllUsers()
    const usersLength = users.filter(user => user.role === 'donor')


    const handleStatusChange = (status) => {
        Swal.fire({
            title: ` Do you want to change the Status?`,

            showCancelButton: true,
            confirmButtonText: `${status === 'active' ? 'Block' : 'Active'}`,

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                Swal.fire("Saved!", "", "success");
            }
        });
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-semibold">Total Users: {usersLength.length}</h2>
                </div>
                <div className="">
                    <select className="select select-bordered max-w-xs">
                        <option disabled selected value=''>Filter</option>
                        <option value="active">Active</option>
                        <option value="block">Block</option>


                    </select>
                    <button className="btn bg-orange-600 text-white">Search</button>

                </div>
            </div>
            <div className="overflow-x-auto">

                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action Role</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>
                                    <img className="w-[45px] h-[45px] rounded-full" src={user.photoURL} alt="" />
                                </td>
                                <td>{user.name}</td>
                                <td className="flex flex-col">
                                    {user.email}
                                </td>
                                <td>
                                    {user.role}

                                </td>


                                <td className={` ${user.status === 'active' && 'text-green-600' || user.status === 'block' && 'text-red-600'} text-lg `}>
                                    <button onClick={() => handleStatusChange(user.status)}>
                                        {user.status}
                                    </button>
                                </td>



                                <td>
                                    <div className="w-full max-w-md px-4">
                                        <Field>

                                            <div className="relative">
                                                <Select
                                                    className={clsx(
                                                        'mt-3 block p-3 appearance-none rounded-lg border-none bg-gray-50  text-sm/6 text-black ',
                                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                                        // Make the text of each option black on Windows
                                                        '*:text-black'
                                                    )}
                                                >
                                                    <option selected disabled>{user.role}</option>
                                                    <option value="donar">donar</option>
                                                    <option value="volunteer">volunteer</option>
                                                    <option value="admin">admin</option>

                                                </Select>

                                            </div>
                                        </Field>
                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsersPage;