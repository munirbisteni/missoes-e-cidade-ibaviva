// src/components/MissionariosSection.js
import React, { useState, useRef, useEffect } from 'react';
import { missionarios } from '../constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Misisonaries = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const globeRefDesktop = useRef();
  const globeRefMobile = useRef();
  const CLOUDS_IMG_URL = './assets/clouds.png'; // from https://github.com/turban/webgl-earth
  const CLOUDS_ALT = 0.004;
  const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame
  
  // Move a câmera do globo quando mudar o slide (para ambas versões)
  useEffect(() => {
    const { lat, lng } = missionarios[currentIdx].loc[0];
    
    // Atualiza o globo desktop
    if (globeRefDesktop.current) {
      globeRefDesktop.current.pointOfView(
        { lat, lng, altitude: 2.2 },
        1000
      );
    }
    
    // Atualiza o globo mobile
    if (globeRefMobile.current) {
      globeRefMobile.current.pointOfView(
        { lat, lng, altitude: 2.2 },
        1000
      );
    }
  }, [currentIdx]);

  // Configura o globo desktop
  useEffect(() => {
    if (!globeRefDesktop.current) return;
    
    setupGlobe(globeRefDesktop.current);
  }, []);
  
  // Configura o globo mobile
  useEffect(() => {
    if (!globeRefMobile.current) return;
    
    setupGlobe(globeRefMobile.current);
  }, []);
  
  // Função para configurar um globo
  const setupGlobe = (globe) => {
    const controls = globe.controls();
    
    // Desabilitar todas as interações
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = false;
    controls.enabled = false;
    
    // Configurar iluminação básica
    const scene = globe.scene();
    scene.add(new THREE.AmbientLight(0x888888, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);
    
    // Adicionar nuvens
    new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
      const globeRadius = globe.getGlobeRadius();
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globeRadius * (1 + CLOUDS_ALT), 75, 75),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      );
      scene.add(clouds);

      // Função de animação para rotacionar as nuvens
      (function rotateClouds() {
        clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });
  };

  return (
    <section className="relative overflow-hidden py-16 md:ml-60">
      {/* Layout para desktop - mantém o design original */}
      <div className="hidden md:block">
        <h2 className="text-5xl font-bold text-primary mb-10 ml-70 text-left">
          Missionários
        </h2>

        <div className="relative flex items-center justify-start min-h-[500px]">
          {/* Globo atrás, menor e deslocado um pouco à direita */}
          <div
            className="
              absolute top-0 bottom-0 left-[60%] transform -translate-x-1/2
              flex items-center justify-center
              w-1/3 h-full
              pointer-events-none
            "
          >
            <Globe
              ref={globeRefDesktop}
              animateIn={false}
              enablePointerInteraction={false}
              globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
              backgroundColor="rgba(0,0,0,0)"
              pointsData={missionarios[currentIdx].loc}
              pointLat="lat"
              pointLng="lng"
              pointColor={(d) => d.color}
              pointRadius={(d) => d.size / 50}
              pointLabel="text"
              dragRotate={false}
              pointerEventsFilter={() => false}
            />
          </div>

          {/* Texto "frosted glass" à frente */}
          <div
            className="
              relative z-10 w-1/2
              px-6 py-8
              backdrop-blur-sm bg-white/75
              rounded-lg shadow-lg
              ml-20
            "
          >
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              slidesPerView={1}
              spaceBetween={20}
              onSlideChange={(swiper) =>
                setCurrentIdx(swiper.realIndex)
              }
            >
              {missionarios.map((m, idx) => (
                <SwiperSlide key={idx}>
                  <h3 className="text-2xl font-semibold mb-4">
                    {m.nome.join(' e ')}
                  </h3>
                  <p className=" text-gray-800 mb-4">{m.descricao}</p>
                  <div className="space-y-2 text-gray-700 pb-10">
                    {m.contato.instagram && (
                      <p>
                        <strong>Instagram:</strong>{' '}
                        {m.contato.instagram.join(' / ')}
                      </p>
                    )}
                    {m.contato.telefone && (
                      <p>
                        <strong>Telefone:</strong>{' '}
                        {m.contato.telefone.join(' / ')}
                      </p>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Layout para mobile - novo design */}
      <div className="md:hidden px-4">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Missionários
        </h2>

        <div className="flex flex-col items-center">
          {/* Texto em cima para mobile */}
          <div
            className="
              w-full mb-4
              px-4 py-6
              backdrop-blur-sm bg-white/75
              rounded-lg shadow-lg
              z-10
            "
          >
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              slidesPerView={1}
              spaceBetween={20}
              onSlideChange={(swiper) =>
                setCurrentIdx(swiper.realIndex)
              }
            >
              {missionarios.map((m, idx) => (
                <SwiperSlide key={idx}>
                  <h3 className="text-xl font-semibold mb-3 text-center">
                    {m.nome.join(' e ')}
                  </h3>
                  <p className="text-sm text-gray-800 mb-4">{m.descricao}</p>
                  <div className="space-y-2 text-gray-700 text-sm pb-10">
                    {m.contato.instagram && (
                      <p>
                        <strong>Instagram:</strong>{' '}
                        {m.contato.instagram.join(' / ')}
                      </p>
                    )}
                    {m.contato.telefone && (
                      <p>
                        <strong>Telefone:</strong>{' '}
                        {m.contato.telefone.join(' / ')}
                      </p>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Globo embaixo para mobile - aumentado e mais próximo */}
          <div
            className="
              w-full h-[380px]
              flex items-center justify-center
              pointer-events-none
              -mt-2
            "
          >
            <Globe
              ref={globeRefMobile}
              animateIn={false}
              enablePointerInteraction={false}
              globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
              backgroundColor="rgba(0,0,0,0)"
              pointsData={missionarios[currentIdx].loc}
              pointLat="lat"
              pointLng="lng"
              pointColor={(d) => d.color}
              pointRadius={(d) => d.size / 50}
              pointLabel="text"
              dragRotate={false}
              pointerEventsFilter={() => false}
              width={350}
              height={350}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Misisonaries;