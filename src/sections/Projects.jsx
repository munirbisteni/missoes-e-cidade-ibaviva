import React, { useState } from 'react';
import { projects } from '../constants'; // Importando a constante com os projetos

const ProjectCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative max-w-full">
      <img
        src={images[currentImageIndex]}
        alt="Projeto"
        className="w-full h-auto object-cover rounded-lg"
      />
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl"
      >
        &#10095;
      </button>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="py-12 px-6 md:px-16¢¢ max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Nossos Projetos</h2>
      {projects.map((project) => (
        <div key={project.id} className="flex flex-col sm:flex-row items-center mb-16 gap-8">
          {/* Texto à esquerda */}
          <div className="flex-1 text-left max-w-xl">
            <h3 className="text-2xl font-semibold">{project.title}</h3>
            <p className="text-lg mt-4">{project.description}</p>
          </div>

          {/* Carrossel à direita */}
          <div className="flex-1 max-w-md">
            <ProjectCarousel images={project.images} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;
