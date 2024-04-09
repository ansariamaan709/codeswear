import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "./api/customAxiosConfig/CustomAxiosConfig";
import SkeletonLoading from "./components/skeletonloading";
import Link from "next/link";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/user/my-orders");
      setOrders(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      router.push("/carts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">
        My Orders
      </h1>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

const OrderCard = ({ order }) => {
  // Determine badge color based on order status
  const badgeColor =
    order.status === "Delivered" ? "bg-green-500" : "bg-yellow-500";

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">
            Order #{order.orderItemId}
          </h2>
          <span
            className={`px-3 py-1 text-sm font-semibold ${badgeColor} text-white rounded-full`}
          >
            {order.status}
          </span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="w-1/2 mr-6">
            <img
              src={`/images/Tshirts/${order.image}`}
              alt={order.productName}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-xl font-semibold text-gray-500 mb-4">
              {order.productName}
            </h3>
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Quantity:</span>{" "}
                {order.quantity}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Ordered Price:</span> $
                {order.orderedProductPrice}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-white">
            ${order.productName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
