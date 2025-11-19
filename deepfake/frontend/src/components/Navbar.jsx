import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-3">
                    <img src="/truevision-logo.png" alt="Truevision Logo" className="h-12 w-auto" />
                    <span className="text-2xl font-bold text-green-400">TrueVision</span>
                </Link>

               

                <div className="space-x-6">
                    <Link to="/" className="text-gray-300 hover:text-white transition">
                        Home
                    </Link>
                    <Link to="/detect" className="text-gray-300 hover:text-white transition">
                        Detect
                    </Link>
                    <Link to="/about" className="text-gray-300 hover:text-white transition">
                        About
                    </Link>

                    {/* Dynamic Auth Button */}
                    {isAuthenticated ? (
                        <button
                            onClick={logout}
                            className="text-red-500 border border-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/auth"
                            className="text-green-400 font-semibold hover:text-white transition"
                        >
                            Login / Sign Up
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
