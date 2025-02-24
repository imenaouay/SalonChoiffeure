import { useAuth } from '../store/auth';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: {
    service: string;
    date: string;
    time: string;
  };
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  details,
}: ConfirmationModalProps) {
  const { addAppointment } = useAuth();

  const handleClose = () => {
    addAppointment(details);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Booking Confirmation
        </h2>
        <div className="space-y-4">
          <p className="text-green-600 text-lg mb-4">
            Your appointment has been successfully booked!
          </p>
          <div className="border-t border-b border-gray-200 py-4">
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-600">Service:</p>
              <p className="font-medium">{details.service}</p>
              <p className="text-gray-600">Date:</p>
              <p className="font-medium">{details.date}</p>
              <p className="text-gray-600">Time:</p>
              <p className="font-medium">{details.time}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
        <button
          onClick={handleClose}
          className="mt-6 w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}