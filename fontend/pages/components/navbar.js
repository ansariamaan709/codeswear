import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-gray-900 text-gray-100 body-font shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-8">
        <Link href="/">
          <div className="flex items-center flex-shrink-0 cursor-pointer">
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
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/tshirts">
            <span className="cursor-pointer mx-2 sm:mx-4 hover:text-white">
              Tshirts
            </span>
          </Link>
          <Link href="/hoodies">
            <span className="cursor-pointer mx-2 sm:mx-4 hover:text-white">
              Hoodies
            </span>
          </Link>
          <Link href="/product/addproduct">
            <span className="cursor-pointer mx-2 sm:mx-4 hover:text-white">
              Add Product
            </span>
          </Link>
          <Link href="/myOrders">
            <span className="cursor-pointer mx-2 sm:mx-4 hover:text-white">
              My Orders
            </span>
          </Link>
          <Link href="/adminOrders">
            <span className="cursor-pointer mx-2 sm:mx-4 hover:text-white">
              All Orders
            </span>
          </Link>
        </nav>
        <Link href="/carts">
          <div className="inline-flex items-center bg-gray-800 border-1 py-1 px-2 sm:px-3 focus:outline-none hover:bg-blue-700 rounded text-base md:mt-0">
            Cart
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-3 h-3 ml-1 sm:w-4 sm:h-4"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </div>
        </Link>
        <Link href="/components/logout">
          <div className="inline-flex items-center bg-gray-800 border-2 py-1 px-2 sm:px-3 focus:outline-none hover:bg-red-700 rounded text-base mt-4 md:mt-0 md:ml-4">
            Logout
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
