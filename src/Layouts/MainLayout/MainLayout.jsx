import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div className="container mx-auto bg-[#f3f4f7]">

            <div className="h-16">
                <Navbar></Navbar>
            </div>
            <div className="min-h-[calc(100vh-204px)]">
                <Outlet></Outlet>
            </div>
           
        </div>
    );
};

export default MainLayout;