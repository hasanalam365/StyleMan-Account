import { Link, useLocation, useNavigate } from "react-router-dom";
import { Field, Label, Select } from '@headlessui/react';
import { FaAngleDown } from "react-icons/fa6";
import clsx from 'clsx';
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOST_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { signUpUser, updateUser, signOutUser } = useAuth();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [errorText, setErrorText] = useState('');
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();

    // fetch Districts and Upazilas data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [districtRes, upazilaRes] = await Promise.all([
                    fetch('districts.json'),
                    fetch('upazilas.json')
                ]);
                const [districtData, upazilaData] = await Promise.all([
                    districtRes.json(),
                    upazilaRes.json()
                ]);
                setDistricts(districtData);
                setUpazilas(upazilaData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.files[0];
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const status = "active";
        const role = "donor";

        if (password !== confirmPassword) {
            setErrorText(`Passwords doesn't match`);
            return;
        }

        try {
            // Image upload
            const formData = new FormData();
            formData.append('image', photo);
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const photoURL = res.data.data.display_url;

            const submitForm = { name, email, photoURL, bloodGroup, district, upazila, status, role };

            await signUpUser(email, password);
            await updateUser(name, photoURL);
            await signOutUser();
            navigate('/login');
            const response = await axiosPublic.put(`/usercreate/${submitForm.email}`, submitForm);

            if (response.data.insertedId) {
                toast.success('Registration Successfully');
                navigate(location?.state || '/');
            }
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
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="file" placeholder="Photo" name='photo' className="bg-gray-50 p-1" required />
                            </div>
                            <div className="form-control col-span-6 md:col-span-3 lg:col-span-3">
                                <Field>
                                    <Label className="label">Blood Group</Label>
                                    <div className="relative">
                                        <Select name='bloodGroup'
                                            className={clsx(
                                                'block w-full appearance-none rounded-lg border-none bg-gray-200 py-1.5 px-3 text-sm/6',
                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                                '*:text-black'
                                            )}
                                        >
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </Select>
                                        <FaAngleDown
                                            className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </Field>
                            </div>
                            <div className="form-control col-span-6 md:col-span-3 lg:col-span-3">
                                <Field>
                                    <Label className="label">Select District</Label>
                                    <div className="relative">
                                        <Select name='district'
                                            className={clsx(
                                                'block w-full appearance-none rounded-lg border-none bg-gray-200 py-1.5 px-3 text-sm/6',
                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                                '*:text-black'
                                            )}
                                        >
                                            {districts.map(district => (
                                                <option key={district.id} value={district.name}>{district.name}</option>
                                            ))}
                                        </Select>
                                        <FaAngleDown
                                            className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </Field>
                            </div>
                            <div className="form-control col-span-6 md:col-span-3 lg:col-span-3">
                                <Field>
                                    <Label className="label">Select Upazila</Label>
                                    <div className="relative">
                                        <Select name='upazila'
                                            className={clsx(
                                                'block w-full appearance-none rounded-lg border-none bg-gray-200 py-1.5 px-3 text-sm/6',
                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                                '*:text-black'
                                            )}
                                        >
                                            {upazilas.map(upazila => (
                                                <option key={upazila.id} value={upazila.name}>{upazila.name}</option>
                                            ))}
                                        </Select>
                                        <FaAngleDown
                                            className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </Field>
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
