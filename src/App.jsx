import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Analytics from './pages/Analytics/Analytics';
import Agents from './pages/Agents/Agents';
import './App.css'
import Login from './pages/Login/Login';
import axios from 'axios';
import Reset from './pages/Resetpassword/Reset';

const API_URL = import.meta.env.VITE_API || "http://localhost:4040";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get(`${API}/auth/checklogin`, { withCredentials: true });
        if (res.data.loggedIn) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);


  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Analytics/>: <Navigate to="/login" />}
        />
         <Route
          path="/agents"
          element={isLoggedIn ? <Agents/>: <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path='/resetpassword' element={<Reset/>}/>
      </Routes>

    </Router>
  );
};



export default App;
