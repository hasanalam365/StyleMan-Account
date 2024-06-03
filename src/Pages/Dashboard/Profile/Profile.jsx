import { useForm } from "react-hook-form"
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import { useState } from 'react';



const Profile = () => {

    const { user } = useAuth()
    const [enableEditBtn, setEnableEditBtn] = useState(true)
    const axiosPublic = useAxiosPublic()

    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {


        console.log(data)
    }

    const { data = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data: userData } = await axiosPublic.get(`/user/${user?.email}`)
            return userData
        }
    })

    // console.log(data)
    // districts data fetch
    const { data: districts = [] } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/districts')
            return data
        }
    })

    //upazilas fetch data
    const { data: upazilas = [] } = useQuery({
        queryKey: ['upazilas'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/upazilas")
            return data
        }
    })



    return (


        <div className=" min-h-screen bg-base-200 ">


            <div className="w-3/4 mx-auto pt-10">

                <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
                    <div className='flex justify-end'>
                        <button onClick={() => { setEnableEditBtn(!enableEditBtn) }} className="btn btn-primary">Edit</button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="flex gap-5">
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>

                                <input type="text"
                                    {...register('name', { required: true })}

                                    placeholder={enableEditBtn && data?.name}

                                    name="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email"
                                    name="email"
                                    {...register('email', { required: true })}
                                    value={data?.email} className="input input-bordered" required />

                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="form-control">

                                <label className="form-control w-full my-6">
                                    <div className="label">
                                        <span className="label-text">Blood Group</span>

                                    </div>
                                    <select
                                        {...register('bloodGroup', { required: true })}
                                        className="select select-bordered w-full ">
                                        <option selected>{data?.bloodGroup}</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>

                                    </select>

                                </label>
                            </div>
                            <div className="form-control">

                                <label className="form-control w-full my-6">
                                    <div className="label">
                                        <span className="label-text">District</span>

                                    </div>
                                    <select
                                        {...register('district', { required: true })}
                                        className="select select-bordered w-full ">
                                        <option selected >{data?.district}</option>
                                        {
                                            districts.map(district => <option selected key={district.id} value={district.name}>{district.name}</option>)
                                        }


                                    </select>

                                </label>
                            </div>
                            <div className="form-control">

                                <label className="form-control w-full my-6">
                                    <div className="label">
                                        <span className="label-text">Upazila</span>

                                    </div>
                                    <select
                                        {...register('upazila', { required: true })}
                                        className="select select-bordered w-full ">
                                        <option selected >{data?.upazila}</option>
                                        {
                                            upazilas.map(upazila => <option selected key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                                        }


                                    </select>

                                </label>
                            </div>

                        </div>
                        <div className=" form-control p-4 border-2 border-[#E74C3C] flex items-center justify-center w-1/4">
                            <img className="w-[80px] h-[80px]" src={data?.photoURL} alt="" />


                        </div>
                        <input type="file" name="photo" id=""  {...register('photoURL', { required: true })} />
                        <div className="form-control mt-6">
                            {
                                !enableEditBtn && <button className="btn btn-secondary">Updated</button>
                            }
                        </div>
                    </form>

                </div>
            </div>
        </div>


    );
};

export default Profile;