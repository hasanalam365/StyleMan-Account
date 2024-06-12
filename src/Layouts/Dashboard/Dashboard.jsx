import { Outlet } from "react-router-dom";
import Sidebar from "../../Pages/Dashboard/Sidebar/Sidebar";
import { useState } from "react";
import { Helmet } from "react-helmet-async";


const Dashboard = () => {

    const [isActive, setActive] = useState(false)

    return (

        <div className="">
            <Helmet>
                <title>Dashboard</title>

            </Helmet>
            <Sidebar isActive={isActive} setActive={setActive}></Sidebar>
            <div className="md:ml-64 lg:ml-64">
                <Outlet></Outlet>
            </div>
        </div >
    );
};

export default Dashboard;