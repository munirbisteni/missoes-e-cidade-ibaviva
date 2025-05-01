// src/components/ProjetosCarousel.js

import React, { useState, useRef } from 'react';
import { projetos } from '../constants';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../components/ProjetosCarousel.css';

const ProjetosCarousel = () => {
    const [modalImage, setModalImage] = useState(null);
    const openModal = (img) => setModalImage(img);
    const closeModal = () => setModalImage(null);

    const [imgIndex, setImgIndex] = useState(projetos.map(() => 0));
    const swiperRef = useRef();

    const calculateNotVisibleIndex = (actualIndex) => {
        let add = 3;
        let notVisibleIndex = actualIndex;
        while(add > 0){
            if(notVisibleIndex + 1 >= projetos.length){
                notVisibleIndex = 0;
            }
            else
            {
                notVisibleIndex += 1;
            }
            add -= 1;
        }
        return notVisibleIndex;
    }

    let lastRealIndex = 0;
    const handleSlideChange = (swiper) => {
        const currentIndex = swiper.realIndex;  // Índice do slide atual
        if(currentIndex != lastRealIndex){
            lastRealIndex = currentIndex;
            let idx6 = calculateNotVisibleIndex(currentIndex);
            imgIndex[idx6] = imgIndex[idx6] + 1 >= projetos[idx6].imagens.length ? 0 : imgIndex[idx6] + 1;
        } 
      };

  return (
    <section id="projetos" className="py-16 px-5 sm:px-10 max-w-7xl mx-auto">
    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-10 text-center">Projetos</h2>

    {/* Desktop: carrossel de projetos */}
        <div className="hidden md:block">
            <Swiper
            loop
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            centeredSlides
            centeredSlidesBounds
            slidesPerView={5}
            spaceBetween={30}
            onSlideChange={handleSlideChange}  // Aqui estamos passando o handler
            className="overflow-visible px-10"
            >
            {projetos.map((proj, idx) => (
                <SwiperSlide key={proj.titulo} data-index={idx}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
                    <div className="p-4 flex-1 flex flex-col justify-start">
                    <h3 className="text-lg font-semibold mb-2">{proj.titulo}</h3>
                    <p className="text-gray-600 text-sm flex-1 whitespace-pre-line">{proj.descricao}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {Object.entries(proj.urlProjeto).map(([k, url]) =>
                        url ? (
                            <a
                            key={k}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white-600 underline text-xs"
                            >
                            {k.charAt(0).toUpperCase() + k.slice(1)}
                            </a>
                        ) : null
                        )}
                    </div>
                    </div>
                    <img
                    src={proj.imagens[imgIndex[idx]]}
                    alt={proj.titulo}
                    className="w-full h-40 object-cover"
                    />
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>

      {/* Mobile: colunas empilhadas */}
      <div className="md:hidden space-y-16">
        {projetos.map((proj, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Texto e links */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{proj.titulo}</h3>
              <p className="text-gray-600 text-sm whitespace-pre-line">{proj.descricao}</p>
              {proj.lista && (
                <ul className="list-disc ml-6 mt-2 text-gray-600">
                  {proj.lista.map((item,i) => <li key={i}>{item}</li>)}
                </ul>
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                {Object.entries(proj.urlProjeto).map(([k, url]) =>
                  url ? (
                    <a
                      key={k}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      {k.charAt(0).toUpperCase() + k.slice(1)}
                    </a>
                  ) : null
                )}
              </div>
            </div>
            {/* Carrossel de imagens */}
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              slidesPerView={1}
              className="h-48"
              loop
            >
              {proj.imagens.map((img,i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={`${proj.titulo} ${i+1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openModal(img)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>

      {/* Modal para mobile */}
      {modalImage && (
        <div
            className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-5"
            onClick={closeModal}
        >
          <img src={modalImage} alt="Preview" className="max-w-full max-h-full rounded" />
        </div>
      )}
    </section>
  );
};

export default ProjetosCarousel;
