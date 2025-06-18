import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompaniesList from "./components/CompaniesList";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header />
      <div className="app-container">
        <h1 className="title">Company Processor</h1>

        <Routes>
          <Route path="/" element={
            isLoggedIn ? (
              <>
                <button onClick={handleLogout} className="logout-button">Logout</button>
                <CompaniesList />
              </>
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          } />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
