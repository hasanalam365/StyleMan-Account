import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isAdmin, isPending] = useAdmin()
    const location = useLocation()

    if (loading || isPending) {
        return <span className="loading loading-spinner text-secondary"></span>
    }
    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/login' state={location?.pathname || '/'}></Navigate>
};

export default AdminRoute;