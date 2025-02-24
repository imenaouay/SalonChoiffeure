import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-purple-600">
                Salon Coiffeure
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link
              to="/"
              className="text-gray-900 hover:text-purple-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/book"
              className="text-gray-900 hover:text-purple-600 transition-colors"
            >
              Book
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user?.role === 'admin' ? '/dashboard' : '/profile'}
                  className="flex items-center text-gray-900 hover:text-purple-600 transition-colors"
                >
                  <FaUser className="mr-2" />
                  {user?.role === 'admin' ? 'Dashboard' : 'Profile'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-900 hover:text-purple-600 transition-colors"
                >
                  <FaSignOutAlt className="mr-2" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/profile"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center"
              >
                <FaUser className="mr-2" />
                <span className="hidden md:inline">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}