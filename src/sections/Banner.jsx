import React from "react";
import Clouds from "./Clouds";

const Banner = () => {
  return (
    <div id="banner">
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        {/* Globo atrás */}
        <div className="absolute inset-0 z-0">
          <Clouds />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-start md:justify-between items-center h-full px-4 md:px-6 w-full">
          <div className="flex flex-col justify-center items-center md:items-start w-full md:w-1/2 mt-12 md:mt-0">
            <img
              src="./assets/logoMissoes.svg"
              alt="Logo Missões e Cidade IBAVIVA"
              className="h-16 md:h-32 w-auto object-contain"
              style={{ maxWidth: "600px" }} // aumente para desktop se quiser ainda maior
            />
          </div>
          <div className="mt-8 md:mt-0 hidden md:flex flex-col justify-center items-end text-right w-full md:w-1/4 pr-0 md:pr-6">
            <p className="text-base md:text-lg text-gray-200 font-bold">
              Um ministério que capacita e discipula os membros da Ibaviva no entendimento e na participação da missão de Deus para o mundo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;