import React from "react";

const Footer = (props) => {
    return (
        <footer className="w-full flex flex-col justify-center bg-slate-100">
            <div className="container flex-none justify-start md:flex md:justify-between py-10">
                <p className="text-2xl font-bold bg-white inline-block p-4 rounded-md text-gray-700 mb-4">Write Me a Todo</p>
                <p className="text-gray-600 font-semibold">Find more infos on ticme.fr.</p>
            </div>
        </footer>     
    );
};

export default Footer;