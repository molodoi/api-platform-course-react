import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
    const [navbar, setNavbar] = useState(false);
    return (
        <>
            <nav className="bg-slate-100 shadow-sm shadow-gray-300 w-100 px-8 md:px-auto">
                <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                    <NavLink to="/" className="text-indigo-500 hover:bg-indigo-600 order-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                    </NavLink>
                    <div className="grid grid-flow-col gap-2 order-2 ">
                        <NavLink to="/login" className="px-3 md:px-4 py-2  bg-indigo-500 hover:bg-indigo-600 text-gray-50 hover:text-gray-50 rounded-xl flex items-center gap-2 xs:gap1">
                            Login
                        </NavLink>
                        <NavLink to="/register" className="px-3 md:px-4 py-2 bg-gray-400 hover:bg-gray-600 text-gray-50 hover:text-gray-50 rounded-xl flex items-center gap-2 xs:gap1">
                            Register
                        </NavLink>
                        {/* <button className="px-4 py-2 bg-red-500 hover:bg-gray-600 text-gray-50 rounded-xl flex items-center gap-2">
                            <span>Logout</span>
                        </button> */}
                    </div>
                </div>
            </nav>
        </>        
    );
};

export default Navbar;