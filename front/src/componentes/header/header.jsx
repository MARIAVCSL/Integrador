import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import { AiOutlineLogout } from "react-icons/ai";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header role="banner" className="border-b border-b-[#CCCCCC] h-[7rem] w-full">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-full w-[1520px] items-center justify-between px-4 py-3"
      >
        {/* Logo com link para a home */}
        <Link to="/home" className="flex items-center" aria-label="Página inicial">
          <img
            src={logo}
            alt="Logomarca da aplicação TechEdu"
            className="h-[29%] w-[22%] cursor-pointer transform transition-transform duration-200 hover:scale-105"
          />
        </Link>

        {/* Navegação principal */}
        <ul className="mr-25 flex w-[50%] gap-15 justify-around text-lg" role="list">
          <li role="listitem">
            <NavLink
              to="/ambientes"
              className="inline-block font-medium transform transition-transform duration-200 hover:scale-105 hover:text-[#1985A1] hover:underline"
            >
              Ambientes
            </NavLink>
          </li>
          <li role="listitem">
            <NavLink
              to="/historico"
              className="inline-block transform transition-transform duration-200 hover:scale-105 hover:text-[#147671] hover:underline"
            >
              Histórico
            </NavLink>
          </li>
          <li role="listitem">
            <NavLink
              to="/sensores"
              className="inline-block transform transition-transform duration-200 hover:scale-105 hover:text-[#006EAD] hover:underline"
            >
              Sensores
            </NavLink>
          </li>
          <li role="listitem">
            <NavLink
              to="/mapa"
              className="inline-block transform transition-transform duration-200 hover:scale-105 hover:text-[#006C3A] hover:underline"
            >
              Mapeamento
            </NavLink>
          </li>
        </ul>

        {/* Botão de logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-[#006EAD]"
          aria-label="Terminar sessão"
        >
          <AiOutlineLogout className="h-9 w-9 text-[#000000da]" />
        </button>
      </nav>
    </header>
  );
}