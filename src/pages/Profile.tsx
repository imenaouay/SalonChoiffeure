import { useState } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaEnvelope, FaClock, FaCheck, FaTimes } from 'react-icons/fa';
import AuthModal from '../components/AuthModal';
import clsx from 'clsx';

export default function Profile() {
  const { isAuthenticated, user, updateProfile, appointments } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setShowUpdateConfirmation(true);
    setTimeout(() => {
      setShowUpdateConfirmation(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (!isAuthenticated) {
    return (
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => navigate('/')}
        isLogin={true}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {showUpdateConfirmation && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 animate-fade-in-down">
          <div className="flex items-center">
            <FaCheck className="mr-2" />
            <p>Profile updated successfully!</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-center mb-6">
          <FaUser className="text-3xl text-purple-600 mr-4" />
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaUser className="mr-2" /> Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaEnvelope className="mr-2" /> Email
            </label>
            <input
              type="email"
              value={formData.email}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FaPhone className="mr-2" /> Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center w-full md:w-auto"
          >
            <FaCheck className="mr-2" /> Update Profile
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <FaClock className="text-3xl text-purple-600 mr-4" />
          <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        </div>
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments yet.</p>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{appointment.service}</h3>
                    <p className="text-gray-500">
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                  <span
                    className={clsx(
                      'px-3 py-1 rounded-full text-sm font-medium capitalize',
                      getStatusColor(appointment.status)
                    )}
                  >
                    {appointment.status}
                  </span>
                </div>
                {appointment.status === 'rejected' && appointment.rejectionReason && (
                  <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                    <strong>Reason:</strong> {appointment.rejectionReason}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}