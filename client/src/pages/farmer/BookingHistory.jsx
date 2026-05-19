import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/bookings/farmer', {
          headers: { 'x-access-token': user.accessToken }
        });
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings');
      }
    };
    fetchBookings();
  }, [user.accessToken]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="text-yellow-500" />;
      case 'confirmed': return <CheckCircle className="text-green-500" />;
      case 'completed': return <CheckCircle className="text-blue-500" />;
      case 'cancelled': return <XCircle className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">My Booking History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Tractor</th>
              <th className="px-6 py-4">Plate Number</th>
              <th className="px-6 py-4">Hectares</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">{booking.tractor_name}</td>
                <td className="px-6 py-4 text-gray-500">{booking.plate_number}</td>
                <td className="px-6 py-4 text-gray-900 font-semibold">{booking.hectares} ha</td>
                <td className="px-6 py-4 text-gray-500">{booking.booking_date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(booking.status)}
                    <span className="capitalize font-medium">{booking.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <div className="p-10 text-center text-gray-500">No bookings found</div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
