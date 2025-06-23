import { useState } from 'react';
import RegisterModal from './RegisterModal';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes('@')) return alert('El correo debe contener un @');
    if (password.length < 6) return alert('La contraseña debe tener al menos 6 caracteres');

    try {
      setLoading(true);

      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      setTimeout(() => {
        setLoading(false);
        if (res.ok) {
          localStorage.setItem('token', data.token);
          onLogin();
        } else {
          alert(data.error || 'Error al iniciar sesión');
        }
      }, 3000);
    } catch (error) {
      setLoading(false);
      alert('Error al conectar con el servidor');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
        <div className="w-16 h-16 border-8 border-gray-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-white mt-2">Iniciando sesión...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-indigo-300 bg-opacity-50 flex items-center justify-center z-50 px-4 overflow-hidden">
      <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mb-6">
          Bienvenido de nuevo
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => setShowRegister(true)}
              className="flex-1 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold rounded-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Registrarse
            </button>
          </div>
        </form>

        {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      </div>
    </div>
  );
}
