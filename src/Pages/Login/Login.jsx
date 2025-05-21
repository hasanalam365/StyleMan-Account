import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";

const Login = () => {

    const { signInUser } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value


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


        <div className=" min-h-screen">
            <Helmet>
                <title>Home | Login</title>

            </Helmet>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://i.ibb.co/2Zyjy9P/3093594-34889.jpg)",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content ">
                    <div className=" flex-col ">
                        <div className="text-center ">
                            <h1 className="text-5xl text-white font-bold ">Login now!</h1>

                        </div>
                        <div className="card shrink-0   shadow-2xl-max w-[350px] md:w-[400px] lg:w-[400px] mx-auto">
                            <form onSubmit={handleLogin} className="card-body">
                                <div className="form-control">
                                    <span className="mb-2">Email</span>
                                    <label className="input input-bordered flex items-center gap-2 ">
                                        <MdOutlineMailOutline className="text-xl " />

                                        <input type="email" className="grow" name="email" placeholder="email" />
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
                                        <a href="#" className="label-text-alt text-white link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-3">
                                    <button className="btn bg-red-600 text-white text-xl">Login</button>
                                </div>
                                <div>
                                    <h1 className="text-white">Don't have an Account? Please <Link to="/register" className="text-white font-bold">Register</Link></h1>
                                </div>
                            </form>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Login;