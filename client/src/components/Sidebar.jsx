import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Tractor, Calendar, DollarSign, LogOut, User, Settings } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const farmerLinks = [
    { name: 'Dashboard', path: '/farmer', icon: LayoutDashboard },
    { name: 'Rent Tractor', path: '/farmer/tractors', icon: Tractor },
    { name: 'My Bookings', path: '/farmer/bookings', icon: Calendar },
  ];

  const ownerLinks = [
    { name: 'Dashboard', path: '/owner', icon: LayoutDashboard },
    { name: 'Manage Tractors', path: '/owner/tractors', icon: Tractor },
    { name: 'Booking Requests', path: '/owner/bookings', icon: Calendar },
    { name: 'Earnings', path: '/owner/earnings', icon: DollarSign },
  ];

  const adminLinks = [
    { name: 'Admin Panel', path: '/admin', icon: Settings },
    { name: 'Users', path: '/admin/users', icon: User },
  ];

  let links = [];
  if (user?.role === 'farmer') links = farmerLinks;
  else if (user?.role === 'owner') links = ownerLinks;
  else if (user?.role === 'admin') links = adminLinks;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-green-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-green-700">
          TractorGo
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition ${
                location.pathname === link.path ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
            >
              <link.icon size={20} />
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-green-700">
          <div className="flex items-center space-x-3 p-3 text-green-200">
            <User size={20} />
            <span className="truncate">{user?.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-700 transition text-red-200 mt-2"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-auto p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
