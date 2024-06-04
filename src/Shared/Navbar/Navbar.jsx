import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const Navbar = () => {

    const { user, signOutUser } = useAuth()
    // console.log(user)

    const navLinks = <>
        <NavLink to="/">Home</NavLink>
        <NavLink>Donation Requests</NavLink>
        <NavLink>Blog</NavLink>
        <NavLink to="/login">Login</NavLink>
        {
            user && <NavLink to="/fundings">Fundings</NavLink>

        }

    </>



    const handleLogOut = () => {
        signOutUser()
    }
    return (
        <div className=" bg-base-100 flex justify-between p-2 items-center">
            <div className="">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 flex gap-1 font-semibold">
                        {navLinks}
                    </ul>
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
                    <div className="w-10 rounded-full">
                        {user ? <img alt="" src={user.photoURL} />
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

                    <li>
                        <button onClick={handleLogOut}><a>Logout</a></button>
                    </li>
                </ul>
            </div>
        </div>

    );
};


export default Navbar;