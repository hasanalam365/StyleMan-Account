import JoditEditor from 'jodit-react';
import { useMemo, useRef, useState } from "react";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOST_KEY
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const AddBlog = () => {

    // const axiosSecure = useAxiosSecure()


    // const editor = useRef(null)
    // const [content, setContent] = useState('')

    // const config = useMemo(() => ({
    //     readonly: false,
    //     placeholder: placeholder || 'Start typings...'
    // }),
    //     [placeholder]
    // );




    const handleAddBlog = (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value;
        const thumbnail = form.thumbnail.files;

        // console.log(title, thumbnail)
        //image upload
        // const imageFile = { image: thumbnail[0] }
        // const res = await axiosSecure.post(image_hosting_api, imageFile, {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // })

        // const photoURL = res.data.data.display_url

    }

    return (
        <div className="mt-10">
            <div className="card shrink-0   shadow-2xl bg-base-100 h-max w-[400px] mx-auto">
                <form onClick={handleAddBlog} className="card-body">
                    <div className="form-control">
                        <span className="mb-2  font-medium">Content Title</span>
                        <label className="input input-bordered flex items-center gap-2 ">
                            <input type="text" className="grow" name="title" placeholder="Title" />
                        </label>
                    </div>
                    <div className="form-control col-span-6 md:col-span-3 lg:col-span-3 ">
                        <label className="label">
                            <span className="label-text  font-medium">Thumbnail</span>
                        </label>
                        <input type="file" placeholder="thumbnail" name='thumbnail' className="bg-gray-50 p-1" required />

                    </div>
                    {/* <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => { }}
                    /> */}
                    <div className="form-control mt-6">
                        <button className="btn btn-secondary">Create Blog</button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default AddBlog;