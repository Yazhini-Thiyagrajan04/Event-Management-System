import React, { useState } from 'react';
import { X, Upload, MapPin, IndianRupee, Users, Plus, Trash2 } from 'lucide-react';

const AddVenueModal = ({ onClose, onAddVenue }) => {
  const [step, setStep] = useState(1);
  const [venueData, setVenueData] = useState({
    name: '',
    description: '',
    location: '',
    city: '',
    state: '',
    price: '',
    capacity: '',
    amenities: [],
    images: [],
    availableDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    },
    contactInfo: {
      phone: '',
      email: '',
      address: ''
    }
  });

  const [newAmenity, setNewAmenity] = useState('');

  const commonAmenities = [
    'Air Conditioning', 'Parking', 'Sound System', 'Lighting', 'Stage',
    'Kitchen', 'Restrooms', 'WiFi', 'Generator', 'Security', 'Garden',
    'Swimming Pool', 'Valet Parking', 'Bridal Room', 'Guest Rooms'
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setVenueData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setVenueData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleAmenityAdd = (amenity) => {
    if (amenity && !venueData.amenities.includes(amenity)) {
      setVenueData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity]
      }));
    }
    setNewAmenity('');
  };

  const handleAmenityRemove = (amenity) => {
    setVenueData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  const handleDayToggle = (day) => {
    setVenueData(prev => ({
      ...prev,
      availableDays: {
        ...prev.availableDays,
        [day]: !prev.availableDays[day]
      }
    }));
  };

  const handleImageAdd = (imageUrl) => {
    if (imageUrl && venueData.images.length < 5) {
      setVenueData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl]
      }));
    }
  };

  const handleSubmit = () => {
    onAddVenue(venueData);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Basic Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Venue Name *</label>
        <input
          type="text"
          value={venueData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          placeholder="Enter venue name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          value={venueData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          rows="4"
          placeholder="Describe your venue, its features, and what makes it special"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            value={venueData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Enter city"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <select
            value={venueData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            required
          >
            <option value="">Select State</option>
            {indianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
        <textarea
          value={venueData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          rows="3"
          placeholder="Enter complete address with landmarks"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price per Day (₹) *</label>
          <div className="relative">
            <IndianRupee className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="number"
              value={venueData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter price per day"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Capacity *</label>
          <div className="relative">
            <Users className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="number"
              value={venueData.capacity}
              onChange={(e) => handleInputChange('capacity', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Maximum guest capacity"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Amenities & Features</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Select Available Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {commonAmenities.map(amenity => (
            <button
              key={amenity}
              type="button"
              onClick={() => handleAmenityAdd(amenity)}
              className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                venueData.amenities.includes(amenity)
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-300 hover:border-amber-300 text-gray-700'
              }`}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Add Custom Amenity</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Enter custom amenity"
            onKeyPress={(e) => e.key === 'Enter' && handleAmenityAdd(newAmenity)}
          />
          <button
            type="button"
            onClick={() => handleAmenityAdd(newAmenity)}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {venueData.amenities.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Selected Amenities</label>
          <div className="flex flex-wrap gap-2">
            {venueData.amenities.map(amenity => (
              <span
                key={amenity}
                className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full"
              >
                <span>{amenity}</span>
                <button
                  type="button"
                  onClick={() => handleAmenityRemove(amenity)}
                  className="hover:bg-amber-200 rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Available Days</label>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(venueData.availableDays).map(([day, available]) => (
            <button
              key={day}
              type="button"
              onClick={() => handleDayToggle(day)}
              className={`p-2 text-sm rounded-lg border-2 capitalize transition-colors ${
                available
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 bg-gray-50 text-gray-500'
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Images & Contact</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Add Venue Images</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            Add up to 5 high-quality images of your venue
          </p>
          <p className="text-sm text-gray-500 mt-2">
            For demo purposes, default images will be used
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone *</label>
          <input
            type="tel"
            value={venueData.contactInfo.phone}
            onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="+91 XXXXX XXXXX"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email *</label>
          <input
            type="email"
            value={venueData.contactInfo.email}
            onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="venue@example.com"
            required
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Venue Summary</h4>
        <div className="space-y-1 text-sm text-blue-700">
          <p><strong>Name:</strong> {venueData.name}</p>
          <p><strong>Location:</strong> {venueData.city}, {venueData.state}</p>
          <p><strong>Capacity:</strong> {venueData.capacity} guests</p>
          <p><strong>Price:</strong> ₹{venueData.price}/day</p>
          <p><strong>Amenities:</strong> {venueData.amenities.length} selected</p>
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
            <h2 className="text-2xl font-bold text-gray-800">Add New Venue</h2>
            <p className="text-gray-600">Share your venue with event organizers</p>
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
              { step: 1, label: 'Basic Info', icon: MapPin },
              { step: 2, label: 'Amenities', icon: Plus },
              { step: 3, label: 'Images & Contact', icon: Upload }
            ].map(({ step: stepNum, label, icon: Icon }) => (
              <div key={stepNum} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepNum ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  <Icon className="h-5 w-5" />
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
            Step {step} of 3
          </div>
          <div className="flex space-x-4">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg font-semibold transition-all duration-200"
                disabled={
                  (step === 1 && (!venueData.name || !venueData.description || !venueData.city || !venueData.state || !venueData.location || !venueData.price || !venueData.capacity)) ||
                  (step === 2 && venueData.amenities.length === 0)
                }
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all duration-200"
                disabled={!venueData.contactInfo.phone || !venueData.contactInfo.email}
              >
                Add Venue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVenueModal;