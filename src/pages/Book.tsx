import { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAuth } from '../store/auth';

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
  method: 'card' | 'cash';
}

export default function Book() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    method: 'card',
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    // Validate form
    if (!selectedService || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields');
      return;
    }

    if (paymentInfo.method === 'card' && 
        (!paymentInfo.cardNumber || !paymentInfo.expiryDate || 
         !paymentInfo.cvv || !paymentInfo.name)) {
      alert('Please fill in all payment details');
      return;
    }
    
    setShowConfirmation(true);
  };

  const getServiceName = (value: string) => {
    switch (value) {
      case 'haircut':
        return 'Haircut & Styling';
      case 'color':
        return 'Color Treatment';
      case 'treatment':
        return 'Hair Treatment';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Appointment</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Service
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            >
              <option value="">Choose a service</option>
              <option value="haircut">Haircut & Styling ($60)</option>
              <option value="color">Color Treatment ($120)</option>
              <option value="treatment">Hair Treatment ($80)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            >
              <option value="">Choose a time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="card"
                  checked={paymentInfo.method === 'card'}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, method: 'card' as const })}
                  className="form-radio text-purple-600"
                />
                <span className="ml-2">Credit Card</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentInfo.method === 'cash'}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, method: 'cash' as const })}
                  className="form-radio text-purple-600"
                />
                <span className="ml-2">Cash at Salon</span>
              </label>
            </div>
          </div>

          {paymentInfo.method === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 pl-10"
                    maxLength={19}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img src="/visa.svg" alt="Visa" className="h-4 w-6" />
                  </div>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <img src="/mastercard.svg" alt="Mastercard" className="h-4 w-6" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={paymentInfo.expiryDate}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                  placeholder="MM/YY"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  maxLength={5}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={paymentInfo.cvv}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                  placeholder="123"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  maxLength={3}
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={paymentInfo.name}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition-colors"
        >
          Book Appointment
        </button>
      </form>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        isLogin={true}
      />

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          navigate('/profile');
        }}
        details={{
          service: getServiceName(selectedService),
          date: selectedDate,
          time: selectedTime,
        }}
      />
    </div>
  );
}