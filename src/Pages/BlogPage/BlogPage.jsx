import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Markdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import { FaRegClock } from "react-icons/fa";


const BlogPage = () => {

    const axiosPublic = useAxiosPublic()

    const { data: blogs = [] } = useQuery({
        queryKey: ['blogPost'],
        queryFn: async () => {
            const res = await axiosPublic.get('/addblog')
            return res.data
        }
    })

    console.log(blogs)

    return (
        <div>
            {/* Left side blog */}
            {
                blogs.map(blog => <div key={blog._id} className="w-3/4 mt-10 mb-10 p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">

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
                                <button className="text-red-500 font-medium mt-5">Read More....</button>

                            </p>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default BlogPage;