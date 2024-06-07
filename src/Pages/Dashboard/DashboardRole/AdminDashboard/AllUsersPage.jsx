
import useAllUsers from "../../../../Hooks/useAllUsers";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const AllUsersPage = () => {
    const [users, refetch] = useAllUsers()
    const usersLength = users.filter(user => user.role === 'donor')
    const axiosSecure = useAxiosSecure()


    const handleStatusChange = (user) => {


        Swal.fire({
            title: ` Do you want to change the Status?`,

            showCancelButton: true,
            confirmButtonText: `${user.status === 'active' ? 'Block' : 'Active'}`,

        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const updatedStatus = `${user.status === 'active' ? 'block' : 'active'}`

                const res = await axiosSecure.patch(`/statusUpdate/${user.email}`, { updatedStatus })
                if (res.data.modifiedCount) {
                    Swal.fire(`${user.status === 'active' ? 'Blocked' : 'Actived'}`, "", "success");
                    refetch()
                }

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


                                <td>
                                    <button onClick={() => handleStatusChange(user)} className={`btn ${user.status === 'active' && 'text-green-600' || user.status === 'block' && 'text-red-600'}`}>
                                        {user.status}
                                    </button>
                                </td>



                                <td>
                                    <div className="w-full max-w-md">
                                        <div className="">
                                            <select className="select select-bordered max-w-xs">
                                                <option disabled selected value=''>{user.role}</option>
                                                <option value="donor">donor</option>
                                                <option value="volunteer">volunteer</option>
                                                <option value="admin">admin</option>


                                            </select>


                                        </div>
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