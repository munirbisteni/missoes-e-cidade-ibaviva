import React from 'react'
import Clouds from './Clouds';

const Banner = () => {
  return (
    <div id='banner'>
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        {/* Globo atrás */}
        <div className="absolute inset-0 z-0">
          <Clouds /> {/* ou seu componente react-globe.gl */}
        </div>

        {/* Camada de texto acima do globo */}
        <div className="block md:hidden relative z-10 flex flex-col justify-start items-center text-center h-full">
        <div className="pt-20 flex items-center space-x-4">
          <img src="./assets/ibaviva.png" alt="Logo" className="m-0 w-8 h-auto object-contain" />
            <h1 className="text-2xl font-bold text-white">Missões e Cidade | IBAVIVA</h1>
        </div>
        </div>

        <div className="hidden md:flex relative z-10 flex flex-col justify-center items-start text-left h-full px-6">
          <div className="flex items-center space-x-4">
            <img src="./assets/ibaviva.png" alt="Logo" className="w-30 h-auto object-contain" />
            <h1 className="text-6xl font-bold text-white">Missões e Cidade <br/> IBAVIVA</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
