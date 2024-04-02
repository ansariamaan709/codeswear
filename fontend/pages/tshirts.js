import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "./api/customAxiosConfig/CustomAxiosConfig";
import Link from "next/link";
import Image from "next/image";
import SkeletonLoading from "./components/skeletonloading";
import LoadingBar from "./components/LoadingBar";

const Tshirts = () => {
  const [tshirts, setTshirts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetchTshirts();
    }
  }, []);

  const fetchTshirts = async () => {
    try {
      const response = await axios.get("/api/products/tshirts");
      setTshirts(response.data);
    } catch (error) {
      console.error("Error fetching tshirts:", error);
      setTshirts([]);
      router.push("/components/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingBar />
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {loading
              ? // Display skeleton loading while fetching data
                Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="lg:w-1/4 md:w-1/2 p-4 w-full transition-opacity duration-500 ease-in-out"
                  >
                    <SkeletonLoading />
                  </div>
                ))
              : // Display fetched tshirts with smooth transition
                tshirts.map((tshirt, index) => (
                  <div
                    key={index}
                    className="lg:w-1/4 md:w-1/2 p-4 w-full transition-opacity duration-500 ease-in-out"
                  >
                    <Link href={`/product/${tshirt.productId}`}>
                      <div className="block relative h-48 rounded overflow-hidden cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105">
                        <Image
                          alt="ecommerce"
                          width={500}
                          height={300}
                          className="object-cover object-center w-full h-full block"
                          src={`/images/Tshirts/${tshirt.image}`}
                          loading="eager"
                        />
                      </div>
                    </Link>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        CATEGORY
                      </h3>
                      <h2 className="text-white title-font text-lg font-medium">
                        {tshirt.productName}
                      </h2>
                      <p className="mt-1">${tshirt.price}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Tshirts;
