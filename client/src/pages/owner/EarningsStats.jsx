import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, Tractor, Calendar, TrendingUp } from 'lucide-react';

const EarningsStats = () => {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalBookings: 0,
    activeTractors: 0,
    monthlyData: [
      { name: 'Jan', earnings: 400 },
      { name: 'Feb', earnings: 300 },
      { name: 'Mar', earnings: 600 },
      { name: 'Apr', earnings: 800 },
      { name: 'May', earnings: 500 },
      { name: 'Jun', earnings: 900 },
    ]
  });
  const { user } = useAuth();

  useEffect(() => {
    // In a real app, fetch this from an API endpoint
    // setStats(...)
  }, [user.accessToken]);

  const cards = [
    { title: 'Total Earnings', value: `$${stats.totalEarnings}`, icon: DollarSign, color: 'bg-green-500' },
    { title: 'Total Bookings', value: stats.totalBookings, icon: Calendar, color: 'bg-blue-500' },
    { title: 'Active Tractors', value: stats.activeTractors, icon: Tractor, color: 'bg-orange-500' },
    { title: 'Growth', value: '+12%', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Earnings & Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center space-x-4">
            <div className={`${card.color} p-3 rounded-lg text-white`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Earnings Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip
                cursor={{fill: '#f3f4f6'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="earnings" radius={[4, 4, 0, 0]}>
                {stats.monthlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 5 ? '#059669' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EarningsStats;
