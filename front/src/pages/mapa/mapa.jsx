import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMap } from "react-icons/fa";
import { CiTempHigh } from "react-icons/ci";
import { PiMapPinSimpleArea, PiBookOpenText } from "react-icons/pi";
import { GrLocation } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import L from "leaflet";

// Corrige o ícone padrão do Leaflet
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl,
    shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Mapa() {
    const position = [-22.914103568639096, -47.06824335627237];
    const navigate = useNavigate();

    return (
        <div className="flex h-screen">
            {/* Lateral esquerda */}
            <aside className="w-[23%] bg-white shadow-md p-6 flex flex-col justify-between">
                <div>
                    <header className="text-center">
                        <h2 className="text-2xl font-bold text-[#006C3A] mb-4">
                            Mapeamento da Escola
                        </h2>
                    </header>
                    <hr className="mt-8 text-[#4b4b4b6c]" />

                    {/* Localização */}
                    <section className="p-4 mb-0 mt-10">
                        <div className="flex items-center gap-2 mb-3">
                            <GrLocation className="text-[#000000c4] text-2xl" />
                            <h3 className="text-xl font-semibold text-gray-700">
                                Senai Roberto Mange
                            </h3>
                        </div>
                        <address className="text-md text-gray-600 not-italic leading-snug">
                            Av. Saudade, 125 - Vila Nova, Campinas - SP
                        </address>
                    </section>
                </div>

                {/* Navegação */}
                <nav className="space-y-14 mb-48">
                    <button
                        onClick={() => navigate("/ambientes")}
                        className="flex items-center gap-4 text-[23px] text-gray-700 font-semibold hover:text-[#3e7258] transform transition hover:scale-105"
                    >
                        <PiMapPinSimpleArea className="text-4xl" />
                        Visualizar Ambientes
                    </button>

                    <button
                        onClick={() => navigate("/sensores")}
                        className="flex items-center gap-4 text-[23px] text-gray-700 font-semibold hover:text-[#3e7258] transform transition hover:scale-105"
                    >
                        <CiTempHigh className="text-4xl" />
                        Visualizar Sensores
                    </button>

                    <button
                        onClick={() => navigate("/historico")}
                        className="flex items-center gap-4 text-[23px] text-gray-700 font-semibold hover:text-[#3e7258] transform transition hover:scale-105"
                    >
                        <PiBookOpenText className="text-4xl" />
                        Visualizar Histórico
                    </button>

                    <button
                        onClick={() => navigate("/mapeamento")}
                        className="flex items-center gap-4 text-[26px] text-[#006C3A] font-semibold hover:text-[#3e7258] transform transition hover:scale-105"
                    >
                        <FaMap className="text-4xl" />
                        Visualizar Mapeamento
                    </button>
                </nav>

                {/* Rodapé */}
                <footer className="text-center mt-8 text-xs text-gray-500">
                    Última atualização: Junho 2025
                </footer>
            </aside>

            {/* Área do mapa */}
            <main className="flex-1 w-[76%] relative">
                <MapContainer
                    center={position}
                    zoom={30}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                >
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution="Tiles © Esri"
                    />
                    <Marker position={position}>
                        <Popup>
                            <strong>Senai Roberto Mange</strong>
                            <br />
                            Av. da Saudade, 125 - Campinas/SP
                            <br />
                            🏫 Cursos Técnicos e Profissionalizantes
                        </Popup>
                    </Marker>
                </MapContainer>

                {/* Indicador animado */}
                <div className="absolute bottom-4 right-4 bg-white px-4 py-2 shadow-lg rounded-full flex items-center gap-2 animate-bounce">
                    <FaMap className="text-[#006C3A]" />
                    <span className="text-sm text-gray-700 font-medium">
                        Você está aqui!
                    </span>
                </div>
            </main>
        </div>
    );
}
