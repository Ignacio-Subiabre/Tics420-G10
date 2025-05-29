export default function Header() {
    return (
      <header className="fixed top-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Nombre del Sitio</h1>
          <nav className="space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-500">Inicio</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Empresas</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Contacto</a>
          </nav>
        </div>
      </header>
    );
  }
  