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
            user && <NavLink to="/">Fundings</NavLink>

        }

    </>



    const handleLogOut = () => {
        signOutUser()
    }
    return (
        <div className="navbar justify-between bg-base-100 ">
            <Link to='/'>
                <a className="text-3xl font-semibold">Red<span className="text-red-600">Drop</span></a>
            </Link>
            <div className="flex gap-5 font-semibold">
                {navLinks}
            </div>
            <div className="flex-none gap-2">

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {user ? <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                :
                                <img alt="Tailwind CSS Navbar component" src="https://i.ibb.co/SrnSbVj/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo-thumbnail.png" />
                            }

                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

                        <li><a>Dashboard</a></li>

                        <li>
                            <button onClick={handleLogOut}><a>Logout</a></button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;