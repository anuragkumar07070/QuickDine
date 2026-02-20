import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import OrderSuccess from "./pages/OrderSuccess";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/shop/:shopId" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;