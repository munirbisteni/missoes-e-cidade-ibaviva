// src/components/MissionariosSection.js
import React, { useState, useRef, useEffect } from "react";
import { missionarios } from "../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import Globe from "react-globe.gl";
import * as THREE from "three";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../components/Missionaries.css";

const Misisonaries = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const globeRefDesktop = useRef();
  const globeRefMobile = useRef();
  const globeRefFullscreen = useRef();
  const CLOUDS_IMG_URL = "./assets/clouds.png"; // from https://github.com/turban/webgl-earth
  const CLOUDS_ALT = 0.004;
  const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

  // Move a câmera do globo quando mudar o slide (para todas versões)
  useEffect(() => {
    const { lat, lng } = missionarios[currentIdx].loc[0];

    // Atualiza o globo desktop
    if (globeRefDesktop.current) {
      globeRefDesktop.current.pointOfView({ lat, lng, altitude: 2.2 }, 1000);
    }

    // Atualiza o globo mobile
    if (globeRefMobile.current) {
      globeRefMobile.current.pointOfView({ lat, lng, altitude: 2.5 }, 1000);
    }

    // Atualiza o globo fullscreen
    if (globeRefFullscreen.current) {
      globeRefFullscreen.current.pointOfView({ lat, lng, altitude: 1.8 }, 1000);
    }
  }, [currentIdx]);

  // Configura os globos
  useEffect(() => {
    if (globeRefDesktop.current) setupGlobe(globeRefDesktop.current);
    if (globeRefMobile.current) setupGlobe(globeRefMobile.current);
  }, []);

  // Configura o globo fullscreen quando ele é mostrado
  useEffect(() => {
    if (showFullscreen && globeRefFullscreen.current) {
      setupGlobe(globeRefFullscreen.current);
    }
  }, [showFullscreen]);

  // Impede rolagem quando o fullscreen está ativo
  useEffect(() => {
    if (showFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showFullscreen]);

  // Função para configurar um globo
  // Função para configurar um globo
  const setupGlobe = (globe, missionarioIdx = currentIdx) => {
    const controls = globe.controls();

    // Desabilitar todas as interações
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = false;
    controls.enabled = false;

    // Configurar iluminação básica
    const scene = globe.scene();

    // Verificar se já existem luzes e nuvens na cena
    const existingLights = scene.children.filter(
      (child) =>
        child instanceof THREE.AmbientLight ||
        child instanceof THREE.DirectionalLight
    );

    const existingClouds = scene.children.filter(
      (child) =>
        child instanceof THREE.Mesh &&
        child.geometry instanceof THREE.SphereGeometry &&
        child.material.transparent
    );

    // Adicionar iluminação apenas se não existir
    if (existingLights.length === 0) {
      scene.add(new THREE.AmbientLight(0x888888, 0.6));
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
      dirLight.position.set(5, 3, 5);
      scene.add(dirLight);
    }

    // Adicionar nuvens apenas se não existirem
    if (existingClouds.length === 0) {
      new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
        const globeRadius = globe.getGlobeRadius();
        const clouds = new THREE.Mesh(
          new THREE.SphereGeometry(globeRadius * (1 + CLOUDS_ALT), 75, 75),
          new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
        );
        scene.add(clouds);

        // Função de animação para rotacionar as nuvens
        (function rotateClouds() {
          clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
          requestAnimationFrame(rotateClouds);
        })();
      });
    }

    // Posicionar o globo na localização do missionário
    const { lat, lng } = missionarios[missionarioIdx].loc[0];

    // Determinar a altitude com base no tipo de globo
    let altitude = 2.2; // Padrão para desktop

    if (globe === globeRefMobile.current) {
      altitude = 2.5; // Altitude para mobile
    } else if (globe === globeRefFullscreen.current) {
      altitude = 1.8; // Altitude para fullscreen
    }

    // Centralizar o globo na localização
    globe.pointOfView({ lat, lng, altitude }, 1000);
  };

  // Função para formatar o link do Instagram
  const formatInstagramLink = (username) => {
    // Remove @ se existir
    const formattedUsername = username.startsWith("@")
      ? username.substring(1)
      : username;
    return `https://instagram.com/${formattedUsername}`;
  };

  // Função para formatar o link do WhatsApp
  const formatWhatsAppLink = (phone) => {
    // Remove caracteres não numéricos
    const formattedPhone = phone.replace(/\D/g, "");
    return `https://wa.me/${formattedPhone}`;
  };
  // Cores para o efeito blur - predominância de tons azuis oceânicos
  const blurColors = [
    "#0D2B4B", // Azul marinho profundo
    "#1E3D59", // Azul naval
    "#0F4C81", // Azul royal médio
    "#003366", // Azul clássico profundo
    "#1A5276", // Azul petróleo
    "#2874A6", // Azul cerúleo
    "#21618C", // Azul safira
    "#154360", // Azul índigo escuro
    "#2980B9", // Azul brilhante
    "#0E2C54", // Azul noite
  ];
  return (
    <section
      id="missionarios"
      className="relative overflow-hidden py-16 md:ml-60"
    >
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
              loop
              autoplay={{ delay: 10000, disableOnInteraction: false }}
              modules={[Pagination, Navigation, Autoplay]}
              pagination={{ clickable: true }}
              slidesPerView={1}
              spaceBetween={20}
              onSlideChange={(swiper) => setCurrentIdx(swiper.realIndex)}
            >
              {missionarios.map((m, idx) => (
                <SwiperSlide key={idx}>
                  <h3 className="text-2xl font-semibold mb-4">
                    {m.nome.join(" e ")}
                  </h3>
                  <p className=" text-gray-800 mb-4">{m.descricao}</p>
                  <div className="space-y-2 text-gray-700 pb-10">
                    {m.contato.instagram && (
                      <p>
                        <strong>Instagram:</strong>{" "}
                        {m.contato.instagram.join(" / ")}
                      </p>
                    )}
                    {m.contato.telefone && (
                      <p>
                        <strong>Telefone:</strong>{" "}
                        {m.contato.telefone.join(" / ")}
                      </p>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Layout para mobile - com botão explorar */}
      <div className="md:hidden px-4">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Missionários
        </h2>

        <div className="flex flex-col items-center">
          {/* Globo pequeno para preview */}
          <div
            className="
              w-full h-[180px]
              flex items-center justify-center
              pointer-events-none
              mb-4
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
              pointRadius={(d) => d.size / 40}
              pointLabel="text"
              dragRotate={false}
              pointerEventsFilter={() => false}
              width={280}
              height={280}
            />
          </div>

          {/* Botão Explorar com efeito blur verde água e azul */}
          <button
            onClick={() => {
              setShowFullscreen(true);

              // O setupGlobe será chamado pelo useEffect que monitora showFullscreen
              // e já vai posicionar o globo corretamente
            }}
            className="
    relative overflow-hidden
    w-full py-4 rounded-xl
    text-white font-bold text-lg
    shadow-lg
    transform hover:scale-105 transition-transform
    focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50
    z-10
  "
          >
            {/* Conteúdo do botão (sem alterações) */}
            <div className="absolute inset-0 backdrop-blur-md bg-blue-500/40"></div>

            <div className="absolute inset-0 overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full blur-xl opacity-60 animate-pulse-slow"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${30 + Math.random() * 70}px`,
                    height: `${30 + Math.random() * 70}px`,
                    backgroundColor: blurColors[i % blurColors.length],
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 7}s`,
                  }}
                ></div>
              ))}
            </div>

            <div className="relative flex items-center justify-center gap-2">
              <span>Explorar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
      {/* Modal de tela cheia para mobile */}
      {showFullscreen && (
        <div className="md:hidden fixed inset-0 bg-black z-50 flex flex-col">
          {/* Botão de fechar */}
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 z-50 bg-white/20 backdrop-blur-sm p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Globo em tela cheia */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe
                ref={globeRefFullscreen}
                animateIn={false}
                enablePointerInteraction={false}
                globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
                backgroundColor="rgba(0,0,0,0)"
                pointsData={missionarios[currentIdx].loc}
                pointLat="lat"
                pointLng="lng"
                pointColor={(d) => d.color}
                pointRadius={(d) => d.size / 30}
                pointLabel="text"
                dragRotate={false}
                pointerEventsFilter={() => false}
                width={window.innerWidth}
                height={window.innerHeight * 0.6}
              />
            </div>

            {/* Paginação manual em vez de usar a do Swiper */}
            <div className="absolute bottom-6 left-0 right-0 z-20">
              <div className="flex justify-center items-center gap-3">
                {missionarios.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      // Encontrar a instância do Swiper e ir para o slide
                      const swiperInstance =
                        document.querySelector(".swiper")?.swiper;
                      if (swiperInstance) {
                        swiperInstance.slideTo(index);
                      }
                    }}
                    className={`pagination-bullet ${
                      index === currentIdx ? "pagination-bullet-active" : ""
                    }`}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Informações do missionário em tela cheia */}
          <div
            className="
      bg-white
      rounded-t-3xl
      px-6 pt-8 pb-12
      shadow-[0_-10px_30px_rgba(0,0,0,0.2)]
      relative z-10
      max-h-[50vh]
      overflow-y-auto
    "
          >
            {/* Indicador de arraste */}
            <div className="w-20 h-1 bg-gray-200 rounded-full mb-6 mx-auto"></div>

            {/* Swiper sem paginação (vamos usar a nossa personalizada) */}
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              spaceBetween={20}
              onSlideChange={(swiper) => setCurrentIdx(swiper.realIndex)}
              className="missionary-swiper"
            >
              {missionarios.map((m, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-bold mb-4 text-center text-primary">
                      {m.nome.join(" e ")}
                    </h3>
                    <p className="text-gray-700 mb-6 text-center leading-relaxed">
                      {m.descricao}
                    </p>
                    <div className="w-full space-y-4 text-gray-700 mt-2 border-t border-gray-100 pt-4">
                      {/* Contatos Instagram (sem alterações) */}
                      {m.contato.instagram &&
                        m.contato.instagram.map((insta, i) => (
                          <a
                            key={`instagram-${i}`}
                            href={formatInstagramLink(insta)}
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                          >
                            <div className="bg-primary/10 p-2 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-primary"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                            </div>
                            <p className="text-base flex-1">{insta}</p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        ))}

                      {/* Contatos Telefone (sem alterações) */}
                      {m.contato.telefone &&
                        m.contato.telefone.map((tel, i) => (
                          <a
                            key={`telefone-${i}`}
                            href={formatWhatsAppLink(tel)}
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                          >
                            <div className="bg-green-500/10 p-2 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                              </svg>
                            </div>
                            <p className="text-base flex-1">{tel}</p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </section>
  );
};

export default Misisonaries;
