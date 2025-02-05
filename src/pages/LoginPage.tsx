import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const LoginPage: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await api.post("/auth/login", { name, email });
            navigate("/search");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;