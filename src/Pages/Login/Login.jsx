import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const { signInUser } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    //  (location)

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        //  (email, password)

        signInUser(email, password)
            .then((result) => {

                if (result?.user) {
                    toast("Login Successfully!")
                    navigate(location?.state || '/')
                }

            })
            .catch(() => {
                toast.error('invalid email or password')
            })
    }

    return (
        <div className=" min-h-screen bg-base-200">
            <div className=" flex-col ">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold py-8">Login now!</h1>

                </div>
                <div className="card shrink-0   shadow-2xl bg-base-100 h-max w-[400px] mx-auto">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <span className="mb-2">Email</span>
                            <label className="input input-bordered flex items-center gap-2 ">
                                <MdOutlineMailOutline className="text-xl " />

                                <input type="text" className="grow" name="email" placeholder="email" />
                            </label>
                        </div>
                        <div className="form-control">
                            <span className="mb-2">Password</span>
                            <label className="input input-bordered flex items-center gap-2 ">
                                <RiLockPasswordLine className="text-xl" />

                                <input type="password" className="grow"
                                    name="password" placeholder="password" />
                            </label>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div>
                            <h1>Don't have an Account? Please <Link to="/register" className="text-green-600 font-semibold">Register</Link></h1>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Login;