import { useEffect, useState } from "react";
import API from "../api/api";
import MasterLayout from "../components/MasterLayout";
import { useNavigate } from "react-router-dom";

function MasterDashboard() {
    const [shops, setShops] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const navigate = useNavigate();

    useEffect(() => {
        fetchShops();
    }, []);

    const fetchShops = async () => {
        const token = localStorage.getItem("masterToken");

        const res = await API.get("/master/shops", {
            headers: { Authorization: `Bearer ${token}` },
        });

        setShops(res.data);
    };

    const logout = () => {
        localStorage.removeItem("masterToken");
        navigate("/master/login");
    };

    const filteredShops = shops.filter((shop) => {
        const matchesSearch =
            shop.name.toLowerCase().includes(search.toLowerCase()) ||
            shop.ownerName.toLowerCase().includes(search.toLowerCase()) ||
            shop.email.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || shop.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <MasterLayout>
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Master Dashboard
                </h1>

                <button
                    onClick={logout}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search shop..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>

            {/* Shop List */}
            {filteredShops.map((shop) => (
                <div
                    key={shop._id}
                    className="bg-white p-4 rounded-xl shadow mb-4 flex justify-between items-center"
                >
                    <div>
                        <p className="font-semibold">{shop.name}</p>
                        <p className="text-sm text-gray-500">
                            Owner: {shop.ownerName}
                        </p>
                        <p className="text-sm">
                            Status:{" "}
                            <span
                                className={`font-semibold ${shop.status === "active"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {shop.status}
                            </span>
                        </p>
                    </div>
                </div>
            ))}

            {filteredShops.length === 0 && (
                <p className="text-gray-500">
                    No shops found.
                </p>
            )}
        </MasterLayout>
    );
}

export default MasterDashboard;