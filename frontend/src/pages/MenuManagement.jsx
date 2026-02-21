import { useEffect, useState } from "react";
import API from "../api/api";
import ShopLayout from "../components/ShopLayout";

function MenuManagement() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "main",
        description: "",
        isVeg: true,
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await API.get("/shop/:id", {
            headers: { Authorization: `Bearer ${token}` },
        });

        setProducts(res.data);
    };

    const createProduct = async () => {
        await API.post("/shop", form, {
            headers: { Authorization: `Bearer ${token}` },
        });

        setForm({
            name: "",
            price: "",
            category: "main",
            description: "",
            isVeg: true,
        });

        fetchProducts();
    };

    const deleteProduct = async (id) => {
        await API.delete(`/shop/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        fetchProducts();
    };

    const toggleAvailability = async (id) => {
        await API.patch(
            `/shop/products/${id}/toggle`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );

        fetchProducts();
    };

    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            categoryFilter === "all" ||
            p.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    return (
        <ShopLayout>
            <h1 className="text-2xl font-bold mb-6">
                Menu Management
            </h1>

            {/* Add Product Form */}
            <div className="bg-white p-4 rounded-xl shadow mb-6">
                <h2 className="font-semibold mb-3">
                    Add Product
                </h2>

                <div className="grid grid-cols-2 gap-3">
                    <input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        className="border p-2 rounded"
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) =>
                            setForm({ ...form, price: e.target.value })
                        }
                        className="border p-2 rounded"
                    />

                    <select
                        value={form.category}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                        className="border p-2 rounded"
                    >
                        <option value="drink">Drink</option>
                        <option value="starter">Starter</option>
                        <option value="main">Main</option>
                        <option value="dessert">Dessert</option>
                        <option value="snack">Snack</option>
                        <option value="combo">Combo</option>
                        <option value="other">Other</option>
                    </select>

                    <select
                        value={form.isVeg}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                isVeg: e.target.value === "true",
                            })
                        }
                        className="border p-2 rounded"
                    >
                        <option value="true">Veg</option>
                        <option value="false">Non Veg</option>
                    </select>
                </div>

                <button
                    onClick={createProduct}
                    className="mt-3 bg-black text-white px-4 py-2 rounded"
                >
                    Add Product
                </button>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-4 mb-6">
                <input
                    placeholder="Search product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full"
                />

                <select
                    value={categoryFilter}
                    onChange={(e) =>
                        setCategoryFilter(e.target.value)
                    }
                    className="border p-2 rounded"
                >
                    <option value="all">All</option>
                    <option value="drink">Drink</option>
                    <option value="starter">Starter</option>
                    <option value="main">Main</option>
                    <option value="dessert">Dessert</option>
                </select>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr
                                key={product._id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="p-3">{index + 1}</td>

                                <td className="p-3 font-semibold">
                                    {product.name}
                                </td>

                                <td className="p-3">
                                    ₹ {product.price}
                                </td>

                                <td className="p-3">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                                        {product.category}
                                    </span>
                                </td>

                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded text-sm ${product.isVeg
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {product.isVeg ? "Veg" : "Non Veg"}
                                    </span>
                                </td>

                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded text-sm ${product.isAvailable
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {product.isAvailable
                                            ? "Available"
                                            : "Unavailable"}
                                    </span>
                                </td>

                                <td className="p-3 text-right space-x-2">
                                    <button
                                        onClick={() =>
                                            toggleAvailability(product._id)
                                        }
                                        className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                                    >
                                        Toggle
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteProduct(product._id)
                                        }
                                        className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredProducts.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No products found.
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}

export default MenuManagement;