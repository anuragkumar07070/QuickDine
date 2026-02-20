import { useEffect, useState } from "react";
import API from "../api/api";

function Dashboard() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.get("/order/shop", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (id, status) => {
        const token = localStorage.getItem("token");

        await API.patch(
            `/order/${id}/status`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        fetchOrders();
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">
                Orders Dashboard
            </h1>

            {orders.map((order) => (
                <div
                    key={order._id}
                    className="bg-white p-4 rounded-xl shadow mb-4"
                >
                    <div className="flex justify-between">
                        <div>
                            <p className="font-semibold">
                                Order: {order.orderNumber}
                            </p>
                            <p>Table: {order.tableNo}</p>
                            <p>Total: ₹ {order.totalAmount}</p>
                            <p>Status: {order.status}</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() =>
                                    updateStatus(order._id, "preparing")
                                }
                                className="px-3 py-1 bg-yellow-500 text-white rounded"
                            >
                                Preparing
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(order._id, "served")
                                }
                                className="px-3 py-1 bg-green-600 text-white rounded"
                            >
                                Served
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(order._id, "cancelled")
                                }
                                className="px-3 py-1 bg-red-600 text-white rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;