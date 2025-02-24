import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../app/logo.png";

const Navigation = () => {
  return (
    <nav className="bg-trip-navy p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <Link href="/trip">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="mr-2"
          />
        </Link>
      </div>
      <Link href="/" className="text-white hover:text-blue-300 font-poppins">
        Logout
      </Link>
    </nav>
  );
};
//
export default Navigation;
