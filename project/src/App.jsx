import React, { useState, useEffect } from 'react';
import { User, Calendar, MapPin, Star, Phone, Mail } from 'lucide-react';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import EventManagerDashboard from './components/EventManagerDashboard';
import LandingPage from './components/LandingPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      const user = JSON.parse(savedUser);
      if (user.role === 'admin') {
        setCurrentPage('admin');
      } else if (user.role === 'user') {
        setCurrentPage('user');
      } else if (user.role === 'eventManager') {
        setCurrentPage('eventManager');
      }
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    if (user.role === 'admin') {
      setCurrentPage('admin');
    } else if (user.role === 'user') {
      setCurrentPage('user');
    } else if (user.role === 'eventManager') {
      setCurrentPage('eventManager');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('landing');
  };

  const navigateToAuth = () => {
    setCurrentPage('auth');
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
  };

  if (currentPage === 'auth') {
    return <AuthPage onLogin={handleLogin} onBack={navigateToLanding} />;
  }

  if (currentPage === 'admin' && currentUser?.role === 'admin') {
    return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentPage === 'user' && currentUser?.role === 'user') {
    return <UserDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentPage === 'eventManager' && currentUser?.role === 'eventManager') {
    return <EventManagerDashboard user={currentUser} onLogout={handleLogout} />;
  }

  return <LandingPage onNavigateToAuth={navigateToAuth} />;
}

export default App;