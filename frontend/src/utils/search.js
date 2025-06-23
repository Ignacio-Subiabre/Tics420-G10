export function filtrarEmpresas(empresas, termino) {
  if (!termino) return empresas;
  return empresas.filter(e =>
    e.rut.includes(termino) ||
    e.razonSocial.toLowerCase().includes(termino.toLowerCase())
  );
}
