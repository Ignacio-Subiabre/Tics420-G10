import { filtrarEmpresas } from './search';

describe('filtrarEmpresas', () => {
  const datos = [
    { rut: '12345678-9', razonSocial: 'Empresa Uno' },
    { rut: '98765432-1', razonSocial: 'Empresa Dos' },
    { rut: '55555555-5', razonSocial: 'Otra Sociedad' },
  ];

  it('devuelve todos si el término es vacío', () => {
    const resultado = filtrarEmpresas(datos, '');
    expect(resultado).toHaveLength(3);
  });

  it('filtra por RUT', () => {
    const resultado = filtrarEmpresas(datos, '9876');
    expect(resultado).toEqual([{ rut: '98765432-1', razonSocial: 'Empresa Dos' }]);
  });

  it('filtra por razón social (case insensitive)', () => {
    const resultado = filtrarEmpresas(datos, 'empresa');
    expect(resultado).toHaveLength(2);
  });

  it('devuelve vacío si no hay coincidencias', () => {
    const resultado = filtrarEmpresas(datos, 'sin coincidencias');
    expect(resultado).toHaveLength(0);
  });
  
  it('filtra correctamente por parte del nombre sin importar mayúsculas', () => {
  const resultado = filtrarEmpresas(datos, 'sociedad');
  expect(resultado).toEqual([{ rut: '55555555-5', razonSocial: 'Otra Sociedad' }]);
  });
  
  it('devuelve múltiples coincidencias si aplica para más de una empresa', () => {
    const resultado = filtrarEmpresas(datos, 'Empresa');
    expect(resultado).toEqual([
      { rut: '12345678-9', razonSocial: 'Empresa Uno' },
      { rut: '98765432-1', razonSocial: 'Empresa Dos' }
    ]);
  });

});
