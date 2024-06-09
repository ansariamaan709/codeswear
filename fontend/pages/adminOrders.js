import React, { useEffect, useState } from "react";
import axios from "./api/customAxiosConfig/CustomAxiosConfig";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/admin/gellAllOrders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDispatch = (orderId) => {
    // Handle dispatch action
    console.log(`Dispatch order with ID: ${orderId}`);
  };

  const handleCancel = (orderId) => {
    // Handle cancel action
    console.log(`Cancel order with ID: ${orderId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">
        Orders
      </h1>
      {orders.map((userOrder, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">
            User: {userOrder.userName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userOrder.content.map((order, orderIndex) => (
              <div
                key={orderIndex}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="flex items-center">
                  <div className="p-2">
                    <img
                      src={`/images/Tshirts/${order.image}`}
                      alt={order.productName}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-2 flex flex-col justify-between flex-grow">
                    <div>
                      <h2 className="text-lg font-bold text-white mb-2">
                        Order #{order.orderItemId}
                      </h2>
                      <p className="text-sm text-gray-400 mb-2">
                        {order.productName}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-400">
                          Quantity: {order.quantity}
                        </p>
                        <p className="text-sm text-gray-400">
                          Price: ${order.orderedProductPrice}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        className="px-3 py-1 bg-green-500 text-sm text-white rounded mr-2"
                        onClick={() => handleDispatch(order.orderItemId)}
                      >
                        Dispatch
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-sm text-white rounded"
                        onClick={() => handleCancel(order.orderItemId)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrdersPage;
