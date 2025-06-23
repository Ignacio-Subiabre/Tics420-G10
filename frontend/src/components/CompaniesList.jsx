import { useEffect, useState } from 'react';

function ObjetoModal({ objeto, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 max-w-lg w-full rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Objeto</h3>
        <p className="whitespace-pre-line text-gray-800">{objeto}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default function CompaniesList() {
  const [empresas, setEmpresas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [modalObjeto, setModalObjeto] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/companies')
      .then(res => res.json())
      .then(data => {
        console.log('✅ Datos recibidos:', data);
        setEmpresas(data);
      })
      .catch(err => console.error('❌ Error al cargar empresas:', err));
  }, []);

  const empresasFiltradas = empresas.filter((e) => {
    const filtroLower = filtro.toLowerCase();
    return (
      (e.rut || '').toLowerCase().includes(filtroLower) ||
      (e.razon_social || '').toLowerCase().includes(filtroLower)
    );
  });

  const handleDownload = (type) => {
    const endpoint = type === 'csv'
      ? 'http://localhost:3001/api/companies/download/csv'
      : 'http://localhost:3001/api/companies/download/json';
    window.open(endpoint, '_blank');
  };

  return (
    <div className="p-4 space-y-4 w-full max-w-full overflow-x-hidden">
      <input
        type="text"
        placeholder="Buscar por RUT o Razón Social..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleDownload('csv')}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Descargar CSV
        </button>
        <button
          onClick={() => handleDownload('json')}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Descargar JSON
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 text-left">RUT</th>
              <th className="p-2 text-left">Razón Social</th>
              <th className="p-2 text-left">Tipo de Evento</th>
              <th className="p-2 text-left">Archivo</th>
              <th className="p-2 text-left">Capital</th>
              <th className="p-2 text-left">Objeto</th>
            </tr>
          </thead>
          <tbody>
            {empresasFiltradas.map((empresa, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 break-words">{empresa.rut || '—'}</td>
                <td className="p-2 break-words">{empresa.razon_social || '—'}</td>
                <td className="p-2 break-words">{empresa.tipo_evento || '—'}</td>
                <td className="p-2 break-words">{empresa.archivo || '—'}</td>
                <td className="p-2 break-words">{empresa.capital || '—'}</td>
                <td className="p-2">
                  {empresa.objeto ? (
                    <button
                      onClick={() => setModalObjeto(empresa.objeto)}
                      className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Ver
                    </button>
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalObjeto && (
        <ObjetoModal objeto={modalObjeto} onClose={() => setModalObjeto(null)} />
      )}
    </div>
  );
}
