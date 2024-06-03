import { Link, useLocation, useNavigate } from "react-router-dom";
import { Field, Label, Select } from '@headlessui/react'
import { FaAngleDown } from "react-icons/fa6";
import clsx from 'clsx'
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
// import axios from "axios";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOST_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const Register = () => {

    const { signUpUser, updateUser, signOutUser } = useAuth()

    const [districts = [], setDistricts] = useState()
    const [upazilas = [], setUpazilas] = useState()
    const [errorText, setErrorText] = useState()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const location = useLocation()


    // fetch Districts data
    useEffect(() => {
        fetch('districts.json')
            .then(res => res.json())
            .then(data => {
                setDistricts(data)
                // console.log(data)

            })
    }, [])


    // fetch Upazilas data
    useEffect(() => {
        fetch('upazilas.json')
            .then(res => res.json())
            .then(data => {
                setUpazilas(data)
                // console.log(data)

            })
    }, [])

    // console.log(upazilas)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.files;
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value

        if (password !== confirmPassword) {
            return setErrorText('Incorrect password')

        }

        //image upload
        const imageFile = { image: photo[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })


        //signUp User
        signUpUser(email, password)
            .then((result) => {

                if (result.user) {
                    toast.success("Registration Successfully!")
                }
                updateUser(name, res.data.data.display_url)
                    .then(() => {

                        signOutUser()
                        navigate('/login')
                    })

            })
            .catch(error => {
                console.log(error.message)
            })






        // console.log('imagefFIle', photo[0].name)



        // const submitForm = { name, email, photo, bloodGroup, district, upazila, password }
        // console.log(submitForm)

    }


    return (
        <div className=" min-h-screen bg-base-200">
            <div className=" flex-col ">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold py-8">Register now!</h1>

                </div>
                <div className="card shrink-0   shadow-2xl bg-base-100 h-max w-[400px] mx-auto">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" name='name' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type="file" placeholder="Photo" name='photo' className="" required />

                        </div>
                        {/* blood group */}

                        <div className="form-control">
                            <Field>
                                <Label className="label">Blood Group</Label>

                                <div className="relative">
                                    <Select name='bloodGroup'
                                        className={clsx(
                                            ' block w-full appearance-none rounded-lg border-none bg-gray-200 py-1.5 px-3 text-sm/6',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                            // Make the text of each option black on Windows
                                            '*:text-black'
                                        )}
                                    >
                                        <option value="APositive">A+</option>
                                        <option value="ANegative">A-</option>
                                        <option value="BPositive">B+</option>
                                        <option value="BNegative">B-</option>
                                        <option value="ABPositive">AB+</option>
                                        <option value="ABNegative">AB-</option>
                                        <option value="OPositive">O+</option>
                                        <option value="ONegative">O-</option>
                                    </Select>
                                    <FaAngleDown
                                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 "
                                        aria-hidden="true"
                                    />
                                </div>
                            </Field>
                        </div>

                        {/* districts */}
                        <div className="form-control">
                            <Field>
                                <Label className="label">Select District</Label>

                                <div className="relative">
                                    <Select name='district'
                                        className={clsx(
                                            ' block w-full appearance-none rounded-lg border-none bg-gray-200 py-1.5 px-3 text-sm/6',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                            // Make the text of each option black on Windows
                                            '*:text-black'
                                        )}
                                    >

                                        {
                                            districts.map(district => <option key={district.id} value={district.name}>{district.name}</option>)
                                        }


                                    </Select>
                                    <FaAngleDown
                                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 "
                                        aria-hidden="true"
                                    />
                                </div>
                            </Field>
                        </div>
                        {/* upazilas */}
                        <div className="form-control">
                            <Field>
                                <Label className="label">Select Upazila</Label>

                                <div className="relative">
                                    <Select name='upazila'
                                        className={clsx(
                                            ' block w-full appearance-none rounded-lg border-none bg-gray-200 py-1.5 px-3 text-sm/6',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                            // Make the text of each option black on Windows
                                            '*:text-black'
                                        )}
                                    >

                                        {
                                            upazilas.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                                        }


                                    </Select>
                                    <FaAngleDown
                                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 "
                                        aria-hidden="true"
                                    />
                                </div>
                            </Field>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered" required />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" placeholder="password" name='confirmPassword' className="input input-bordered" required />
                            <span className="text-red-600">{errorText}</span>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>

                        <div>
                            <h1>Already have an Account? Please <Link to="/login" className="text-green-600 font-semibold">Login</Link></h1>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;