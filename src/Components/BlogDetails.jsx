
import { useLoaderData } from 'react-router-dom';

const BlogDetails = () => {

    const blogDetail = useLoaderData()

    return (
        <div>
            <h1>{blogDetail._id}</h1>
        </div>
    );
};

export default BlogDetails;