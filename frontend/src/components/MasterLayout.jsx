import { Link } from "react-router-dom";

function MasterLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <div className="w-64 bg-black text-white p-6">
                <h2 className="text-xl font-bold mb-8">
                    QuickDine Admin
                </h2>

                <nav className="space-y-4">
                    <Link
                        to="/master/dashboard"
                        className="block hover:text-gray-300"
                    >
                        Dashboard
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

export default MasterLayout;