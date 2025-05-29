import { useState } from 'react';
import CompaniesList from './components/CompaniesList';
import LoginForm from './components/LoginForm';
import RegisterModal from './components/RegisterModal';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white shadow p-4 rounded">
            {!isLoggedIn ? (
              <>
                <LoginForm onLogin={() => setIsLoggedIn(true)} />
                <button
                  className="mt-4 text-blue-500 hover:underline"
                  onClick={() => setShowRegister(true)}
                >
                  ¿No tienes cuenta? Regístrate
                </button>
              </>
            ) : (
              <CompaniesList />
            )}
          </div>
          <div className="bg-gray-50 shadow p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Información</h2>
            <p className="text-sm text-gray-600">
              Este es un proyecto de programación profesional. Usa Tailwind para estilos y muestra empresas tras iniciar sesión.
            </p>
          </div>
        </div>

        {showRegister && (
          <RegisterModal onClose={() => setShowRegister(false)} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
