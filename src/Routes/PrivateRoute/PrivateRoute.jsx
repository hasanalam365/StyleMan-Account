import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { DNA } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const location = useLocation()



    if (loading) {
        return <div className="mt-40 ml-40 md:mt-48 md:ml-[350px] lg:mt-52 lg:ml-[500px]">
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    }
    if (user) {
        return children;
    }

    return <Navigate to='/login' state={location?.pathname || '/'}></Navigate>
};

export default PrivateRoute;