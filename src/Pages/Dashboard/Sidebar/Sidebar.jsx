
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { LuHelpingHand } from "react-icons/lu";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { MdHomeWork } from "react-icons/md";
import { BsFillHouseAddFill, BsGraphUp } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { BiDonateBlood } from "react-icons/bi";
import { MdBloodtype } from "react-icons/md";
import { MdLocalLaundryService } from "react-icons/md";

const Sidebar = ({ isActive, setActive }) => {

    const { user, signOutUser } = useAuth()
    // const navigate = useNavigate()
    // const [roleChecked] = useRoleCheckFetch()

    // const isVolunteer = roleChecked.role


    // const [isAdmin] = useAdmin()

    console.log(isActive)

    const handleLogOut = () => {
        signOutUser()
        // navigate("/")
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
                            <img
                                // className='hidden md:block'
                                src='https://i.ibb.co/4ZXzmq5/logo.png'
                                alt='logo'
                                width='100'
                                height='100'
                            />
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
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
                            <Link to='/'>
                                <img
                                    // className='hidden md:block'
                                    src='https://i.ibb.co/4ZXzmq5/logo.png'
                                    alt='logo'
                                    width='100'
                                    height='100'
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>

                        <nav>
                            {/* Dashboard */}
                            <NavLink
                                onClick={() => setActive(true)}
                                to='/dashboard'
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
                    <button
                        onClick={() => setActive(true)}
                        to="/dashboard/all-blood-donation-request"
                        className='flex w-full items-center ml-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <MdLocalLaundryService className='w-5 h-5' />

                        <span className='mx-4 font-medium'>All Donation Requests</span>
                    </button>
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
                        <FcSettings className='w-5 h-5' />

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