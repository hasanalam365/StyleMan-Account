
import useRoleCheckFetch from "../../../../Hooks/useRoleCheckFetch";
import DonorDashboard from "../../DonorDashboard/DonorDashboard/DonorDashboard";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

const DashboardRole = () => {




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