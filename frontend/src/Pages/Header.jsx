import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-8 px-6 text-center shadow-md">
            <h2 className="text-2xl font-bold tracking-wide">📝 BLOGS — Write. Share. Inspire.</h2>
            <p className="text-blue-200 mt-1 text-sm">
                Join our community of writers and readers today.{" "}
                <Link to="/register" className="text-pink-300 underline hover:text-pink-200">Get started →</Link>
            </p>
        </div>
    );
}

export default Header;
