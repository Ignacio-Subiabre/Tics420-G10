import { useState } from 'react';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function RegisterModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email.includes('@')) return alert('Correo inválido');
    if (password.length < 6) return alert('Contraseña debe tener al menos 6 caracteres');

    try {
      const res = await fetch(`${backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Usuario registrado correctamente');
        onClose();
      } else {
        alert(data.error || 'Error al registrar');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-6">Registro</h2>
        <form onSubmit={handleRegister} className="space-y-4">
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
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-indigo-400 rounded-lg transition"
            >
              Registrar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-red-400 hover:bg-red-500 text-indigo-400 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
