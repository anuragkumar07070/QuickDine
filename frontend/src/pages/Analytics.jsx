import { useEffect, useState } from "react";
import API from "../api/api";
import ShopLayout from "../components/ShopLayout";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function Analytics() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        const token = localStorage.getItem("token");

        const res = await API.get("/order/analytics", {
            headers: { Authorization: `Bearer ${token}` },
        });

        setData(res.data);
    };

    if (!data) return <p>Loading...</p>;

    const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

    return (
        <ShopLayout>
            <h1 className="text-2xl font-bold mb-6">
                Sales Analytics
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-gray-500">Total Orders</p>
                    <p className="text-xl font-bold">
                        {data.totalOrders}
                    </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-gray-500">Total Revenue</p>
                    <p className="text-xl font-bold">
                        ₹ {data.totalRevenue}
                    </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-gray-500">Today's Revenue</p>
                    <p className="text-xl font-bold">
                        ₹ {data.todaysRevenue}
                    </p>
                </div>
            </div>
            {/* Weekly Revenue */}
            <div className="bg-white p-6 rounded-xl shadow mb-6">
                <h2 className="mb-4 font-semibold">
                    Weekly Revenue
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.weeklyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3b82f6"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Monthly Revenue */}
            <div className="bg-white p-6 rounded-xl shadow mb-6">
                <h2 className="mb-4 font-semibold">
                    Monthly Revenue
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#22c55e" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Yearly Revenue */}
            <div className="bg-white p-6 rounded-xl shadow mb-6">
                <h2 className="mb-4 font-semibold">
                    Yearly Revenue
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.yearlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#f59e0b" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="mb-4 font-semibold">
                    Order Status Breakdown
                </h2>

                {/* <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data.statusStats}
                            dataKey="count"
                            nameKey="_id"
                            outerRadius={100}
                            label
                        >
                            {data.statusStats.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer> */}
            </div>
        </ShopLayout>
    );
}

export default Analytics;