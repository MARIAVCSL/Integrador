import React from "react";
import Header from "../../componentes/header/header";
import { FaMap } from "react-icons/fa";
import { CiTempHigh } from "react-icons/ci";
import { PiMapPinSimpleArea, PiBookOpenText } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Footer from "../../componentes/footer/footer";

export function Home() {
  const navigate = useNavigate();

  // Funções de navegação
  const goToSensores = () => navigate("/sensores");
  const goToAmbientes = () => navigate("/ambientes");
  const goToHistorico = () => navigate("/historico");
  const goToMapa = () => navigate("/mapa");

  return (
    <>
      <Header />
      <main className="min-h-screen p-6">
        {/* Cabeçalho da página */}
        <header className="mb-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Bem-Vindo(a) Colaborador(a)!
          </h1>
        </header>

        {/* Seção principal de ações */}
        <section aria-labelledby="acoes-principais" className="mx-auto">
          <div className="max-w-[1500px] mx-auto px-1">
            <h2
              id="acoes-principais"
              className="text-2xl font-semibold text-gray-700 mb-6"
            >
              Ações principais:
            </h2>

            {/* Grid de cards */}
            <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-4">

              {/* Card: Ambientes */}
              <article
                className="bg-white shadow-2xl rounded-md border border-[#1985A1] border-opacity-25 overflow-hidden flex flex-col items-center text-center p-17 relative transition-transform duration-200 ease-in-out hover:scale-105"
              >
                <figure className="mb-6 -translate-y-12">
                  <PiMapPinSimpleArea
                    className="text-[#1985A1] w-40 h-40 mx-auto"
                    aria-hidden="true"
                  />
                </figure>
                <p className="text-[#1985A1] -translate-y-11 font-semibold text-2xl mb-8 leading-relaxed max-w-[280px]">
                  Visualizar Ambientes
                </p>
                <button
                  onClick={goToAmbientes}
                  type="button"
                  className="absolute bottom-6 cursor-pointer rounded-md bg-[#1985A1] text-white font-semibold py-3 px-16 hover:bg-[#4b7f8b] focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  Visualizar
                </button>
              </article>

              {/* Card: Sensores */}
              <article
                className="bg-white rounded-md shadow-2xl border border-[#007BC0] border-opacity-25 overflow-hidden flex flex-col items-center text-center p-10 relative transition-transform duration-200 ease-in-out hover:scale-105"
              >
                <figure className="mb-6 -translate-y-3">
                  <CiTempHigh
                    className="text-[#007BC0] w-30 h-30 mx-auto"
                    aria-hidden="true"
                  />
                </figure>
                <p className="text-[#007BC0] translate-y-9 font-semibold text-2xl mb-8 leading-relaxed max-w-[280px]">
                  Visualizar Sensores
                </p>
                <button
                  onClick={goToSensores}
                  type="button"
                  className="absolute bottom-6 cursor-pointer rounded-md bg-[#007BC0] text-white font-semibold py-3 px-16 hover:bg-[#00629A] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Acompanhe
                </button>
              </article>

              {/* Card: Histórico */}
              <article
                className="bg-white shadow-2xl rounded-md border border-[#147671] border-opacity-25 overflow-hidden flex flex-col items-center text-center p-10 relative transition-transform duration-200 ease-in-out hover:scale-105"
              >
                <figure className="mb-6 translate-y-1">
                  <PiBookOpenText
                    className="text-[#147671] w-30 h-30 mx-auto"
                    aria-hidden="true"
                  />
                </figure>
                <p className="text-[#147671] translate-y-8 font-semibold text-2xl mb-8 leading-relaxed max-w-[280px]">
                  Visualizar Histórico
                </p>
                <button
                  onClick={goToHistorico}
                  type="button"
                  className="absolute bottom-6 cursor-pointer rounded-md bg-[#147671] text-white font-semibold py-3 px-16 hover:bg-[#0E5B57] focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  Visualizar
                </button>
              </article>

              {/* Card: Mapeamento */}
              <article
                className="bg-white shadow-2xl rounded-md border border-[#006C3A] border-opacity-25 overflow-hidden flex flex-col items-center text-center p-10 relative transition-transform duration-200 ease-in-out hover:scale-105"
              >
                <figure className="mb-6 translate-y-1">
                  <FaMap
                    className="text-[#006C3A] w-30 h-30 mx-auto"
                    aria-hidden="true"
                  />
                </figure>
                <p className="text-[#006C3A] translate-y-8 font-semibold text-2xl mb-8 leading-relaxed max-w-[280px]">
                  Visualizar Mapeamento
                </p>
                <button
                  onClick={goToMapa}
                  type="button"
                  className="absolute bottom-6 cursor-pointer rounded-md bg-[#006C3A] text-white font-semibold py-3 px-16 hover:bg-[#3e7258] focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  Visualizar
                </button>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
