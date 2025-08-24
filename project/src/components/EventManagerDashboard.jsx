import React, { useState } from 'react';
import { MapPin, Calendar, Plus, LogOut, Crown, Edit, Eye, Trash2, Star, Users, IndianRupee } from 'lucide-react';
import AddVenueModal from './AddVenueModal';

const EventManagerDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('venues');
  const [showAddVenueModal, setShowAddVenueModal] = useState(false);
  
  // Mock venues data for this manager
  const [venues, setVenues] = useState([
    {
      id: 1,
      name: 'Royal Palace Hall',
      location: 'Mumbai, Maharashtra',
      price: 50000,
      capacity: 500,
      rating: 4.8,
      bookings: 25,
      revenue: 125000,
      status: 'active',
      amenities: ['AC', 'Parking', 'Catering', 'Decoration'],
      images: ['https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg'],
      description: 'Luxurious wedding hall with traditional Indian architecture'
    },
    {
      id: 2,
      name: 'Golden Banquet',
      location: 'Mumbai, Maharashtra',
      price: 35000,
      capacity: 300,
      rating: 4.6,
      bookings: 18,
      revenue: 90000,
      status: 'active',
      amenities: ['AC', 'Parking', 'Sound System'],
      images: ['https://images.pexels.com/photos/1444424/pexels-photo-1444424.jpeg'],
      description: 'Elegant banquet hall perfect for celebrations'
    }
  ]);

  // Mock bookings for manager's venues
  const venueBookings = [
    {
      id: 1,
      venue: 'Royal Palace Hall',
      customer: 'Anita Patel',
      customerEmail: 'anita@example.com',
      customerPhone: '+91 98765 43210',
      event: 'Wedding',
      date: '2024-12-15',
      guests: 300,
      amount: 75000,
      status: 'confirmed',
      additionalServices: ['Catering', 'Decoration', 'Photography']
    },
    {
      id: 2,
      venue: 'Royal Palace Hall',
      customer: 'Deepika Sharma',
      customerEmail: 'deepika@example.com',
      customerPhone: '+91 87654 32109',
      event: 'Anniversary',
      date: '2024-12-25',
      guests: 200,
      amount: 50000,
      status: 'confirmed',
      additionalServices: ['Catering', 'Decoration']
    },
    {
      id: 3,
      venue: 'Golden Banquet',
      customer: 'Rahul Singh',
      customerEmail: 'rahul@example.com',
      customerPhone: '+91 76543 21098',
      event: 'Birthday Party',
      date: '2024-12-20',
      guests: 150,
      amount: 25000,
      status: 'pending',
      additionalServices: ['Catering']
    }
  ];

  const handleAddVenue = (newVenue) => {
    const venue = {
      ...newVenue,
      id: venues.length + 1,
      bookings: 0,
      revenue: 0,
      rating: 0,
      status: 'pending'
    };
    setVenues([...venues, venue]);
    setShowAddVenueModal(false);
  };

  const getTotalRevenue = () => {
    return venues.reduce((total, venue) => total + venue.revenue, 0);
  };

  const getTotalBookings = () => {
    return venues.reduce((total, venue) => total + venue.bookings, 0);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Revenue</p>
              <p className="text-2xl font-bold">₹{getTotalRevenue().toLocaleString()}</p>
            </div>
            <IndianRupee className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Bookings</p>
              <p className="text-2xl font-bold">{getTotalBookings()}</p>
            </div>
            <Calendar className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Active Venues</p>
              <p className="text-2xl font-bold">{venues.filter(v => v.status === 'active').length}</p>
            </div>
            <MapPin className="h-8 w-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Avg Rating</p>
              <p className="text-2xl font-bold">
                {venues.length > 0 ? (venues.reduce((sum, v) => sum + v.rating, 0) / venues.length).toFixed(1) : '0.0'}
              </p>
            </div>
            <Star className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {venueBookings.slice(0, 3).map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{booking.customer}</p>
                  <p className="text-sm text-gray-600">{booking.venue} - {booking.event}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">₹{booking.amount.toLocaleString()}</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Venue Performance</h3>
          <div className="space-y-3">
            {venues.slice(0, 3).map(venue => (
              <div key={venue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{venue.name}</p>
                  <p className="text-sm text-gray-600">{venue.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">{venue.bookings} bookings</p>
                  <p className="text-sm text-gray-600">₹{venue.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMyVenues = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Venues</h2>
        <button
          onClick={() => setShowAddVenueModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200"
        >
          <Plus className="h-5 w-5" />
          <span>Add Venue</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {venues.map(venue => (
          <div key={venue.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="relative">
              <img
                src={venue.images[0]}
                alt={venue.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  venue.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {venue.status === 'active' ? 'Active' : 'Pending'}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{venue.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{venue.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span className="text-sm font-semibold">{venue.rating || 'New'}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{venue.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <p className="text-lg font-bold text-blue-600">{venue.bookings}</p>
                  <p className="text-xs text-gray-600">Bookings</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">₹{(venue.revenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-purple-600">{venue.capacity}</p>
                  <p className="text-xs text-gray-600">Capacity</p>
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
                    +{venue.amenities.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {venues.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-200 text-center">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Venues Yet</h3>
          <p className="text-gray-600 mb-6">Start by adding your first venue to begin accepting bookings.</p>
          <button
            onClick={() => setShowAddVenueModal(true)}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Add Your First Venue
          </button>
        </div>
      )}
    </div>
  );

  const renderBookings = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Venue Bookings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guests</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {venueBookings.map(booking => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="font-medium text-gray-800">{booking.customer}</p>
                    <p className="text-sm text-gray-600">{booking.customerEmail}</p>
                    <p className="text-sm text-gray-600">{booking.customerPhone}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{booking.venue}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{booking.event}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{booking.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{booking.guests}</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">₹{booking.amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                <h1 className="text-2xl font-bold text-gray-800">Event Manager</h1>
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
              { id: 'overview', label: 'Overview', icon: Star },
              { id: 'venues', label: 'My Venues', icon: MapPin },
              { id: 'bookings', label: 'Bookings', icon: Calendar }
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'venues' && renderMyVenues()}
        {activeTab === 'bookings' && renderBookings()}
      </main>

      {/* Add Venue Modal */}
      {showAddVenueModal && (
        <AddVenueModal
          onClose={() => setShowAddVenueModal(false)}
          onAddVenue={handleAddVenue}
        />
      )}
    </div>
  );
};

export default EventManagerDashboard;