// src/components/Footer.js
import React from 'react';
import { FaWhatsapp, FaInstagram, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Seção de contato - Layout desktop mantido como estava */}
          <div className="hidden md:flex md:flex-row items-center gap-4">
            {/* Botão do WhatsApp */}
            <a 
              href="https://wa.me/5519991100133" 
               
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
            >
              <FaWhatsapp size={20} />
              <span>Quer saber mais? Entre em contato com a gente.</span>
            </a>
            
            {/* Botão do Instagram */}
            <a 
              href="https://www.instagram.com/ibaviva/" 
               
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full transition-colors"
            >
              <FaInstagram size={20} />
              <span>@ibaviva</span>
            </a>
            
            {/* Link para o site da IBAVIVA */}
            <a 
              href="https://ibaviva.com.br" 
               
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full transition-colors"
            >
              <div className="w-5 h-5 relative">
                <img 
                  src="/assets/ibaviva.png" 
                  alt="IBAVIVA" 
                  className="w-full h-full object-contain filter grayscale brightness-200 contrast-200"
                />
              </div>
              <span>ibaviva.com.br</span>
            </a>
          </div>
          
          {/* Seção de contato - Layout mobile otimizado */}
          <div className="flex flex-col md:hidden items-center gap-4 w-full">
            {/* Botão do WhatsApp */}
            <a 
              href="https://wa.me/5519991100133" 
               
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors w-full justify-center"
            >
              <FaWhatsapp size={20} />
              <span className="text-sm">Quer saber mais? Entre em contato</span>
            </a>
            
            {/* Container para Instagram e Site (lado a lado em mobile) */}
            <div className="flex flex-row gap-3 w-full justify-center">
              {/* Botão do Instagram */}
              <a 
                href="https://www.instagram.com/ibaviva/" 
                 
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full transition-colors"
              >
                <FaInstagram size={20} />
                <span className="text-sm">@ibaviva</span>
              </a>
              
              {/* Link para o site da IBAVIVA */}
              <a 
                href="https://ibaviva.com.br" 
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full transition-colors"
              >
                <div className="w-5 h-5 relative">
                  <img 
                    src="/assets/ibaviva.png" 
                    alt="IBAVIVA" 
                    className="w-full h-full object-contain filter grayscale brightness-200 contrast-200"
                  />
                </div>
                <span className="text-sm">ibaviva.com.br</span>
              </a>
            </div>
          </div>
          
          {/* Créditos */}
          <div className="text-gray-400 text-sm mt-4 md:mt-0">
            @ibaviva 2025 - Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;