export default function Footer() {
  return (
    <footer className="mt-12 py-6 bg-indigo-300 text-center text-sm text-gray-600">
      <div className="mb-2">
        <a href="/politicas" className="hover:underline mx-2">Políticas</a>·
        <a href="/terminos" className="hover:underline mx-2">Términos</a>
      </div>
      <div>© {new Date().getFullYear()} EmpresasDB · Todos los derechos reservados</div>
    </footer>
  );
}

