import React, { useState } from 'react';
import { Users, Calendar, MapPin, Settings, LogOut, TrendingUp, DollarSign, Crown, Eye } from 'lucide-react';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for admin dashboard
  const [venues, setVenues] = useState([
    { id: 1, name: 'Royal Palace Hall', location: 'Mumbai', manager: 'Venue Manager', status: 'active', bookings: 25, revenue: 125000 },
    { id: 2, name: 'Golden Banquet', location: 'Delhi', manager: 'Rajesh Kumar', status: 'active', bookings: 18, revenue: 90000 },
    { id: 3, name: 'Maharaja Gardens', location: 'Bangalore', manager: 'Priya Sharma', status: 'pending', bookings: 0, revenue: 0 }
  ]);

  const [bookings, setBookings] = useState([
    { id: 1, venue: 'Royal Palace Hall', customer: 'Anita Patel', event: 'Wedding', date: '2024-12-15', amount: 75000, status: 'confirmed' },
    { id: 2, venue: 'Golden Banquet', customer: 'Rahul Singh', event: 'Birthday Party', date: '2024-12-20', amount: 25000, status: 'pending' },
    { id: 3, venue: 'Royal Palace Hall', customer: 'Deepika Sharma', event: 'Anniversary', date: '2024-12-25', amount: 50000, status: 'confirmed' }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'user@example.com', role: 'user', joinDate: '2024-01-15', totalBookings: 3 },
    { id: 2, name: 'Venue Manager', email: 'manager@venue.com', role: 'eventManager', joinDate: '2024-02-01', totalBookings: 0 },
    { id: 3, name: 'Priya Sharma', email: 'priya@example.com', role: 'eventManager', joinDate: '2024-02-15', totalBookings: 0 }
  ]);

  const approveVenue = (venueId) => {
    setVenues(venues.map(venue => 
      venue.id === venueId ? { ...venue, status: 'active' } : venue
    ));
  };

  const approveBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'confirmed' } : booking
    ));
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
            <DollarSign className="h-8 w-8 text-blue-200" />
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
              <p className="text-orange-100">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <Users className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {bookings.slice(0, 3).map(booking => (
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Venues</h3>
          <div className="space-y-3">
            {venues.filter(v => v.status === 'active').slice(0, 3).map(venue => (
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

  const renderVenues = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Venue Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manager</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {venues.map(venue => (
              <tr key={venue.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{venue.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{venue.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{venue.manager}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{venue.bookings}</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">₹{venue.revenue.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    venue.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {venue.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {venue.status === 'pending' ? (
                    <button
                      onClick={() => approveVenue(venue.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                    >
                      Approve
                    </button>
                  ) : (
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Booking Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{booking.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{booking.venue}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{booking.event}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{booking.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">₹{booking.amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.status === 'pending' ? (
                    <button
                      onClick={() => approveBooking(booking.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                    >
                      Approve
                    </button>
                  ) : (
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Bookings</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'eventManager' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role === 'eventManager' ? 'Event Manager' : 'User'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.joinDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.totalBookings}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
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
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
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
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'venues', label: 'Venues', icon: MapPin },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'settings', label: 'Settings', icon: Settings }
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
        {activeTab === 'venues' && renderVenues()}
        {activeTab === 'bookings' && renderBookings()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;