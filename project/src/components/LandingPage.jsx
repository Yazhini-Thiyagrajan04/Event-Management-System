import React from 'react';
import { Calendar, MapPin, Star, Phone, Mail, Users, Crown, Sparkles } from 'lucide-react';

const LandingPage = ({ onNavigateToAuth }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-amber-600" />
              <span className="text-2xl font-bold text-gray-800">RoyalEvents</span>
            </div>
            <button
              onClick={onNavigateToAuth}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Login / Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-amber-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Premium Event Halls
            <span className="block text-amber-600">For Every Celebration</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Book the perfect venue for your special occasions. From intimate gatherings to grand celebrations, 
            we have the ideal space for your memorable moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onNavigateToAuth}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Book Your Event
            </button>
            <button
              onClick={onNavigateToAuth}
              className="bg-white border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
            >
              List Your Venue
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose RoyalEvents?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
              <MapPin className="h-12 w-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Premium Locations</h3>
              <p className="text-gray-600">
                Carefully curated venues in prime locations across India, perfect for every type of celebration.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 border border-red-200">
              <Sparkles className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Full-Service Planning</h3>
              <p className="text-gray-600">
                Complete event management with catering, decoration, photography, and entertainment services.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Expert Support</h3>
              <p className="text-gray-600">
                Dedicated event coordinators to ensure your special day is flawless and memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-xl">Premium Venues</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-xl">Happy Events</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-xl">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8⭐</div>
              <div className="text-xl">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="h-8 w-8 text-amber-400" />
                <span className="text-2xl font-bold">RoyalEvents</span>
              </div>
              <p className="text-gray-300">
                Making your special moments unforgettable with premium venues and exceptional service.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-amber-400">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-amber-400">Venues</a></li>
                <li><a href="#" className="text-gray-300 hover:text-amber-400">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-amber-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-amber-400">Wedding Halls</a></li>
                <li><a href="#" className="text-gray-300 hover:text-amber-400">Birthday Parties</a></li>
                <li><a href="#" className="text-gray-300 hover:text-amber-400">Corporate Events</a></li>
                <li><a href="#" className="text-gray-300 hover:text-amber-400">Cultural Programs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-gray-300">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-gray-300">info@royalevents.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 RoyalEvents. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;