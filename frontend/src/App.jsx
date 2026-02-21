import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MenuPage from "./pages/MenuPage";
import ShopLogin from "./pages/ShopLogin";
import ShopDashboard from "./pages/ShopDashboard";
import OrderSuccess from "./pages/OrderSuccess";
import MasterLogin from "./pages/MasterLogin";
import MasterDashboard from "./pages/MasterDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Analytics from "./pages/Analytics";
import MenuManagement from "./pages/MenuManagement";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/shop/:shopId" element={<MenuPage />} />
        <Route path="/" element={<ShopLogin />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/master/login" element={<MasterLogin />} />
        <Route path="/dashboard" element={<ProtectedRoute role="shop"> <ShopDashboard /></ProtectedRoute>} />
        <Route path="/master/dashboard" element={<ProtectedRoute role="master"> <MasterDashboard /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute role="shop"><Analytics /></ProtectedRoute>}/>
        <Route path="/menu"element={<ProtectedRoute role="shop"><MenuManagement /></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;