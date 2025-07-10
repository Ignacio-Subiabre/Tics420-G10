import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'Nosotros' },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md relative">
      {/* Logo */}
      <div className="flex items-center gap-2 text-purple-600 text-2xl font-extrabold">
        <span>EmpresasDB</span>
      </div>

      {/* Botón hamburguesa */}
      <button
        className="md:hidden p-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
      </button>

      {/* Navegación */}
      <nav
        className={`
          ${open ? 'absolute translate-y-0' : 'absolute -translate-y-full'}
          top-full left-0 w-full bg-white shadow-md transition-transform duration-300 ease-in-out z-50
          md:static md:translate-y-0 md:shadow-none md:w-auto
        `}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
          {navLinks.map(link => (
            <li key={link.to} className="mb-2 md:mb-0">
              <Link
                to={link.to}
                className="block px-2 py-1 rounded hover:bg-indigo-100"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
