import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "./api/customAxiosConfig/CustomAxiosConfig";
import Image from "next/image";
import SkeletonLoading from "./components/skeletonloading";
import Link from "next/link";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetchCart();
    }
  }, []);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cart]);

  const fetchCart = async () => {
    try {
      const response = await axios.get("/api/user/cart");
      setCart(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
      router.push("/tshirts");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (cartItemId) => {
    try {
      const response = await axios.delete(`/api/user/cart/${cartItemId}`);
      console.log(response.data);
      setSuccessMessage("Item Removed from Cart");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
      fetchCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleIncreaseQuantity = async (cartItemId) => {
    try {
      const response = await axios.post(`/api/cart/increase/${cartItemId}`);
      console.log(response.data);
      setSuccessMessage("Quantity Increased");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
      fetchCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  const handleDecreaseQuantity = async (cartItemId) => {
    try {
      const response = await axios.post(`/api/cart/decrease/${cartItemId}`);
      console.log(response.data);
      setSuccessMessage("Quantity Decreased");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
      fetchCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      // Navigate to the order details page
      router.push("/orderdetails");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white p-6 shadow-md rounded-lg">
              <SkeletonLoading />
            </div>
          ))}
        </div>
      )}
      {!loading && cart.length === 0 && (
        <div className="text-center text-lg text-gray-600">
          Your cart is empty.
        </div>
      )}
      {!loading && cart.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cart.map((item, index) => (
              <div key={index} className="bg-white p-6 shadow-md rounded-lg">
                <Image
                  src={`/images/Tshirts/${item.image}`}
                  alt="Product"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
                <h2 className="text-lg font-semibold text-gray-900 mt-4">
                  {item.productName}
                </h2>
                <p className="text-gray-600">Price: ${item.price}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      className={`bg-white-200 text-gray-800 px-3 py-1 rounded-md ${
                        item.quantity === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-300"
                      }`}
                      onClick={() => handleDecreaseQuantity(item.cartItemId)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="mx-4 bg-white text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      className="bg-white-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300"
                      onClick={() => handleIncreaseQuantity(item.cartItemId)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleRemove(item.cartItemId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-8">
            <div className="text-lg font-semibold">
              Total Price: ${totalPrice.toFixed(2)}
            </div>
          </div>
        </>
      )}
      {successMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
          {successMessage}
        </div>
      )}

      <div className="flex justify-end mt-8">
        <button
          className={`px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 ${
            cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={cart.length === 0}
          onClick={handleCheckout}
        >
          CheckOut
        </button>
      </div>
    </div>
  );
};

export default CartPage;
