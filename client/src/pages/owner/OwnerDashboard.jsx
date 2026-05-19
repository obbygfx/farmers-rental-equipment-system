import { Routes, Route } from 'react-router-dom';
import ManageTractors from './ManageTractors';
import OwnerBookings from './OwnerBookings';
import EarningsStats from './EarningsStats';

const OwnerDashboard = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ManageTractors />} />
        <Route path="/tractors" element={<ManageTractors />} />
        <Route path="/bookings" element={<OwnerBookings />} />
        <Route path="/earnings" element={<EarningsStats />} />
      </Routes>
    </div>
  );
};

export default OwnerDashboard;
