import { LuLayoutDashboard } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { GrLogout, GrUserAdmin } from "react-icons/gr";
import useAuth from "../../../Hooks/useAuth";
import { HashLoader } from "react-spinners";
import { FaHome } from "react-icons/fa";
import { GiGroupedDrops } from "react-icons/gi";
import { LuHelpingHand } from "react-icons/lu";
import { FaUsersGear } from "react-icons/fa6";
import useRoleCheckFetch from "../../../Hooks/useRoleCheckFetch";
// import useAllUsers from "../../../Hooks/useAllUsers";


const Sidebar = () => {

    const { user, signOutUser } = useAuth()
    const navigate = useNavigate()
    const [roleChecked] = useRoleCheckFetch()

    const isAdmin = roleChecked.role

    // const isAdmin2 = roleChecked.role
    // console.log(isAdmin2)


    const handleLogOut = () => {
        signOutUser()
        navigate("/")
    }

    return (
        <div className="h-full p-3 space-y-2 w-72 dark:bg-gray-50 dark:text-gray-800">
            <div className="flex items-center p-2 space-x-4">
                {
                    !user ? <HashLoader color="#36d7b7" /> : <> <img src={user?.photoURL} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />

                        <div>

                            <h2 className="text-lg font-semibold">{user?.displayName}</h2>
                            <p>{user?.email}</p>

                        </div></>
                }
            </div>
            <div className="">
                <ul className="pt-2 pb-4 space-y-1 text-sm  ">
                    <li className="dark:bg-gray-100 dark:text-gray-900">
                        <a className="flex items-center p-2 space-x-3 rounded-md">
                            <FaHome className="text-xl"></FaHome>
                            <Link to="/"> <span>Home</span></Link>
                        </a>
                    </li>

                </ul>
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="dark:bg-gray-100 dark:text-gray-900">
                        <a className="flex items-center p-2 space-x-3 rounded-md">
                            <LuLayoutDashboard className="text-xl"></LuLayoutDashboard>
                            <Link to="/dashboard"> <span>Dashboard</span></Link>
                        </a>
                    </li>

                </ul>
                <div className="divider"></div>

                {/* admin dashboard */}
                {
                    isAdmin === 'admin' && <>
                        <ul className="pt-2 pb-4 space-y-1 text-sm  ">
                            <li className="dark:bg-gray-100 dark:text-gray-900">
                                <a className="flex items-center p-2 space-x-3 rounded-md">
                                    <FaUsersGear className="text-xl"></FaUsersGear >
                                    <Link to="/dashboard/all-users"> <span>All Users</span></Link>
                                </a>
                            </li>


                        </ul>
                        <ul className="pt-2 pb-4 space-y-1 text-sm  ">
                            <li className="dark:bg-gray-100 dark:text-gray-900">
                                <a className="flex items-center p-2 space-x-3 rounded-md">
                                    <GiGroupedDrops className="text-xl"></GiGroupedDrops >
                                    <Link to="/dashboard/all-blood-donation-request"> <span>All Donation Requests</span></Link>
                                </a>
                            </li>
                            <div className="divider"></div>

                        </ul>
                    </>
                }
                {/* volunteer  */}
                {
                    isAdmin === 'volunteer' && <ul className="pt-2 pb-4 space-y-1 text-sm  ">
                        <li className="dark:bg-gray-100 dark:text-gray-900">
                            <a className="flex items-center p-2 space-x-3 rounded-md">
                                <GiGroupedDrops className="text-xl"></GiGroupedDrops >
                                <Link to="/dashboard/all-blood-donation-request"> <span>All Donation Requests</span></Link>
                            </a>
                        </li>
                        <div className="divider"></div>

                    </ul>
                }

                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="dark:bg-gray-100 dark:text-gray-900">
                        <a className="flex items-center p-2 space-x-3 rounded-md">
                            <LuHelpingHand className="text-xl"></LuHelpingHand>
                            <Link to="/dashboard/create-donation-request"> <span>Create Request</span></Link>
                        </a>
                    </li>

                </ul>
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="dark:bg-gray-100 dark:text-gray-900">
                        <a className="flex items-center p-2 space-x-3 rounded-md">
                            <LuHelpingHand className="text-xl"></LuHelpingHand>
                            <Link to="/dashboard/my-donation-requests"> <span>My Donation Request</span></Link>
                        </a>
                    </li>

                </ul>
                <div className="divider"></div>
            </div>
            <div>
                <ul className="pt-4 pb-2 space-y-1 text-sm">
                    <li>
                        <a className="flex items-center p-2 space-x-3 rounded-md">
                            <CgProfile className="text-xl"></CgProfile>
                            <Link to="/dashboard/profile">
                                <span>Profile</span>
                            </Link>
                        </a>
                    </li>
                    <li>
                        <button onClick={handleLogOut} className="flex items-center p-2 space-x-3 rounded-md">
                            <GrLogout className="text-xl"></GrLogout>
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;