import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateOrder from "./pages/CreateOrder";
import TrackDelivery from "./pages/TrackDelivery";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyDeliveries from "./pages/MyDeliveries";
import Services from "./pages/Services";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/Home");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/track" element={<TrackDelivery />} />
          <Route path="/deliveries" element={<MyDeliveries />} />
          <Route path="/track-delivery" element={<TrackDelivery />} />
          <Route path="/services" element={<Services />} />
          
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;