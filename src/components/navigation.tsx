import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../app/logo.png";

const Navigation: React.FC = () => {
  return (
    <nav
      style={{ backgroundColor: "#2E627E" }}
      className="p-4 flex items-center justify-between shadow-md"
    >
      <div className="flex items-center">
        <Link href="/">
          <button className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              width={50}
              height={50}
              className="mr-2"
            />
          </button>
        </Link>
      </div>
      <a href="/" className="text-white hover:text-blue-300 font-poppins">
        Logout
      </a>
    </nav>
  );
};
//
export default Navigation;
