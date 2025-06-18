import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

const faqs = [
  {
    pregunta: "¿Qué es esta plataforma?",
    respuesta: "Es una app que muestra información de empresas chilenas en tiempo real."
  },
  {
    pregunta: "¿Necesito estar registrado para usarla?",
    respuesta: "Puedes explorar sin cuenta, pero para exportar datos necesitas iniciar sesión."
  },
  {
    pregunta: "¿Los datos son oficiales?",
    respuesta: "Sí, provienen del Diario Oficial y otras fuentes públicas verificadas."
  }
];

export default function Faq() {
  const [abierta, setAbierta] = useState(null);

  const toggle = (i) => {
    setAbierta(abierta === i ? null : i);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
      {faqs.map((item, i) => (
        <div key={i} className="border-b py-4">
          <button
            className="w-full flex justify-between items-center text-left text-lg font-medium focus:outline-none"
            onClick={() => toggle(i)}
            aria-expanded={abierta === i}
          >
            {item.pregunta}
            <HiChevronDown
              className={`w-6 h-6 transform transition-transform duration-300 ${abierta === i ? 'rotate-180' : ''}`}
            />
          </button>
          <div
            className={`mt-2 text-gray-600 transition-all duration-300 overflow-hidden ${
              abierta === i ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <p className="pt-2">{item.respuesta}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
