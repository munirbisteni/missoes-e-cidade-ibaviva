import { navLinks } from "../constants";
import React, { useState, useEffect } from "react"; // Corrigir importação dos hooks

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      // Pega a posição do elemento #banner
      const banner = document.getElementById("banner");
      if (banner) {
        const bannerPosition = banner.getBoundingClientRect();

        // Verifica se o topo da página passou do banner
        if (bannerPosition.bottom <= 0) {
          setShowHeader(true); // Exibe o cabeçalho
        } else {
          setShowHeader(false); // Esconde o cabeçalho
        }
      }

      setLastScrollY(window.scrollY); // Atualiza a posição do scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const NavItems = () => (
    <ul className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
      {navLinks.map(({ id, href, name }) => (
        <li
          key={id}
          className="
            w-full sm:w-auto
            rounded-md sm:rounded-none
            px-5 sm:px-0 py-2
            text-gray-50 font-semibold hover:text-white
            transition-colors
          "
        >
          <a href={href} className="text-lg md:text-base">
            {name}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header
      className={`${
        showHeader ? "block" : "hidden"
      } fixed inset-x-0 top-0 z-50 bg-secondary transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 sm:px-10 px-5">
          <a href="/" className="flex items-center">
            <img
              src="/assets/logoMissoes.svg"
              alt="Logo Missões e Cidade IBAVIVA"
              className="h-9 w-auto object-contain"
              style={{ maxWidth: "180px" }}
            />
          </a>

          {/* botão de toggle no mobile */}
          <button
            onClick={toggleMenu}
            className="
            sm:hidden flex items-center
            text-white  hover:text-
            transition-colors focus:outline-none
          "
            aria-label="Toggle Menu"
          >
            <img
              src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
              alt="toggle"
              className="w-6 h-6"
            />
          </button>

          {/* menu desktop */}
          <nav className="hidden sm:flex">
            <NavItems />
          </nav>
        </div>
      </div>

      {/* menu mobile */}
      <div
        className={`
        absolute left-0 right-0
        bg-black/90 backdrop-blur-sm
        overflow-hidden
        transition-[max-height] duration-300 ease-in-out
        z-40 sm:hidden
        ${isOpen ? "max-h-screen" : "max-h-0"}
      `}
      >
        <nav className="p-5">
          <NavItems />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
