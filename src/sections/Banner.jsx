import React from "react";
import Clouds from "./Clouds";

const Banner = () => {
  return (
    <div id="banner">
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        {/* Globo atrás */}
        <div className="absolute inset-0 z-0">
          <Clouds /> {/* ou seu componente react-globe.gl */}
        </div>

        {/* Camada de texto acima do globo */}
        <div className="block md:hidden relative z-10 flex flex-col justify-start items-center text-center h-full">
          <div className="pt-20 flex items-center space-x-4">
            <img
              src="./assets/ibaviva.png"
              alt="Logo"
              className="m-0 w-8 h-auto object-contain"
            />
            <h1 className="text-2xl font-bold text-white">
              Missões e Cidade | IBAVIVA
            </h1>
          </div>
        </div>

        <div className="hidden md:flex relative z-10 flex-row justify-between items-center h-full px-6 w-full">
          {/* Texto à direita (já existente) */}
          <div className="flex flex-col justify-center items-start text-left w-1/2 pl-6">
            <div className="flex items-center space-x-4">
              <img
                src="./assets/ibaviva.png"
                alt="Logo"
                className="w-30 h-auto object-contain"
              />
              <h1 className="text-6xl font-bold text-white">
                Missões e Cidade <br /> IBAVIVA
              </h1>
            </div>
          </div>
          {/* Texto à esquerda */}
          <div className="flex flex-col justify-center items-end text-right w-1/4 pr-6">
            <p className="text-lg text-gray-200 font-bold">
              Um ministério que capacita e discipula os membros da Ibaviva no entendimento e na participação da missão de Deus para o mundo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
