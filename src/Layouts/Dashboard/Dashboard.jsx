import { Outlet } from "react-router-dom";
import Sidebar from "../../Pages/Dashboard/Sidebar/Sidebar";
import { useState } from "react";

const Dashboard = () => {
    const [open, setOpen] = useState(false)



    return (
        <div className="flex gap-10 ">
            <div className="min-h-screen">
                <Sidebar open={open} setOpen={setOpen}></Sidebar>
            </div>
            {/* className={` ${open === true ? 'hidden' : 'my-8 flex-1 '} `}> */}
            <div className='my-8 flex-1 '>
                <Outlet></Outlet>

            </div>

        </div>
    );
};

export default Dashboard;