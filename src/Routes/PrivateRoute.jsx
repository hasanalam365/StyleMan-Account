import { Navigate, useLocation } from "react-router-dom";
// import useAuth from "../../Hooks/useAuth";
import useAuth from "../hooks/useAuth"
import { ScaleLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const location = useLocation()
 if (loading) return <p className="flex justify-center items-center h-screen">  <ScaleLoader color="#36d7b7" /></p>;
   
    if (user) {
        return children;
    }

    return <Navigate to='/login' state={location?.pathname || '/'}></Navigate>
};

export default PrivateRoute;