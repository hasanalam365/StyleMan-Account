
import { useQuery } from "@tanstack/react-query";
import useDataLoad from "../../Hooks/useDataLoad";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";

const SearchDonors = () => {
    const [, districts, upazilas] = useDataLoad()
    const axiosPublic = useAxiosPublic()

    const [bloodGroup, setBloodGroup] = useState('')
    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')




    console.log(bloodGroup.district, upazila)
    const { data: donarsAll = [], refetch } = useQuery({
        queryKey: ['all-donation-search'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/search-blood-donation-all', {
                params: { bloodGroup, district, upazila },
            })

            return data
        }
    })

    const handleSearchBlood = () => {



        refetch()

    }

    const hanldeBlood = e => {
        setBloodGroup(e.target.value)
    }
    const hanldeDistrict = e => {
        setDistrict(e.target.value)
    }
    const hanldeUpazila = e => {
        setUpazila(e.target.value)
    }

    return (
        <div className=" bg-base-200 min-h-screen p-16">
            <div className=" mx-auto ">
                <div className=" ">

                    <div className="card shrink-0 max-w-max mx-auto shadow-lg ">

                        <div className="flex gap-5 items-center justify-center">
                            <div className=" sm:col-span-2">
                                <select value={bloodGroup} onChange={hanldeBlood} name="bloodGroup" className="select select-success">
                                    <option>Choose a Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>

                                </select>
                            </div>
                            <div className="form-control">

                                <select value={district} onChange={hanldeDistrict} name="district" className="select select-success">

                                    <option selected disabled>Choose a District</option>

                                    {
                                        districts.map(district => <option key={district.id}>{district.name}</option>)
                                    }

                                </select>
                            </div>
                            <div className="form-control">

                                <select value={upazila} onChange={hanldeUpazila} name="upazila" className="select select-success">

                                    <option selected disabled>Choose a Upazila</option>
                                    {
                                        upazilas.map(upazila => <option key={upazila.id}>{upazila.name}</option>)
                                    }


                                </select>
                            </div>
                            <div className="form-control">
                                <button onClick={handleSearchBlood} className="btn btn-secondary">Search Blood</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            {
                donarsAll.length > 0 && <div className="overflow-x-auto mt-10">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className=" bg-orange-600 text-white">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Blood Group</th>
                                <th>District</th>
                                <th>Upazila</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                donarsAll.map((donar, idx) => <tr key={donar._id}>
                                    <th>{idx + 1}</th>
                                    <td>{donar.name}</td>
                                    <td>{donar.bloodGroup}</td>
                                    <td>{donar.district}</td>
                                    <td>{donar.upazila}</td>
                                    <td>{donar.email}</td>
                                </tr>)
                            }



                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default SearchDonors;