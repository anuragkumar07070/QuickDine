import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
    const shopToken = localStorage.getItem("token");
    const masterToken = localStorage.getItem("masterToken");

    if (role === "shop" && !shopToken) {
        return <Navigate to="/" />;
    }

    if (role === "master" && !masterToken) {
        return <Navigate to="/master/login" />;
    }

    return children;
}

export default ProtectedRoute;