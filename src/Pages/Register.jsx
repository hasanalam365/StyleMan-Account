import { Link, useLocation, useNavigate } from "react-router-dom";

import {  useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";


const Register = () => {
    const { signUpUser, signOutUser } = useAuth();
 
    const [errorText, setErrorText] = useState('');
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
      
        const email = form.email.value;
      
    
       
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
     

        if (password !== confirmPassword) {
            setErrorText(`Passwords doesn't match`);
            return;
        }

        try {
            // Image upload
            

         

            await signUpUser(email, password);
          
            toast.success('Registration Successfully');
                navigate(location?.state || '/');
            navigate('/login');
            
        } catch (error) {
            console.error(error.message);
            setErrorText('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row  p-12 mb-10">
            <div className="flex-1">
                <img className="h-full" src="https://i.ibb.co/R3qskPP/edit-restration-web-2.jpg" alt="" />
            </div>
            <div className="h-full   flex-1 bg-gradient-to-r from-red-400 via-red-500 to-red-700">
                <Helmet>
                    <title>Home | Register</title>
                </Helmet>
                <div className="flex-col">
                    <div className="text-center">
                        <h1 className="text-3xl lg:text-5xl font-bold mt-5 text-white">Register now!</h1>
                    </div>
                    <div className="card shrink-0  w-[90%] mx-auto">
                        <form onSubmit={handleSubmit} className="card-body grid grid-cols-6">
                            <div className="form-control col-span-6 md:col-span-3 lg:col-span-3">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" name='name' className="input input-bordered" required />
                            </div>
                            <div className="form-control col-span-6 md:col-span-3 lg:col-span-3">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                            </div>
                         
                      
                            
                            <div className="form-control col-span-6 md:col-span-3 lg:col-span-3">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                            </div>
                            <div className="form-control col-span-6 md:col-span-3 lg:col-span-3">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" placeholder="password" name='confirmPassword' className="input input-bordered" required />
                                <span className="text-white">{errorText}</span>
                            </div>
                            <div className="form-control mt-6 col-span-6">
                                <button className="btn btn-secondary">Register</button>
                            </div>
                        </form>
                        <div className="p-4 text-center">
                            <h1 className="text-xl">Already have an Account? Please <Link to="/login" className="text-white font-bold">Login</Link></h1>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Register;
