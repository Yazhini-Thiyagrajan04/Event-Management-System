import React, { useState } from 'react';
import { Calendar, MapPin, Star, LogOut, Crown, Search, Filter, Heart, Users, Clock, IndianRupee } from 'lucide-react';
import BookingModal from './BookingModal';

const UserDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('all');
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock venues data
  const venues = [
    {
      id: 1,
      name: 'Royal Palace Hall',
      location: 'Mumbai, Maharashtra',
      price: 50000,
      capacity: 500,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
      amenities: ['AC', 'Parking', 'Catering', 'Decoration'],
      description: 'Luxurious wedding hall with traditional Indian architecture'
    },
    {
      id: 2,
      name: 'Golden Banquet',
      location: 'Delhi, Delhi',
      price: 35000,
      capacity: 300,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1444424/pexels-photo-1444424.jpeg',
      amenities: ['AC', 'Parking', 'Sound System'],
      description: 'Elegant banquet hall perfect for celebrations'
    },
    {
      id: 3,
      name: 'Maharaja Gardens',
      location: 'Bangalore, Karnataka',
      price: 75000,
      capacity: 800,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1444459/pexels-photo-1444459.jpeg',
      amenities: ['Garden', 'AC', 'Parking', 'Catering', 'Photography'],
      description: 'Grand outdoor venue with beautiful gardens'
    },
    {
      id: 4,
      name: 'Crystal Convention',
      location: 'Chennai, Tamil Nadu',
      price: 40000,
      capacity: 400,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1444460/pexels-photo-1444460.jpeg',
      amenities: ['AC', 'Parking', 'Sound System', 'Lighting'],
      description: 'Modern convention center for corporate events'
    }
  ];

  // Mock bookings data
  const userBookings = [
    {
      id: 1,
      venue: 'Royal Palace Hall',
      eventType: 'Wedding',
      date: '2024-12-25',
      guests: 300,
      amount: 85000,
      status: 'confirmed',
      additionalServices: ['Catering', 'Decoration', 'Photography']
    },
    {
      id: 2,
      venue: 'Golden Banquet',
      eventType: 'Birthday Party',
      date: '2024-11-30',
      guests: 150,
      amount: 45000,
      status: 'pending',
      additionalServices: ['Catering']
    }
  ];

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity === 'all' || venue.location.includes(filterCity);
    return matchesSearch && matchesCity;
  });

  const cities = ['all', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai'];

  const handleBookVenue = (venue) => {
    setSelectedVenue(venue);
    setShowBookingModal(true);
  };

  const renderBrowseVenues = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search venues by name or location..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
            >
              {cities.map(city => (
                <option key={city} value={city}>
                  {city === 'all' ? 'All Cities' : city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues.map(venue => (
          <div key={venue.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-200">
            <div className="relative">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span>{venue.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{venue.name}</h3>
              <div className="flex items-center space-x-2 text-gray-600 mb-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{venue.location}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{venue.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Up to {venue.capacity}</span>
                </div>
                <div className="flex items-center space-x-1 text-green-600 font-semibold">
                  <IndianRupee className="h-4 w-4" />
                  <span>{venue.price.toLocaleString()}/day</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {venue.amenities.slice(0, 3).map(amenity => (
                  <span key={amenity} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                    {amenity}
                  </span>
                ))}
                {venue.amenities.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{venue.amenities.length - 3} more
                  </span>
                )}
              </div>
              
              <button
                onClick={() => handleBookVenue(venue)}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMyBookings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">My Bookings</h3>
        </div>
        <div className="p-6">
          {userBookings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No bookings yet. Browse venues to make your first booking!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userBookings.map(booking => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{booking.venue}</h4>
                      <p className="text-gray-600">{booking.eventType}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{booking.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{booking.guests} guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IndianRupee className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">₹{booking.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {booking.additionalServices.map(service => (
                      <span key={service} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Crown className="h-8 w-8 text-amber-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">RoyalEvents</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'browse', label: 'Browse Venues', icon: MapPin },
              { id: 'bookings', label: 'My Bookings', icon: Calendar },
              { id: 'favorites', label: 'Favorites', icon: Heart }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'browse' && renderBrowseVenues()}
        {activeTab === 'bookings' && renderMyBookings()}
        {activeTab === 'favorites' && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="text-center">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Favorites Yet</h3>
              <p className="text-gray-600">Heart your favorite venues to see them here!</p>
            </div>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          venue={selectedVenue}
          user={user}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedVenue(null);
          }}
        />
      )}
    </div>
  );
};

export default UserDashboard;