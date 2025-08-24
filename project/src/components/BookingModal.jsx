import React, { useState } from 'react';
import { X, Calendar, Users, IndianRupee, Clock, CheckCircle } from 'lucide-react';

const BookingModal = ({ venue, user, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    eventType: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    guestCount: '',
    specialRequests: '',
    additionalServices: {
      catering: false,
      decoration: false,
      photography: false,
      music: false,
      security: false
    },
    cateringCount: '',
    customerInfo: {
      name: user.name || '',
      email: user.email || '',
      phone: '',
      address: ''
    }
  });

  const additionalServicePrices = {
    catering: 500, // per person
    decoration: 15000,
    photography: 20000,
    music: 10000,
    security: 8000
  };

  const eventTypes = [
    'Wedding', 'Birthday Party', 'Anniversary', 'Corporate Event',
    'Cultural Program', 'Conference', 'Reception', 'Engagement'
  ];

  const calculateTotal = () => {
    let total = venue.price;
    
    Object.entries(bookingData.additionalServices).forEach(([service, selected]) => {
      if (selected) {
        if (service === 'catering' && bookingData.cateringCount) {
          total += additionalServicePrices[service] * parseInt(bookingData.cateringCount);
        } else {
          total += additionalServicePrices[service];
        }
      }
    });
    
    return total;
  };

  const handleServiceChange = (service) => {
    setBookingData(prev => ({
      ...prev,
      additionalServices: {
        ...prev.additionalServices,
        [service]: !prev.additionalServices[service]
      }
    }));
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBookingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Here you would typically submit to a backend
    console.log('Booking submitted:', bookingData);
    alert('Booking request submitted successfully! You will receive a confirmation email shortly.');
    onClose();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Event Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
          <select
            value={bookingData.eventType}
            onChange={(e) => handleInputChange('eventType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            required
          >
            <option value="">Select Event Type</option>
            {eventTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
          <input
            type="date"
            value={bookingData.eventDate}
            onChange={(e) => handleInputChange('eventDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
          <input
            type="time"
            value={bookingData.startTime}
            onChange={(e) => handleInputChange('startTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
          <input
            type="time"
            value={bookingData.endTime}
            onChange={(e) => handleInputChange('endTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
        <input
          type="number"
          value={bookingData.guestCount}
          onChange={(e) => handleInputChange('guestCount', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          placeholder="Enter expected number of guests"
          required
          max={venue.capacity}
        />
        <p className="text-sm text-gray-600 mt-1">Maximum capacity: {venue.capacity} guests</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
        <textarea
          value={bookingData.specialRequests}
          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          rows="3"
          placeholder="Any special requirements or requests..."
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Additional Services</h3>
      <p className="text-gray-600">Select additional services to enhance your event experience</p>

      <div className="space-y-4">
        {Object.entries(additionalServicePrices).map(([service, price]) => (
          <div key={service} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={service}
                checked={bookingData.additionalServices[service]}
                onChange={() => handleServiceChange(service)}
                className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
              />
              <div>
                <label htmlFor={service} className="font-medium text-gray-800 capitalize cursor-pointer">
                  {service === 'music' ? 'DJ & Music System' : service}
                </label>
                <p className="text-sm text-gray-600">
                  {service === 'catering' 
                    ? `₹${price}/person` 
                    : `₹${price.toLocaleString()}`}
                </p>
              </div>
            </div>
            <div className="text-right">
              {service === 'catering' && bookingData.additionalServices[service] && (
                <input
                  type="number"
                  placeholder="Count"
                  value={bookingData.cateringCount}
                  onChange={(e) => handleInputChange('cateringCount', e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-800">Estimated Total:</span>
          <span className="text-2xl font-bold text-amber-600">₹{calculateTotal().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Customer Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={bookingData.customerInfo.name}
            onChange={(e) => handleInputChange('customerInfo.name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={bookingData.customerInfo.email}
            onChange={(e) => handleInputChange('customerInfo.email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={bookingData.customerInfo.phone}
            onChange={(e) => handleInputChange('customerInfo.phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="+91 XXXXX XXXXX"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={bookingData.customerInfo.address}
            onChange={(e) => handleInputChange('customerInfo.address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            rows="3"
            placeholder="Enter your full address"
            required
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Booking Summary</h4>
        <div className="space-y-1 text-sm text-blue-700">
          <p><strong>Venue:</strong> {venue.name}</p>
          <p><strong>Event:</strong> {bookingData.eventType} on {bookingData.eventDate}</p>
          <p><strong>Time:</strong> {bookingData.startTime} - {bookingData.endTime}</p>
          <p><strong>Guests:</strong> {bookingData.guestCount}</p>
          <p><strong>Total Amount:</strong> ₹{calculateTotal().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Book {venue.name}</h2>
            <p className="text-gray-600">{venue.location}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: 'Event Details', icon: Calendar },
              { step: 2, label: 'Additional Services', icon: IndianRupee },
              { step: 3, label: 'Confirmation', icon: CheckCircle }
            ].map(({ step: stepNum, label, icon: Icon }) => (
              <div key={stepNum} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepNum ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step > stepNum ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= stepNum ? 'text-amber-600 font-semibold' : 'text-gray-500'
                }`}>
                  {label}
                </span>
                {stepNum < 3 && (
                  <div className={`w-20 h-1 mx-4 ${
                    step > stepNum ? 'bg-amber-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Base Price: ₹{venue.price.toLocaleString()}
            {step >= 2 && ` | Total: ₹${calculateTotal().toLocaleString()}`}
          </div>
          <div className="flex space-x-4">
            {step > 1 && (
              <button
                onClick={handlePrevStep}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={handleNextStep}
                className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg font-semibold transition-all duration-200"
                disabled={
                  (step === 1 && (!bookingData.eventType || !bookingData.eventDate || !bookingData.startTime || !bookingData.endTime || !bookingData.guestCount)) ||
                  (step === 2 && bookingData.additionalServices.catering && !bookingData.cateringCount)
                }
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all duration-200"
                disabled={!bookingData.customerInfo.name || !bookingData.customerInfo.email || !bookingData.customerInfo.phone}
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;