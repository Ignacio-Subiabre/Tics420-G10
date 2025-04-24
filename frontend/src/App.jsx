import React, { useState } from 'react';
import CompaniesList from "./components/CompaniesList";
import LoginForm from "./components/LoginForm";
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
  );
}

export default App;
