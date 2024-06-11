// import { Navigate, useLocation } from "react-router-dom";


// import { DNA } from "react-loader-spinner";
// import useAuth from "../../../Hooks/useAuth";
// // import useAdminVolunteer from "../../../Hooks/useAdminVolunteer";
// import useAdmin from "../../../Hooks/useAdmin";


// const AdminAndVolunRoute = ({ children }) => {
//     const { user, loading, signOutUser } = useAuth()
//     // const [isAdminOrVolun, isPending] = useAdminVolunteer()
//     // const [isAdmin, isPending] = useAdmin()
//     const location = useLocation()


//     if (loading || isPending) {
//         return <div className="mt-40 ml-40 md:mt-48 md:ml-[350px] lg:mt-52 lg:ml-[500px]">
//             <DNA
//                 visible={true}
//                 height="80"
//                 width="80"
//                 ariaLabel="dna-loading"
//                 wrapperStyle={{}}
//                 wrapperClass="dna-wrapper"
//             />
//         </div>
//     }
//     if (user && isAdminOrVolun) {
//         return children;
//     }

//     if (!isAdminOrVolun) {
//         signOutUser()
//     }

//     return <Navigate to='/login' state={location?.pathname || '/'}></Navigate>
// };

// export default AdminAndVolunRoute;