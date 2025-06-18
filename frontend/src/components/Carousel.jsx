import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, A11y } from 'swiper/modules';

export default function Carousel() {
  const testimonios = [
    {
      nombre: "S&S Inmobiliaria",
      imagen: "/images/S&SInmobiliaria.png", // reemplaza con logo real
      frase: "“Nos ayudaron a crecer más rápido que nunca.”"
    },
    {
      nombre: "Magnolia Propiedades",
      imagen: "/images/Magnolia.jpg",
      frase: "“Excelente plataforma para visualizar empresas.”"
    },
    {
      nombre: "CIRION Technologies",
      imagen: "/images/Cirion.jpg",
      frase: "“Información clara y navegación ágil.”"
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        className="rounded-lg shadow-md"
      >
        {testimonios.map((item, index) => (
          <SwiperSlide key={index} className="bg-white p-6 text-center">
            <img
              src={item.imagen}
              alt={item.nombre}
              className="mx-auto mb-4 w-160 h-60 object-cover border border-gray-200 shadow-md"
              loading="lazy"
            />
            <p className="text-lg font-semibold">{item.nombre}</p>
            <p className="text-gray-600 italic mt-2">{item.frase}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
