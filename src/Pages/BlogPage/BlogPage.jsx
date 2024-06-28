import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Markdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import { FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";


const BlogPage = () => {

    const axiosPublic = useAxiosPublic()

    const { data: blogs = [] } = useQuery({
        queryKey: ['blogPost'],
        queryFn: async () => {
            const res = await axiosPublic.get('/addblog')
            return res.data
        }
    })



    return (
        <div className="flex gap-5 flex-col-reverse lg:flex-row mt-10 mb-10 p-4">
            <div className="w-full lg:w-3/4">
                {/* Left side blog */}
                {
                    blogs.map(blog => <div key={blog._id} className="  shadow-md dark:bg-gray-50 dark:text-gray-800">

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <img src={blog.photoURL} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                                <div className="flex items-center ">
                                    <span className="text-red-600 flex gap-2 items-center justify-center"><FaRegClock className="text-lg " />{blog.postDate}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <a rel="noopener noreferrer" href="#" className="block">
                                    <h3 className="text-xl font-semibold dark:text-violet-600">Facere ipsa nulla corrupti praesentium pariatur architecto</h3>
                                </a>
                                <p className="leading-snug dark:text-gray-600">
                                    <Markdown rehypePlugins={[rehypeRaw]}>
                                        {blog.blogContent.slice(0, 200)}
                                    </Markdown>
                                    {/* <Link to={`/blog/${blog._id}`}> */}
                                    <button className="text-red-500 font-medium mt-5">Read More....</button>
                                    {/* </Link> */}

                                </p>
                            </div>
                        </div>
                    </div>)
                }
            </div>

            {/* right side  */}
            <div className="w-full lg:w-1/4 border-2  p-4">
                <div className="join">
                    <input
                        type="text"
                        placeholder="search blog"
                        className="input input-bordered join-item" />
                    <button className="btn btn-primary join-item">Search</button>
                </div>
                <ul className="mt-5 list-disc p-4">
                    <li className="text-lg  font-medium  hover:text-orange-500 ">All Blogs</li>
                    <li className="text-lg  font-medium hover:text-orange-500">Popular Blogs</li>
                    <li className="text-lg  font-medium hover:text-orange-500">Latest Blogs</li>

                </ul>
            </div>
        </div>
    );
};

export default BlogPage;