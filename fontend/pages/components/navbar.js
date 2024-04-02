import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-5">
        <Link href="/">
          <div className="flex items-center flex-shrink-0 text-white mr-6 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 p-2 bg-green-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl font-bold">Codeswear</span>
          </div>
        </Link>
        <nav className="md:ml-4 flex flex-wrap items-center text-base justify-center">
          <Link href="/tshirts">
            <span className="cursor-pointer mx-4 hover:text-white">
              Tshirts
            </span>
          </Link>
          <Link href="/hoodies">
            <span className="cursor-pointer mx-4 hover:text-white">
              Hoodies
            </span>
          </Link>
          <Link href="/product/addproduct">
            <span className="cursor-pointer mx-4 hover:text-white">
              Add Product
            </span>
          </Link>
        </nav>
        <Link href="/carts">
          <div className="inline-flex items-center bg-gray-800 border-1 py-1 px-3 focus:outline-none hover:bg-blue-700 rounded text-base md:mt-0 mr-2">
            {" "}
            {/* Reduced margin to mr-2 */}
            Cart
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </div>
        </Link>
        <Link href="/components/logout">
          <div className="inline-flex items-center bg-gray-800 border-2 py-1 px-2 focus:outline-none hover:bg-red-700 rounded text-base mt-2 md:mt-0">
            Logout
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
