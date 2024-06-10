
import useAllUsers from "../../../../Hooks/useAllUsers";
import useRoleCheckFetch from "../../../../Hooks/useRoleCheckFetch";
import DonorDashboard from "../../DonorDashboard/DonorDashboard/DonorDashboard";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

const DashboardRole = () => {

    const [users] = useAllUsers()


    const [roleChecked] = useRoleCheckFetch()

    const isAdmin = roleChecked.role


    return (
        <div>

            {
                isAdmin === 'admin' || isAdmin === 'volunteer' ? <>
                    <AdminDashboard></AdminDashboard>
                </>
                    :
                    <DonorDashboard></DonorDashboard>

            }


        </div>
    );
};

export default DashboardRole;