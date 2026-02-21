import { Link } from "react-router-dom";

function ShopLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white p-6">
                <h2 className="text-xl font-bold mb-8">
                    Shop Panel
                </h2>

                <nav className="space-y-4">
                    <Link
                        to="/dashboard"
                        className="block hover:text-gray-300"
                    >
                        Orders
                    </Link>
                    <Link
                        to="/analytics"
                        className="block hover:text-gray-300"
                    >
                        Analytics
                    </Link>
                    <Link
                        to="/menu"
                        className="block hover:text-gray-300"
                    >
                        Menu
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {children}
            </div>
        </div>
    );
}

export default ShopLayout;