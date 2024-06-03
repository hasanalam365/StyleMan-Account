import { Outlet } from "react-router-dom";
import Sidebar from "../../Pages/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
    return (
        <div className="flex gap-10">
            <div className="bg-gray-100 min-h-screen">
                <Sidebar></Sidebar>
            </div>
            <div className="my-8 flex-1">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;