import { Outlet } from "react-router-dom";
import Sidebar from "../../Pages/Dashboard/Sidebar/Sidebar";
import { useState } from "react";
import { CgMenuGridR } from "react-icons/cg";

const Dashboard = () => {
    const [open, setOpen] = useState(false)

    console.log(open)

    return (
        <div className="flex lg:gap-10 ">
            <div className={`${open === true ? 'lg:hidden' : 'min-h-screen'}`}>
                <Sidebar open={open} setOpen={setOpen}></Sidebar>
            </div>
            {/* className={` ${open === true ? 'hidden' : 'my-8 flex-1 '} `}> */}
            <div className=' flex-1 '>
                <div className="flex justify-end">
                    <button onClick={() => setOpen(!open)} className="btn mt-5 mr-5 lg:hidden"><CgMenuGridR className="text-lg"></CgMenuGridR></button>
                </div>
                <div className={`${open === false ? 'hidden lg:block' : 'mt-5'}`}>
                    <Outlet></Outlet>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;