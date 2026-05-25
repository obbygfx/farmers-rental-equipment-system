import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash2, Tractor as TractorIcon } from 'lucide-react';

const ManageTractors = () => {
  const [tractors, setTractors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', plate_number: '', hourly_rate: '' });
  const { user } = useAuth();

  const fetchTractors = async () => {
    try {
      const res = await api.get('/tractors/my', {
        headers: { 'x-access-token': user.accessToken }
      });
      setTractors(res.data);
    } catch (err) {
      console.error('Error fetching tractors');
    }
  };

  useEffect(() => {
    fetchTractors();
  }, [user.accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tractors', formData, {
        headers: { 'x-access-token': user.accessToken }
      });
      setShowModal(false);
      setFormData({ name: '', plate_number: '', hourly_rate: '' });
      fetchTractors();
    } catch (err) {
      alert('Failed to add tractor');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tractor?')) {
      try {
        await api.delete(`/tractors/${id}`, {
          headers: { 'x-access-token': user.accessToken }
        });
        fetchTractors();
      } catch (err) {
        alert('Failed to delete tractor');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Tractors</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition"
        >
          <Plus size={20} />
          <span>Add New Tractor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tractors.map((tractor) => (
          <div key={tractor.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="bg-green-100 p-3 rounded-lg">
                  <TractorIcon className="text-green-600" size={30} />
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-blue-500 transition"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(tractor.id)} className="text-gray-400 hover:text-red-500 transition"><Trash2 size={18} /></button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900">{tractor.name}</h3>
                <p className="text-gray-500">{tractor.plate_number}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">${tractor.hourly_rate}/hr</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    tractor.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {tractor.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Add New Tractor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tractor Name / Model</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Plate Number</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.plate_number}
                  onChange={(e) => setFormData({...formData, plate_number: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.hourly_rate}
                  onChange={(e) => setFormData({...formData, hourly_rate: e.target.value})}
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save Tractor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTractors;
