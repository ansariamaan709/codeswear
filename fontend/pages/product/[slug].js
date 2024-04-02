import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import axios from "../api/customAxiosConfig/CustomAxiosConfig";
import { data } from "autoprefixer";
import Image from "next/image";
import SkeletonLoading from "../components/skeletonloading";

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;
  const [tshirt, setTshirt] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
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
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching tshirt:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(`/api/addToCart`, tshirt);
      console.log(response.data);
      setSuccessMessage("Product Added in Cart");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    } catch (error) {
      console.error("Error fetching tshirt:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/product/delete/${tshirt.productId}`
      );
      await displayMessage("Product Delete", 1000);
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
          {successMessage && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-md flex items-center">
              <p className="text-green-600 text-lg mr-2">{successMessage}</p>
              <button
                onClick={() => setSuccessMessage("")}
                className="text-red-600 hover:text-red-800 focus:outline-none bg-transparent border-none cursor-pointer"
              >
                X
              </button>
            </div>
          )}

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
                  The Catcher in the Rye
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-green-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-green-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-green-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-green-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-green-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 text-gray-500 space-x-2">
                    <a>
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a>
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a>
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">
                  Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                  sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                  juiceramps cornhole raw denim forage brooklyn. Everyday carry
                  +1 seitan poutine tumeric. Gastropub blue bottle austin
                  listicle pour-over, neutra jean shorts keytar banjo tattooed
                  umami cardigan.
                </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="border-2 border-gray-800 rounded-full w-6 h-6 focus:outline-none"></button>
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
                      {tshirt.price}
                    </span>
                  )}
                  <button
                    className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                    onClick={handleAddToCart}
                  >
                    Add To Cart
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
        </section>
      )}
    </>
  );
}
