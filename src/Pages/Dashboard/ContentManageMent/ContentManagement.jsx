import { Link } from "react-router-dom";

const ContentManagement = () => {
    return (
        <div className="flex justify-end mt-5 mr-5">
            <Link to="/dashboard/content-management/add-blog">
                <button className="btn btn-ghost">Add Blog</button>
            </Link>
        </div>
    );
};

export default ContentManagement;