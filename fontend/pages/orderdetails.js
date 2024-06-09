import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "./api/customAxiosConfig/CustomAxiosConfig";
import Image from "next/image";

const OrderDetails = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const initialized = useRef(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get("/api/user/cart");
      setCart(Array.isArray(response.data) ? response.data : [response.data]);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Failed to fetch cart. Please try again later.");
      router.push("/tshirts");
    } finally {
      setLoading(false);
    }
  };

  // Calculate summary dynamically
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 0.5 * subtotal; // Assuming a 50% discount for demonstration
  const shipping = 8.0; // Assuming fixed shipping cost
  const total = subtotal - discount + shipping;

  // Function to handle placing an order
  const placeOrder = async () => {
    try {
      const response = await axios.post("/api/user/order");

      if (response.status === 200) {
        console.log("Order placed successfully:", response.data);
        // Redirect to cart page
        router.push("/myOrders");
      } else {
        // If status is not 200, refresh the order details page
        router.reload();
      }
    } catch (error) {
      // Handle error response
      console.error("Error placing order:", error);
    } finally {
      // Set isButtonClicked to true after button click
      setIsButtonClicked(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-gray-500 mb-8">
        Order Details
      </h1>
      {loading ? (
        <div className="text-center mt-4">Loading...</div>
      ) : error ? (
        <div className="text-red-500 mt-4">Error: {error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              {cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
            <Summary
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              total={total}
            />
          </div>
          <div className="mt-8 flex justify-end">
            <button
              className={`px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 ${
                cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }${isButtonClicked ? "bg-green-500" : ""}`}
              onClick={placeOrder}
              disabled={cart.length === 0}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const CartItem = ({ item }) => (
  <div className="flex items-center space-x-4">
    <div className="w-24 h-24 relative">
      <Image
        src={`/images/Tshirts/${item.image}`}
        alt={item.productName}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-gray-500">
        {item.productName}
      </h3>
      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
    </div>
    <div className="flex flex-col items-end">
      <p className="text-lg font-semibold text-gray-500">
        ${item.price * item.quantity}
      </p>
    </div>
  </div>
);

const Summary = ({ subtotal, discount, shipping, total }) => (
  <div className="space-y-8">
    <div className="bg-gray-100 dark:bg-gray-300 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
      <div className="flex flex-col space-y-4">
        <SummaryItem label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
        <SummaryItem
          label="Discount"
          value={`-$${discount.toFixed(2)} (50%)`}
        />
        <SummaryItem label="Shipping" value={`$${shipping.toFixed(2)}`} />
        <SummaryItem label="Total" value={`$${total.toFixed(2)}`} />
      </div>
    </div>
  </div>
);

const SummaryItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <p className="text-base text-gray-900">{label}</p>
    <p className="text-base font-semibold text-gray-900">{value}</p>
  </div>
);

export default OrderDetails;
