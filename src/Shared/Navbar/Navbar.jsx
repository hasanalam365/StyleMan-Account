import { Link, NavLink } from "react-router-dom";

import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";

import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";



const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)
   

    const navLinks = <>
        <NavLink to="/" className='hover:text-orange-600 flex items-center  gap-1' onClick={() => setIsOpen(false)}> <span> <AiOutlineHome /></span> ড্যাশবোর্ড </NavLink>
        <NavLink to="/dailyIncome" className='hover:text-orange-600 flex items-center  gap-1' onClick={() => setIsOpen(false)}><span><FaPlus /> </span> দৈনিক আয় </NavLink>
        <NavLink to="/dailyExpense" className='hover:text-orange-600 flex items-center  gap-1' onClick={() => setIsOpen(false)}>  <span>  <FiMinus /> </span>  দৈনিক খরচ  </NavLink>

        <NavLink to="/monthlyIncome" className='hover:text-orange-600 flex items-center  gap-1' onClick={() => setIsOpen(false)}> <span>   <IoIosTrendingUp /> </span>মাসিক আয়</NavLink>
        <NavLink to="/monthlyExpense" className='hover:text-orange-600 flex items-center  gap-1' onClick={() => setIsOpen(false)}> <span>  <IoIosTrendingDown /> </span>মাসিক খরচ</NavLink>
        <NavLink to="/un-paid-income" className='hover:text-orange-600 flex items-center  gap-1' onClick={() => setIsOpen(false)}> <span>  <IoIosTrendingDown /> </span>বকেয়া হিসাব</NavLink>



    </>



    return (
        <div className=" bg-base-100 flex justify-between  items-center fixed z-10 container mx-auto shadow-lg h-16 lg:p-2">
            <div className="">
                <div className="dropdown">
                    <button onClick={() => setIsOpen(!isOpen)} tabIndex={0} role="button" className="btn btn-ghost lg:hidden ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </button>
                    {
                        isOpen && <ul tabIndex={0} className="flex flex-col gap-4  lg:hidden absolute top-12 bg-gray-100 p-4 w-[425px] md:w-[800px] font-medium transition-all duration-500 ">
                            {navLinks}
                        </ul>
                    }

                </div>
                <a className="text-2xl font-semibold">স্টাইল<span className="text-red-600">ম্যান</span></a>
            </div>
            <div className="justify-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 flex gap-5 ">
                    {navLinks}
                </ul>
            </div>
           
        </div>

    );
};


export default Navbar;