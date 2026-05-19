import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Tractor as TractorIcon, Calendar } from 'lucide-react';

const TractorList = ({ onBook }) => {
  const [tractors, setTractors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTractors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tractors');
        setTractors(res.data);
      } catch (err) {
        console.error('Error fetching tractors');
      }
    };
    fetchTractors();
  }, []);

  const filteredTractors = tractors.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.plate_number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Available Tractors</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tractors..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTractors.map((tractor) => (
          <div key={tractor.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition">
            <div className="bg-green-600 h-32 flex items-center justify-center">
              <TractorIcon size={60} className="text-white opacity-80" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{tractor.name}</h3>
                  <p className="text-gray-500 text-sm">{tractor.plate_number}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  tractor.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {tractor.status.toUpperCase()}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">${tractor.hourly_rate}/hr</span>
                <button
                  onClick={() => onBook(tractor)}
                  disabled={tractor.status !== 'available'}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
                >
                  <Calendar size={18} />
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TractorList;
