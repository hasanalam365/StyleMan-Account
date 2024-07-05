import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)
    console.log(isOpen)
    const { user, signOutUser } = useAuth()
    const navigate = useNavigate()

    const navLinks = <>
        <NavLink to="/" className='hover:text-orange-600' onClick={() => setIsOpen(false)}>Home</NavLink>
        <NavLink to="/donarRequests" className='hover:text-orange-600' onClick={() => setIsOpen(false)}>Donation Requests</NavLink>
        <NavLink to="/blog" className='hover:text-orange-600' onClick={() => setIsOpen(false)}>Blog</NavLink>

        {
            user && <NavLink to="/fundings" className='hover:text-orange-600' onClick={() => setIsOpen(false)}>Fundings</NavLink>

        }
        {
            !user && <NavLink to="/login" className='hover:text-orange-600' onClick={() => setIsOpen(false)}>Login</NavLink>

        }

    </>



    const handleLogOut = () => {
        signOutUser()
        navigate('/login')
    }


    return (
        <div className=" bg-base-100 flex justify-between  items-center fixed z-10 container mx-auto shadow-lg h-16 lg:p-2">
            <div className="">
                <div className="dropdown">
                    <button onClick={() => setIsOpen(!isOpen)} tabIndex={0} role="button" className="btn btn-ghost lg:hidden ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </button>
                    {
                        isOpen && <ul tabIndex={0} className="flex flex-col gap-2  lg:hidden absolute top-12 bg-gray-100 p-4 w-[425px] md:w-[800px] font-medium transition-all duration-500 ">
                            {navLinks}
                        </ul>
                    }

                </div>
                <a className="text-2xl font-semibold">Red<span className="text-red-600">Drop</span></a>
            </div>
            <div className="justify-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 flex gap-5 font-semibold">
                    {navLinks}
                </ul>
            </div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full mr-2">
                        {user ? <img alt="" src={user?.photoURL} />
                            :
                            <img src="https://i.ibb.co/SrnSbVj/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo-thumbnail.png" />
                        }

                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

                    <li>
                        <Link to="/dashboard">
                            <a>Dashboard</a></Link>
                    </li>

                    {
                        user ? <li>
                            <button onClick={handleLogOut}><a>Logout</a></button>
                        </li> : <li>
                            <Link to="/login">
                                <button><a>Log In</a></button>
                            </Link>
                        </li>
                    }
                </ul>
            </div>
        </div>

    );
};


export default Navbar;