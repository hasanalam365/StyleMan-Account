import { Outlet } from "react-router-dom";
import Sidebar from "../../Pages/Dashboard/Sidebar/Sidebar";
import { useState } from "react";


const Dashboard = () => {

    const [isActive, setActive] = useState(false)

    return (

        <div className="">

            <Sidebar isActive={isActive} setActive={setActive}></Sidebar>

            <div className="md:ml-64 lg:ml-64">
                {isActive && <Outlet></Outlet>}
            </div>
        </div >
    );
};

export default Dashboard;