import { useState } from "react";
import API from "../api/api.js";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const res = await API.post("/auth/shop/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            window.location.href = "/dashboard";
        } catch (err) {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow w-80">
                <h1 className="text-xl font-bold mb-4 text-center">
                    Shop Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded mb-4"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={login}
                    className="w-full bg-black text-white py-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default LoginPage;