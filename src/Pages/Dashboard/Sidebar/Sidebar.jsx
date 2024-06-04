import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { GrLogout } from "react-icons/gr";
import useAuth from "../../../Hooks/useAuth";
import { HashLoader } from "react-spinners";
import { FaHome } from "react-icons/fa";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {

    // const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    // const { data = [] } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const { data: userData } = await axiosPublic.get(`/user/${user?.email}`)
    //         return userData
    //     }
    // })
    // console.log(data)

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
            <div className="divide-y dark:divide-gray-300">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
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
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                            <GrLogout className="text-xl"></GrLogout>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;