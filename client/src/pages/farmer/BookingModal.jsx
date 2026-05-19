import { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const BookingModal = ({ tractor, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    hectares: '',
    booking_date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        tractor_id: tractor.id,
        ...formData
      }, {
        headers: { 'x-access-token': user.accessToken }
      });
      onSuccess();
    } catch (err) {
      alert('Booking failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Book {tractor.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Hectares</label>
            <input
              type="number"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.hectares}
              onChange={(e) => setFormData({...formData, hectares: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Booking Date</label>
            <input
              type="date"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.booking_date}
              onChange={(e) => setFormData({...formData, booking_date: e.target.value})}
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
