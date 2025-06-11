import React, { useState } from 'react';
import CompaniesList from "./components/CompaniesList";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
      <>
        <Header /> 
    <div className="app-container">
      <h1 className="title">Company Processor</h1>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          <CompaniesList />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>

    <Footer />
  </>
  );
}

export default App;
