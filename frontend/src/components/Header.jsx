import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi'; 
// Si no tienes react-icons: npm install react-icons

export default function Header() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Nosotros' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">MiLogo</div>

      {/* Botón hamburguesa en móvil */}
      <button
        className="md:hidden p-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <HiX className="w-6 h-6"/> : <HiMenu className="w-6 h-6"/>}
      </button>

      {/* Navegación */}
      <nav className={`
        absolute top-full left-0 w-full bg-white shadow-md transition-transform
        md:static md:shadow-none md:w-auto
        ${open ? 'translate-y-0' : '-translate-y-full'} 
        md:translate-y-0
      `}>
        <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
          {navLinks.map(link => (
            <li key={link.href} className="mb-2 md:mb-0">
              <a
                href={link.href}
                className="block px-2 py-1 rounded hover:bg-indigo-100"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}



