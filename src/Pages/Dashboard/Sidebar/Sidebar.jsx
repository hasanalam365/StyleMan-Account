
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { BiDonateBlood } from "react-icons/bi";
import { MdBloodtype } from "react-icons/md";
import { MdLocalLaundryService } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";

const Sidebar = ({ isActive, setActive }) => {

    const { user, signOutUser } = useAuth()
    const navigate = useNavigate()
    // const [roleChecked] = useRoleCheckFetch()

    // const isVolunteer = roleChecked.role


    // const [isAdmin] = useAdmin()

    console.log(isActive)

    const handleLogOut = () => {
        signOutUser()
        navigate("/")
    }
    const handleToggle = () => {
        setActive(!isActive)
    }

    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>

                            <h2 className="w-100 text-xl">
                                Red<span className="text-red-600">Drop</span>
                            </h2>

                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex py-1 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
                            <Link to='/'>
                                <img
                                    // className='hidden md:block'
                                    src='https://i.ibb.co/vJVfyQQ/a12-logo-red-drop-removebg-preview.png'
                                    alt='logo'
                                    width='50'
                                    height='20'
                                />
                            </Link>
                            <h3 className="text-2xl font-semibold">Red<span className="text-red-600">Drop</span></h3>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>

                        <nav>
                            {/* Dashboard */}
                            <NavLink
                                onClick={() => setActive(true)}
                                to='/dashboard'
                                end
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                    }`
                                }
                            >

                                <BiSolidDashboard className='w-5 h-5' />

                                <span className='mx-4 font-medium'>Dashboard</span>
                            </NavLink>

                            {/* create blood request  */}
                            <NavLink
                                onClick={() => setActive(true)}
                                to='/dashboard/create-donation-request'
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                    }`
                                }
                            >
                                <MdBloodtype className='w-5 h-5' />

                                <span className='mx-4 font-medium'>Create Donar Request</span>
                            </NavLink>
                            {/* My Donation Request */}
                            <NavLink
                                onClick={() => setActive(true)}
                                to='/dashboard/my-donation-requests'
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                    }`
                                }
                            >
                                <BiDonateBlood className='w-5 h-5' />

                                <span className='mx-4 font-medium'>My Donation Request</span>
                            </NavLink>
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />
                    {/* admin only */}
                    {/* All User Menu */}
                    <NavLink
                        onClick={() => setActive(true)}
                        to='/dashboard/all-users'
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                            }`
                        }
                    >
                        <FaUsers className='w-5 h-5' />

                        <span className='mx-4 font-medium'>All Users</span>
                    </NavLink>
                    <NavLink
                        onClick={() => setActive(true)}
                        to='/dashboard/all-blood-donation-request'
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                            }`
                        }
                    >
                        <MdLocalLaundryService className='w-5 h-5' />

                        <span className='mx-4 font-medium'>All Donation Requests</span>
                    </NavLink>

                </div>
                <div>
                    <hr />

                    {/* Profile Menu */}
                    <NavLink
                        onClick={() => setActive(true)}
                        to='/dashboard/profile'
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                            }`
                        }
                    >
                        <RiShieldUserLine className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Profile</span>
                    </NavLink>
                    <button
                        onClick={handleLogOut}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>


    );
};

export default Sidebar;