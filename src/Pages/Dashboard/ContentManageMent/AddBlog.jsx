import JoditEditor from 'jodit-react';
import { useRef, useState } from "react";
import { Helmet } from 'react-helmet-async';
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import { toast } from 'react-toastify';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOST_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const AddBlog = () => {

    // const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const editor = useRef(null)
    const [content, setContent] = useState('')

    const config = {
        placeholder: "Start typing...",
        readonly: false,
    }


    // console.log(content)
    const handleAddBlog = async (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value;
        const thumbnail = form.thumbnail.files;
        const blogContent = content
        const postDate = new Date().toLocaleString()
        console.log(title, thumbnail, blogContent, postDate)

        try {
            const imageFile = { image: thumbnail[0] }
            const resPhoto = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })


            const photoURL = resPhoto.data.data.display_url



            const blog = { title, blogContent, photoURL, postDate }

            const res = await axiosPublic.post('/addblog', blog)
            console.log(res.data)
            if (res.data.insertedId) {
                toast.success('blog added successfully')


            }
        }
        catch (error) {
            console.log(error.message)
        }

    }

    return (
        <div className="mt-10">
            <Helmet>
                <title>Dashboard | Add Blog</title>

            </Helmet>
            <div className="card shrink-0   shadow-2xl bg-base-100  mx-auto">


                <form onSubmit={handleAddBlog} className="card-body">
                    <div className="form-control">
                        <span className="mb-2  font-medium">Content Title</span>
                        <label className="input input-bordered flex items-center gap-2 ">
                            <input type="text" className="grow" name="title" placeholder="Title" />
                        </label>
                    </div>
                    <div className="form-control col-span-6 md:col-span-3 lg:col-span-3 ">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input type="file" name="thumbnail" id="" />

                    </div>

                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        onBlur={newContent => setContent(newContent)}
                        onChange={newContent => { }}
                    />
                    <div className="form-control mt-6">
                        <button className="btn btn-secondary">Create Blog</button>
                    </div>

                </form>

            </div>


        </div>
    );
};

export default AddBlog;