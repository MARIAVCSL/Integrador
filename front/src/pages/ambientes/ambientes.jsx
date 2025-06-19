import React, { useEffect, useState } from 'react';
import Header from "../../componentes/header/header";
import { FaDownload, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import AddAmbienteModal from '../../componentes/modal/modal_adicionar_ambientes/modal_adicionar_ambientes';
import EditAmbienteModal from '../../componentes/modal/modal_editar_ambientes/modal_editar_ambientes';
import Footer from '../../componentes/footer/footer';

const Ambientes = () => {
    const [ambientes, setAmbientes] = useState([]);
    const [filteredAmbientes, setFilteredAmbientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sigFiltro, setSigFiltro] = useState('');
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedAmbiente, setSelectedAmbiente] = useState(null);
    const itemsPerPage = 10;

    // Carrega os ambientes ao montar o componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch('http://127.0.0.1:8000/api/ambientes/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setAmbientes(data);
                    setFilteredAmbientes(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Paginação
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentAmbientes = filteredAmbientes.slice(indexOfFirst, indexOfLast);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Exporta os dados para CSV
    const handleDownload = () => {
        if (!filteredAmbientes.length) return;

        const headers = ['ID', 'SIG', 'Descrição', 'NI', 'Responsável'];
        const rows = filteredAmbientes.map(a => [a.id, a.sig, a.descricao, a.ni, a.responsavel]);
        const csv = [headers, ...rows]
            .map(r => r.map(cell => `"${cell}"`).join(','))
            .join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ambientes.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filtra os ambientes pelo SIG
    const filterAmbientes = () => {
        let filtered = ambientes;
        if (sigFiltro) filtered = filtered.filter(a => String(a.sig).includes(sigFiltro));
        setFilteredAmbientes(filtered);
        setCurrentPage(1);
    };

    // Apaga um ambiente
    const handleDelete = (ambienteId) => {
        if (!window.confirm('Tem certeza que deseja apagar este ambiente?')) return;

        const token = localStorage.getItem('token');
        fetch(`http://127.0.0.1:8000/api/ambientes/${ambienteId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.ok) {
                    setAmbientes(prev => prev.filter(ambiente => ambiente.id !== ambienteId));
                    setFilteredAmbientes(prev => prev.filter(ambiente => ambiente.id !== ambienteId));
                }
            });
    };

    // Abre o modal de edição com os dados selecionados
    const handleEdit = (ambienteId) => {
        const ambienteToEdit = ambientes.find(ambiente => ambiente.id === ambienteId);
        setSelectedAmbiente(ambienteToEdit);
        setEditModalOpen(true);
    };

    // Salva as edições de um ambiente
    const handleSaveEdit = (updatedAmbiente) => {
        const token = localStorage.getItem('token');
        const { id, ...data } = updatedAmbiente;

        fetch(`http://127.0.0.1:8000/api/ambientes/${id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then((data) => {
                setAmbientes(prev => prev.map(ambiente => ambiente.id === id ? data : ambiente));
                setFilteredAmbientes(prev => prev.map(ambiente => ambiente.id === id ? data : ambiente));
                setEditModalOpen(false);
            });
    };

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
                {/* Seção principal de ambientes */}
                <section>
                    <header className="mb-6">
                        <h1 className="text-3xl font-semibold text-[#000000]">Todos os Ambientes:</h1>
                    </header>

                    {/* Filtros e ações */}
                    <div className="bg-white p-4 mb-6 rounded-lg flex justify-between items-center">
                        <form onSubmit={(e) => { e.preventDefault(); filterAmbientes(); }} className="flex items-center space-x-4">
                            <div className="flex flex-col w-[180px]">
                                <label htmlFor="sigFiltro" className="text-sm font-semibold text-gray-700">Filtrar por SIG</label>
                                <input
                                    id="sigFiltro"
                                    type="text"
                                    value={sigFiltro}
                                    onChange={(e) => setSigFiltro(e.target.value)}
                                    className="px-3 py-1 border border-gray-300 rounded-md h-[3rem]"
                                    placeholder="Ex: 101"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 mt-5 bg-[#1985A1] text-white rounded-md font-semibold hover:bg-[#4b7f8b] text-sm"
                            >
                                Filtrar
                            </button>
                        </form>

                        {/* Botões de ação */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setAddModalOpen(true)}
                                className="flex items-center gap-2 bg-[#1985A1] hover:bg-[#4b7f8b] text-white px-4 py-2 rounded"
                            >
                                <FaPlus />
                                Adicionar Ambiente
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 bg-[#1985A1] hover:bg-[#4b7f8b] text-white px-4 py-2 rounded"
                            >
                                <FaDownload />
                                Download
                            </button>
                        </div>
                    </div>

                    {/* Tabela de dados */}
                    <article className="overflow-x-auto bg-white shadow-md rounded-sm">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-[#1985A1] text-white">
                                <tr>
                                    <th className="py-3 px-4 text-left">ID</th>
                                    <th className="py-3 px-4 text-left">SIG</th>
                                    <th className="py-3 px-4 text-left">Descrição</th>
                                    <th className="py-3 px-4 text-left">NI</th>
                                    <th className="py-3 px-4 text-left">Responsável</th>
                                    <th className="py-3 px-4 text-left">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {currentAmbientes.map((ambiente) => (
                                    <tr key={ambiente.id} className="hover:bg-[#1986a131]">
                                        <td className="py-3 px-4 border-t border-[#1985A1]">{ambiente.id}</td>
                                        <td className="py-3 px-4 border-t border-[#1985A1]">{ambiente.sig}</td>
                                        <td className="py-3 px-4 border-t border-[#1985A1]">{ambiente.descricao}</td>
                                        <td className="py-3 px-4 border-t border-[#1985A1]">{ambiente.ni}</td>
                                        <td className="py-3 px-4 border-t border-[#1985A1]">{ambiente.responsavel}</td>
                                        <td className="py-3 px-4 border-t border-[#1985A1] text-center">
                                            <button
                                                onClick={() => handleEdit(ambiente.id)}
                                                className="px-3 py-2 text-[#1985A1] hover:bg-[#f0f9f7] rounded-full"
                                                aria-label="Editar"
                                            >
                                                <FaEdit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ambiente.id)}
                                                className="px-3 py-2 text-[#1985A1] hover:bg-[#f0f9f7] rounded-full"
                                                aria-label="Excluir"
                                            >
                                                <FaTrash className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </article>

                    {/* Paginação */}
                    <nav className="mt-8 flex justify-center items-center space-x-3" aria-label="Paginação">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-[#1985A1] text-white rounded-sm disabled:bg-gray-300 hover:bg-[#4b7f8b]"
                        >
                            &lt; Anterior
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLast >= filteredAmbientes.length}
                            className="px-4 py-2 bg-[#1985A1] text-white rounded-sm disabled:bg-gray-300 hover:bg-[#4b7f8b]"
                        >
                            Próxima &gt;
                        </button>
                    </nav>
                </section>
            </main>

            {/* Modal de Adicionar Ambiente */}
            <AddAmbienteModal
                isOpen={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSave={(newAmbiente) => {
                    setAmbientes(prev => [...prev, newAmbiente]);
                    setFilteredAmbientes(prev => [...prev, newAmbiente]);
                    setAddModalOpen(false);
                }}
            />

            {/* Modal de Editar Ambiente */}
            <EditAmbienteModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                ambienteData={selectedAmbiente}
                onSave={handleSaveEdit}
            />

            <Footer />
        </>
    );
};

export default Ambientes;
