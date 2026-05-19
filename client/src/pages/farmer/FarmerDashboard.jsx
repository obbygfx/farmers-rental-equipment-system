import { Routes, Route } from 'react-router-dom';
import TractorList from './TractorList';
import BookingHistory from './BookingHistory';
import { useState } from 'react';
import BookingModal from './BookingModal';

const FarmerDashboard = () => {
  const [selectedTractor, setSelectedTractor] = useState(null);

  return (
    <div>
      <Routes>
        <Route path="/" element={<TractorList onBook={(t) => setSelectedTractor(t)} />} />
        <Route path="/tractors" element={<TractorList onBook={(t) => setSelectedTractor(t)} />} />
        <Route path="/bookings" element={<BookingHistory />} />
      </Routes>

      {selectedTractor && (
        <BookingModal
          tractor={selectedTractor}
          onClose={() => setSelectedTractor(null)}
          onSuccess={() => {
            setSelectedTractor(null);
            alert('Booking requested successfully!');
          }}
        />
      )}
    </div>
  );
};

export default FarmerDashboard;
