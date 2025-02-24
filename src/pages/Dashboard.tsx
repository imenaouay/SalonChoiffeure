import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { FaCalendarCheck, FaCalendarTimes, FaClock } from 'react-icons/fa';
import clsx from 'clsx';

export default function Dashboard() {
  const { user, appointments, updateAppointmentStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleStatusUpdate = (
    id: number,
    status: 'accepted' | 'rejected',
    rejectionReason?: string
  ) => {
    updateAppointmentStatus(id, status, rejectionReason);
  };

  const pendingAppointments = appointments.filter((apt) => apt.status === 'pending');
  const processedAppointments = appointments.filter((apt) => apt.status !== 'pending');

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Salon Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage appointments and client requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center">
            <FaClock className="text-purple-600 text-2xl mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
              <p className="text-3xl font-bold text-purple-600">
                {pendingAppointments.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center">
            <FaCalendarCheck className="text-green-600 text-2xl mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Accepted</h3>
              <p className="text-3xl font-bold text-green-600">
                {appointments.filter((apt) => apt.status === 'accepted').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 p-6 rounded-lg">
          <div className="flex items-center">
            <FaCalendarTimes className="text-red-600 text-2xl mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Rejected</h3>
              <p className="text-3xl font-bold text-red-600">
                {appointments.filter((apt) => apt.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Pending Appointments</h2>
        <div className="space-y-4">
          {pendingAppointments.length === 0 ? (
            <p className="text-gray-500">No pending appointments</p>
          ) : (
            pendingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.service}</h3>
                  <p className="text-gray-500">
                    {appointment.date} at {appointment.time}
                  </p>
                  <p className="text-gray-500">Client: {appointment.userEmail}</p>
                </div>
                <div className="flex space-x-2 w-full md:w-auto">
                  <button
                    onClick={() => handleStatusUpdate(appointment.id, 'accepted')}
                    className="flex-1 md:flex-none bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      const reason = window.prompt('Please provide a reason for rejection:');
                      if (reason) {
                        handleStatusUpdate(appointment.id, 'rejected', reason);
                      }
                    }}
                    className="flex-1 md:flex-none bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Processed Appointments</h2>
        <div className="space-y-4">
          {processedAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.service}</h3>
                  <p className="text-gray-500">
                    {appointment.date} at {appointment.time}
                  </p>
                  <p className="text-gray-500">Client: {appointment.userEmail}</p>
                </div>
                <span
                  className={clsx(
                    'px-3 py-1 rounded-full text-sm font-medium capitalize',
                    appointment.status === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
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
          ))}
        </div>
      </div>
    </div>
  );
}