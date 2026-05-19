import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Clock, CheckCircle, XCircle, MapPin } from 'lucide-react';

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/owner', {
        headers: { 'x-access-token': user.accessToken }
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user.accessToken]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, { status }, {
        headers: { 'x-access-token': user.accessToken }
      });
      fetchBookings();
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">Booking Requests</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Farmer</th>
              <th className="px-6 py-4">Tractor</th>
              <th className="px-6 py-4">Hectares</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-900 font-medium">{booking.farmer_name}</td>
                <td className="px-6 py-4 text-gray-500">{booking.tractor_name} ({booking.plate_number})</td>
                <td className="px-6 py-4 text-gray-900 font-semibold">{booking.hectares} ha</td>
                <td className="px-6 py-4 text-gray-500">{booking.booking_date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                          className="text-green-600 hover:text-green-800 transition"
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <XCircle size={20} />
                        </button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'completed')}
                        className="text-blue-600 hover:text-blue-800 transition flex items-center space-x-1"
                      >
                        <CheckCircle size={20} />
                        <span className="text-xs">Complete</span>
                      </button>
                    )}
                    <button className="text-gray-400 hover:text-blue-500 transition">
                      <MapPin size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <div className="p-10 text-center text-gray-500">No booking requests</div>
        )}
      </div>
    </div>
  );
};

export default OwnerBookings;
