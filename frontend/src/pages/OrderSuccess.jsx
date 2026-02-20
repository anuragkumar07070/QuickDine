import { useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const { orderNumber, total } = location.state || {};

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <h1 className="text-2xl font-bold text-green-600">
          Order Confirmed ✅
        </h1>

        <p className="mt-3">
          Order ID: {orderNumber}
        </p>

        <p className="mt-2">
          Total Paid: ₹ {total}
        </p>
      </div>
    </div>
  );
}

export default OrderSuccess;