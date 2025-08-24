import React, { useState } from 'react';
import { User, Mail, Lock, ArrowLeft, Crown } from 'lucide-react';

const AuthPage = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    phone: '',
    businessName: ''
  });

  // Mock users for demo
  const mockUsers = [
    { id: 1, email: 'admin@royalevents.com', password: 'admin123', role: 'admin', name: 'Admin User' },
    { id: 2, email: 'user@example.com', password: 'user123', role: 'user', name: 'John Doe' },
    { id: 3, email: 'manager@venue.com', password: 'manager123', role: 'eventManager', name: 'Venue Manager' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const user = mockUsers.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        onLogin(user);
      } else {
        alert('Invalid credentials');
      }
    } else {
      // Register new user
      const newUser = {
        id: Date.now(),
        ...formData
      };
      onLogin(newUser);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-amber-600" />
              <span className="text-2xl font-bold text-gray-800">RoyalEvents</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back' : 'Join RoyalEvents'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isLogin ? 'Sign in to your account' : 'Create your account today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <select
                    name="role"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="user">User (Book Events)</option>
                    <option value="eventManager">Event Manager (List Venues)</option>
                  </select>
                </div>

                {formData.role === 'eventManager' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-2">Demo Accounts:</h3>
              <div className="text-sm text-amber-700 space-y-1">
                <div>Admin: admin@royalevents.com / admin123</div>
                <div>User: user@example.com / user123</div>
                <div>Manager: manager@venue.com / manager123</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;