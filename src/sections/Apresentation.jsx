import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; // Icons de seta

const Apresentation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(prevState => !prevState);

  return (
    <section className="py-12 px-6 md:px-16¢¢ max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-6">
        Um ministério que existe para capacitar e discipular os membros da Ibaviva no entendimento e participação da missão de Deus para o mundo.
      </h2>

      {/* Acordeão para celular */}
      <div className="md:hidden">
        <div
          onClick={toggleAccordion}
          className={`cursor-pointer justify-center flex items-center gap-3 text-xl text-primary mb-4 py-3 px-6 rounded-lg transition-all duration-300 
            ${isOpen ? 'bg-tertiary text-white' : 'bg-primary text-white'} 
            hover:bg-tertiary hover:text-white`} 
        >
          <span>Saiba mais</span> {/* Texto do título */}
          
          {/* Container para a seta */}
          <span className="transition-transform duration-300 ml-3">
            <IoIosArrowDown
              className={`text-2xl text-white transform transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </div>

        <div
          className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
        >
          {isOpen && (
            <div className="text-lg md:text-xl text-secondary bg-gray-100 p-5 rounded-b-lg shadow-lg rounded-lg">
              <p className="mb-4">
                Desenvolvendo uma série de ações como trabalhos sociais, viagens missionárias e movimentos de expansão do evangelho.
              </p>
              <p className="mb-4">
                Entendendo as preocupações da cidade e seus problemas. Envolvidos em escolas, empresas, comunidades carentes e trabalho com crianças vulneráveis.
              </p>
              <p className="mb-4">
                Fazemos tudo isso para compartilhar o Evangelho de Cristo e sermos um exemplo vivo do seu amor. E por meio dele promover uma transformação da cidade de Vinhedo, regiões ao redor e até os confins da terra.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Para desktop: conteúdo sempre visível */}
      <div className="hidden md:block">
        <p className="text-lg md:text-xl text-secondary mb-4">
          Desenvolvendo uma série de ações como trabalhos sociais, viagens missionárias e movimentos de expansão do evangelho.
        </p>
        <p className="text-lg md:text-xl text-secondary mb-4">
          Entendendo as preocupações da cidade e seus problemas. Envolvidos em escolas, empresas, comunidades carentes e trabalho com crianças vulneráveis.
        </p>
        <p className="text-lg md:text-xl text-secondary mb-4">
          Fazemos tudo isso para compartilhar o Evangelho de Cristo e sermos um exemplo vivo do seu amor. E por meio dele promover uma transformação da cidade de Vinhedo, regiões ao redor e até os confins da terra.
        </p>
      </div>
    </section>
  );
};

export default Apresentation;
