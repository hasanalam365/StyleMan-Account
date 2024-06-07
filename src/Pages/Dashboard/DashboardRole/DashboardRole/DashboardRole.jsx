
import useAllUsers from "../../../../Hooks/useAllUsers";
import DonorDashboard from "../../DonorDashboard/DonorDashboard/DonorDashboard";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

const DashboardRole = () => {

    const [users] = useAllUsers()
    console.log(users)

    const isAdmin = true

    return (
        <div>

            {
                isAdmin ? <>
                    <AdminDashboard></AdminDashboard>
                </> : <DonorDashboard></DonorDashboard>
            }


        </div>
    );
};

export default DashboardRole;