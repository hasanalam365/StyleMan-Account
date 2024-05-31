import { NavLink } from "react-router-dom";

const Navbar = () => {

    const navLinks = <>
        <NavLink>Donation Requests</NavLink>
        <NavLink>Blog</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>

    </>

    return (
        <div className="navbar justify-between bg-base-100 ">
            <div className="">
                <a className="text-xl font-semibold">Red<span className="text-red-600">Drop</span></a>
            </div>
            <div className="flex gap-5 font-semibold">
                {navLinks}
            </div>
            <div className="flex-none gap-2">

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

                        <li><a>Dashboard</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;