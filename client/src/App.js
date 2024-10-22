import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';
import SoilList from './components/SoilList';
import DistributorList from './components/DistributorList';
 import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register'; 
import Dashboard from './components/Dashboard';
import User from './components/User';
import AdminLogin from './components/AdminLogin';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/soils" element={<SoilList />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/distributors" element={<DistributorList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
              
            </ProtectedRoute>
          }
          />
          <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
              
            </ProtectedRoute>
          }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
