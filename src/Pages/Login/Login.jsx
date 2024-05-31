import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
    return (
        <div className=" min-h-screen bg-base-200">
            <div className=" flex-col ">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold py-8">Login now!</h1>

                </div>
                <div className="card shrink-0   shadow-2xl bg-base-100 h-max w-[400px] mx-auto">
                    <form className="card-body">
                        <div className="form-control">
                            <span className="mb-2">Email</span>
                            <label className="input input-bordered flex items-center gap-2 ">
                                <MdOutlineMailOutline className="text-xl " />

                                <input type="text" className="grow" placeholder="email" />
                            </label>
                        </div>
                        <div className="form-control">
                            <span className="mb-2">Password</span>
                            <label className="input input-bordered flex items-center gap-2 ">
                                <RiLockPasswordLine className="text-xl" />

                                <input type="text" className="grow" placeholder="password" />
                            </label>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;