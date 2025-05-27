import { useState } from 'react';
import RegisterModal from './RegisterModal';

function LoginForm({ onLogin }) {
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
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 z-50">
        <div className="border-8 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin mb-4"></div>
        <p className="text-lg text-gray-600">Iniciando sesión...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-indigo-400 rounded-lg transition"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setShowRegister(true)}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-indigo-400 rounded-lg transition"
            >
              Register
            </button>
          </div>
        </form>

        {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      </div>
    </div>
  );
}

export default LoginForm;
