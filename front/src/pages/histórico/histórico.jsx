import React, { useEffect, useState } from 'react';
import Header from "../../componentes/header/header";
import Footer from '../../componentes/footer/footer';
import { FaDownload } from 'react-icons/fa';
import { BsArrowCounterclockwise } from "react-icons/bs";

const Historico = () => {
    // Estados principais
    const [historicos, setHistoricos] = useState([]);
    const [filteredHistoricos, setFilteredHistoricos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sensorFiltro, setSensorFiltro] = useState('');
    const [dataFiltro, setDataFiltro] = useState('');
    const [horaFiltro, setHoraFiltro] = useState('');
    const [sensors, setSensors] = useState([]);
    const [ambientes, setAmbientes] = useState([]);
    const itemsPerPage = 10;

    // Carregamento inicial dos dados da API
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Busca de históricos
        fetch('http://127.0.0.1:8000/api/historico/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setHistoricos(data);
                    setFilteredHistoricos(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));

        // Busca de sensores
        fetch('http://127.0.0.1:8000/api/sensores/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(setSensors)
            .catch((err) => console.error('Erro ao buscar sensores', err));

        // Busca de ambientes
        fetch('http://127.0.0.1:8000/api/ambientes/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(setAmbientes)
            .catch((err) => console.error('Erro ao buscar ambientes', err));
    }, []);

    // Paginação
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentHistoricos = filteredHistoricos.slice(indexOfFirst, indexOfLast);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Geração e download do arquivo CSV
    const handleDownload = () => {
        if (!filteredHistoricos.length) return;

        const headers = ['ID', 'Sensor', 'Ambiente', 'Valor', 'Timestamp'];
        const rows = filteredHistoricos.map(h => [
            h.id,
            h.sensor ? h.sensor : 'Não disponível',
            h.ambiente ? h.ambiente.descricao : 'Não disponível',
            h.valor,
            h.timestamp
        ]);
        const csv = [headers, ...rows]
            .map(r => r.map(cell => `"${cell}"`).join(','))
            .join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'historico.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Resetar filtros
    const limparFiltros = () => {
        setSensorFiltro('');
        setDataFiltro('');
        setHoraFiltro('');
        setFilteredHistoricos(historicos);
        setCurrentPage(1);
    };

    // Aplicar filtros
    const filterHistoricos = () => {
        let filtered = historicos;

        if (sensorFiltro) {
            filtered = filtered.filter(h => {
                const sensorObj = sensors.find(s => String(s.id) === String(h.sensor));
                return sensorObj && sensorObj.sensor.toLowerCase().includes(sensorFiltro.toLowerCase());
            });
        }

        if (dataFiltro) {
            filtered = filtered.filter(h =>
                h.timestamp.slice(0, 10) === dataFiltro
            );
        }

        if (horaFiltro) {
            filtered = filtered.filter(h =>
                h.timestamp.slice(11, 16) === horaFiltro
            );
        }

        setFilteredHistoricos(filtered);
        setCurrentPage(1);
    };

    // Exibição de carregamento
    if (loading) {
        return (
            <section className="text-center text-lg text-gray-500">
                <p>Carregando...</p>
            </section>
        );
    }

    return (
        <>
            <Header />
            <main className="container mx-auto p-6">
                <section aria-labelledby="titulo-historico">
                    <h1 id="titulo-historico" className="text-3xl font-semibold text-black mb-6">Todos os Históricos:</h1>

                    {/* Área de filtros e ações */}
                    <section className="bg-white p-4 mb-6 rounded-lg flex justify-between items-center" aria-label="Filtros e ações">
                        <div className="flex items-center space-x-4">
                            {/* Filtro por Sensor */}
                            <div className="flex flex-col w-[180px]">
                                <label className="text-sm font-semibold text-gray-700">Filtrar por Sensor</label>
                                <input
                                    type="text"
                                    value={sensorFiltro}
                                    onChange={(e) => setSensorFiltro(e.target.value)}
                                    className="px-3 py-1 border border-gray-300 rounded-md h-[3rem]"
                                    placeholder="Ex: Sensor 101"
                                />
                            </div>

                            {/* Filtro por Data */}
                            <div className="flex flex-col w-[180px]">
                                <label className="text-sm font-semibold text-gray-700">Filtrar por Data</label>
                                <input
                                    type="date"
                                    value={dataFiltro}
                                    onChange={(e) => setDataFiltro(e.target.value)}
                                    className="px-3 py-1 border border-gray-300 rounded-md h-[3rem]"
                                />
                            </div>

                            {/* Filtro por Hora */}
                            <div className="flex flex-col w-[180px]">
                                <label className="text-sm font-semibold text-gray-700">Filtrar por Hora</label>
                                <input
                                    type="time"
                                    value={horaFiltro}
                                    onChange={(e) => setHoraFiltro(e.target.value)}
                                    className="px-3 py-1 border border-gray-300 rounded-md h-[3rem]"
                                />
                            </div>

                            {/* Botões de filtrar e limpar */}
                            <div className="flex gap-2 mt-5 items-center">
                                <button
                                    onClick={filterHistoricos}
                                    className="px-6 py-3 bg-[#147671] text-white rounded-md font-semibold hover:bg-[#0E5B57] text-sm cursor-pointer"
                                >
                                    Filtrar
                                </button>
                                <div className="flex items-center">
                                    <button
                                        onClick={limparFiltros}
                                        className="p-2 rounded-md"
                                        title="Limpar filtros"
                                    >
                                        <BsArrowCounterclockwise className="text-[#147671] hover:text-3xl transition-all text-2xl cursor-pointer" />
                                    </button>
                                    <p className="text-[#147671]">Resetar os Filtros</p>
                                </div>
                            </div>
                        </div>

                        {/* Botão de download */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 bg-[#147671] hover:bg-[#0E5B57] text-white px-4 py-2 rounded"
                            >
                                <FaDownload />
                                Download
                            </button>
                        </div>
                    </section>

                    {/* Tabela com resultados */}
                    <article className="overflow-x-auto bg-white shadow-md rounded-sm" aria-label="Tabela de históricos">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-[#147671] text-white">
                                <tr>
                                    <th className="py-3 px-4 text-left">ID</th>
                                    <th className="py-3 px-4 text-left">Sensor</th>
                                    <th className="py-3 px-4 text-left">Ambiente</th>
                                    <th className="py-3 px-4 text-left">Valor</th>
                                    <th className="py-3 px-4 text-left">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {currentHistoricos.length > 0 ? (
                                    currentHistoricos.map(historico => (
                                        <tr key={historico.id} className="hover:bg-[#14767125]">
                                            <td className="py-3 px-4 border-t border-[#147671]">{historico.id}</td>
                                            <td className="py-3 px-4 border-t border-[#147671]">
                                                {historico.sensor ? sensors.find(s => s.id === historico.sensor)?.sensor : 'Não disponível'}
                                            </td>
                                            <td className="py-3 px-4 border-t border-[#147671]">
                                                {historico.ambiente ? ambientes.find(a => a.id === historico.ambiente)?.descricao : 'Não disponível'}
                                            </td>
                                            <td className="py-3 px-4 border-t border-[#147671]">{historico.valor}</td>
                                            <td className="py-3 px-4 border-t border-[#147671]">
                                                {historico.timestamp.slice(0, 16).replace('Z', ' ').replace('T', ' ')}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-3">Nenhum dado encontrado</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </article>

                    {/* Controles de paginação */}
                    <nav className="mt-8 flex justify-center items-center space-x-3" aria-label="Paginação">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-[#147671] text-white rounded-sm disabled:bg-gray-300 hover:bg-[#0E5B57]"
                        >
                            &lt; Anterior
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLast >= filteredHistoricos.length}
                            className="px-4 py-2 bg-[#147671] text-white rounded-sm disabled:bg-gray-300 hover:bg-[#0E5B57]"
                        >
                            Próxima &gt;
                        </button>
                    </nav>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Historico;
