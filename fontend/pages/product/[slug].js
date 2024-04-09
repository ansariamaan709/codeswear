import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import axios from "../api/customAxiosConfig/CustomAxiosConfig";
import Image from "next/image";
import SkeletonLoading from "../components/skeletonloading";

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;
  const [tshirt, setTshirt] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State to track button click
  const initialized = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug && !initialized.current) {
      initialized.current = true;
      fetchTshirt();
    }
  }, [slug]);

  const fetchTshirt = async () => {
    try {
      const response = await axios.get(`product/tshirt/${slug}`);
      setTshirt(response.data);
    } catch (error) {
      console.error("Error fetching tshirt:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(`/api/addToCart`, tshirt);
      setSuccessMessage("Product Added in Cart");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    } catch (error) {
      console.error("Error fetching tshirt:", error);
    } finally {
      // Set isButtonClicked to true after button click
      setIsButtonClicked(true);
      // Reset isButtonClicked state after 500 milliseconds
      setTimeout(() => {
        setIsButtonClicked(false);
      }, 500);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/product/delete/${tshirt.productId}`
      );
      await displayMessage("Product Deleted", 1000);
      router.push("/tshirts");
    } catch (error) {
      console.error("Error Deleting tshirt:", error);
      await displayMessage("Product Cannot be Deleted", 1000);
    }
  };

  const displayMessage = async (message, duration) => {
    setSuccessMessage(message);
    await new Promise((resolve) => setTimeout(resolve, duration));
    setSuccessMessage("");
  };

  return (
    <>
      {loading &&
        Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <SkeletonLoading />
          </div>
        ))}
      {tshirt && (
        <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <Image
                width={600}
                height={400}
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={`/images/Tshirts/${tshirt.image}`}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  BRAND NAME
                </h2>
                <h1 className="text-white text-3xl title-font font-medium mb-1">
                  {tshirt.productName}
                </h1>
                <p className="leading-relaxed">{tshirt.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="border-2 border-gray-800 rounded-full w-6 h-6 focus:outline-none bg-gray-600"></button>
                    <button className="border-2 border-gray-800 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-800 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select className="rounded border border-gray-700 focus:ring-2 focus:ring-green-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-green-500 text-white pl-3 pr-10">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {tshirt.price != null && (
                    <span className="title-font font-medium text-2xl text-white">
                      ${tshirt.price}
                    </span>
                  )}
                  <button
                    className={`flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded ${
                      isButtonClicked
                        ? "transform transition duration-500 ease-in-out"
                        : ""
                    }`}
                    onClick={handleAddToCart}
                    disabled={isButtonClicked}
                  >
                    {isButtonClicked ? "Added to Cart!" : "Add To Cart"}
                  </button>
                  <button
                    className="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                    onClick={handleDelete}
                  >
                    <svg
                      fill="none"
                      stroke="red"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 4l-1-1H9l-1 1H5v2h14V4zM6.5 7V19a2 2 0 002 2h7a2 2 0 002-2V7M9.5 11v5M14.5 11v5"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {successMessage && (
            <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center">
              <p className="text-lg mr-4">{successMessage}</p>
              <button
                onClick={() => setSuccessMessage("")}
                className="text-red-600 hover:text-red-800 focus:outline-none bg-transparent border-none cursor-pointer"
              >
                X
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
