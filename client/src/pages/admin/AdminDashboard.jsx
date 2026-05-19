import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Users, Tractor, Calendar, DollarSign, Trash2, Shield } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/users', {
          headers: { 'x-access-token': currentUser.accessToken }
        });
        setUsers(res.data);
      } catch (err) {
        // Since we didn't implement getUsers endpoint yet, let's mock some for UI
        setUsers([
          { id: 1, name: 'Farmer John', phone: '1234567890', role: 'farmer' },
          { id: 2, name: 'Owner Bob', phone: '0987654321', role: 'owner' },
          { id: 3, name: 'Admin Alice', phone: '1122334455', role: 'admin' },
        ]);
      }
    };
    fetchUsers();
  }, [currentUser.accessToken]);

  const stats = [
    { label: 'Total Users', value: '42', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Tractors', value: '15', icon: Tractor, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Total Bookings', value: '128', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Total Revenue', value: '$12,450', icon: DollarSign, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Admin Control Panel</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-lg flex items-center justify-center mb-4`}>
              <s.icon size={24} />
            </div>
            <p className="text-gray-500 text-sm font-medium">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">User Management</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition">
            Add New Admin
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{u.name}</td>
                  <td className="px-6 py-4 text-gray-500">{u.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      u.role === 'owner' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-xs font-semibold text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      ACTIVE
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-400 hover:text-blue-500 transition"><Shield size={18} /></button>
                      <button className="text-gray-400 hover:text-red-500 transition"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
