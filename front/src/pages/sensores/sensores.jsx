import React, { useEffect, useState } from 'react';
import Header from "../../componentes/header/header";
import { FaEdit, FaTrash, FaDownload, FaPlus } from 'react-icons/fa';
import EditSensorModal from '../../componentes/modal/modal_editar/EditSensorModal';
import AddSensorModal from '../../componentes/modal/modal_adicionar_sensor/modal_adicionar_sensor';
import Footer from '../../componentes/footer/footer';

const Sensores = () => {
    // Estados principais
    const [sensores, setSensores] = useState([]);
    const [filteredSensors, setFilteredSensors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sensorType, setSensorType] = useState('');
    const [sensorStatus, setSensorStatus] = useState('');
    const [selectedSensor, setSelectedSensor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const itemsPerPage = 10;

    // Carrega dados da API ao montar
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch('http://127.0.0.1:8000/api/sensores/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setSensores(data);
                    setFilteredSensors(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Lógica de paginação
    const indexOfLastSensor = currentPage * itemsPerPage;
    const indexOfFirstSensor = indexOfLastSensor - itemsPerPage;
    const currentSensors = filteredSensors.slice(indexOfFirstSensor, indexOfLastSensor);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Exporta sensores filtrados para CSV
    const handleDownload = () => {
        if (!filteredSensors.length) return console.warn('Nenhum dado para exportar.');

        const headers = ['ID', 'Tipo de Sensor', 'Unidade de Medida', 'Status', 'Latitude', 'Longitude', 'MAC Address'];
        const rows = filteredSensors.map(sensor => [
            sensor.id, sensor.sensor, sensor.unidade_med, sensor.status,
            sensor.latitude, sensor.longitude, sensor.mac_addres,
        ]);

        const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sensores.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Aplica filtros de tipo e status
    const filterSensors = () => {
        let filtered = sensores;
        if (sensorType) filtered = filtered.filter(sensor => sensor.sensor === sensorType);
        if (sensorStatus) filtered = filtered.filter(sensor => sensor.status === sensorStatus);
        setFilteredSensors(filtered);
        setCurrentPage(1);
    };

    // Deleta sensor
    const handleDelete = (sensorId) => {
        if (!window.confirm('Tem certeza que deseja apagar este sensor?')) return;
        const token = localStorage.getItem('token');

        fetch(`http://127.0.0.1:8000/api/sensores/${sensorId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then(res => {
            if (res.ok) {
                setSensores(prev => prev.filter(s => s.id !== sensorId));
                setFilteredSensors(prev => prev.filter(s => s.id !== sensorId));
            }
        });
    };

    // Abre modal de edição
    const handleEdit = (sensorId) => {
        const sensorToEdit = sensores.find(sensor => sensor.id === sensorId);
        setSelectedSensor(sensorToEdit);
        setModalOpen(true);
    };

    // Salva sensor editado
    const handleSaveEdit = () => {
        const token = localStorage.getItem('token');
        const { id, ...updatedSensor } = selectedSensor;

        fetch(`http://127.0.0.1:8000/api/sensores/${id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedSensor),
        })
            .then(res => res.json())
            .then((data) => {
                if (data?.id) {
                    setSensores(prev => prev.map(s => s.id === id ? data : s));
                    setFilteredSensors(prev => prev.map(s => s.id === id ? data : s));
                    setModalOpen(false);
                }
            });
    };

    // Fecha modal de edição
    const handleModalClose = () => setModalOpen(false);

    // Captura input em campos do modal de edição
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedSensor(prev => ({ ...prev, [name]: value }));
    };

    // Abre modal de novo sensor
    const handleAddSensor = () => setAddModalOpen(true);

    // Salva novo sensor
    const handleSaveNewSensor = (newSensor) => {
        const token = localStorage.getItem('token');
        const payload = {
            sensor: newSensor.sensor,
            unidade_med: newSensor.unidade_med,
            status: newSensor.status,
            latitude: parseFloat(newSensor.latitude),
            longitude: parseFloat(newSensor.longitude),
            mac_addres: newSensor.mac_address,
        };

        fetch('http://127.0.0.1:8000/api/sensores/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(data => {
                setSensores(prev => [...prev, data]);
                setFilteredSensors(prev => [...prev, data]);
                setAddModalOpen(false);
            })
            .catch(err => console.error("Erro ao adicionar sensor:", err));
    };

    if (loading) return <section className="text-center text-lg text-gray-500"><p>Carregando...</p></section>;

    return (
        <>
            <Header />
            <main className="container mx-auto p-6">
                <section aria-labelledby="titulo-sensores">
                    <header>
                        <h1 id="titulo-sensores" className="text-3xl font-semibold text-[#000000] mb-6">Todos os Sensores:</h1>
                    </header>

                    {/* Filtros e Ações */}
                    <section className="bg-white p-4 mb-6 rounded-lg" aria-label="Filtros e Ações">
                        <form className="flex justify-between items-center w-full space-x-6" onSubmit={(e) => { e.preventDefault(); filterSensors(); }}>
                            <fieldset className="flex items-center space-x-6">
                                <div className="flex flex-col w-[180px]">
                                    <label className="text-sm font-semibold text-gray-700">Tipo de Sensor</label>
                                    <select value={sensorType} onChange={(e) => setSensorType(e.target.value)} className="px-3 py-1 border border-gray-300 rounded-md h-[3rem]">
                                        <option value="">Todos</option>
                                        <option value="temperatura">Temperatura</option>
                                        <option value="luminosidade">Luminosidade</option>
                                        <option value="umidade">Umidade</option>
                                        <option value="contador">Contador</option>
                                    </select>
                                </div>
                                <div className="flex flex-col w-[180px]">
                                    <label className="text-sm font-semibold text-gray-700">Status</label>
                                    <select value={sensorStatus} onChange={(e) => setSensorStatus(e.target.value)} className="px-3 py-1 border border-gray-300 rounded-md h-[3rem]">
                                        <option value="">Todos</option>
                                        <option value="Ativo">Ativo</option>
                                        <option value="Inativo">Inativo</option>
                                    </select>
                                </div>
                                <div className="mt-[1rem]">
                                    <button type="submit" className="px-6 py-3 bg-[#007BC0] text-white rounded-sm font-semibold hover:bg-[#00629A] text-sm">
                                        Filtrar
                                    </button>
                                </div>
                            </fieldset>
                            <div className="flex items-center space-x-4">
                                <button onClick={handleAddSensor} className="flex items-center gap-2 bg-[#007BC0] hover:bg-[#005F99] text-white px-4 py-2 rounded">
                                    <FaPlus className="mr-2" /> Adicionar Sensor
                                </button>
                                <button onClick={handleDownload} className="px-6 py-3 bg-[#007BC0] text-white rounded-md font-semibold hover:bg-[#00629A] text-sm flex items-center">
                                    <FaDownload className="mr-2" /> Download
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Tabela semântica */}
                    <section aria-label="Tabela de Sensores" className="overflow-x-auto bg-white shadow-md rounded-sm">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-[#007BC0] text-white">
                                <tr>
                                    <th scope="col" className="py-3 px-4 text-left">ID</th>
                                    <th scope="col" className="py-3 px-4 text-left">Tipo de Sensor</th>
                                    <th scope="col" className="py-3 px-4 text-left">Unidade de Medida</th>
                                    <th scope="col" className="py-3 px-4 text-left">Status</th>
                                    <th scope="col" className="py-3 px-4 text-left">Latitude</th>
                                    <th scope="col" className="py-3 px-4 text-left">Longitude</th>
                                    <th scope="col" className="py-3 px-4 text-left">MAC Address</th>
                                    <th scope="col" className="py-3 px-4 text-left">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {currentSensors.map(sensor => (
                                    <tr key={sensor.id} className="hover:bg-[#007ac048]">
                                        <td className="py-3 px-4 border-t border-[#007BC0]">{sensor.id}</td>
                                        <td className="py-3 px-4 border-t border-[#007BC0]">{sensor.sensor}</td>
                                        <td className="py-3 px-4 border-t border-[#007BC0]">{sensor.unidade_med}</td>
                                        <td className="py-3 px-4 border-t border-[#007BC0]">{sensor.status}</td>
                                        <td className="py-3 px-4 border-t border-[#007BC0]">{sensor.latitude}</td>
                                        <td className="py-3 px-4 border-t border-[#007BC0]">{sensor.longitude}</td>
                                        <td className="py-3 px-4 border-t border-[#007BC0]">{sensor.mac_addres}</td>
                                        <td className="py-3 px-4 border-t border-[#007BC0] text-center">
                                            <button onClick={() => handleEdit(sensor.id)} className="px-3 py-2 text-[#007BC0] hover:bg-[#f0f9f7] rounded-full">
                                                <FaEdit className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleDelete(sensor.id)} className="px-3 py-2 text-[#007BC0] hover:bg-[#f0f9f7] rounded-full">
                                                <FaTrash className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    {/* Paginação */}
                    <nav className="mt-8 flex justify-center items-center space-x-3" aria-label="Paginação">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-[#007BC0] text-white rounded-sm disabled:bg-gray-300 hover:bg-[#00629A]">
                            &lt; Anterior
                        </button>
                        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastSensor >= sensores.length} className="px-4 py-2 bg-[#007BC0] text-white rounded-sm disabled:bg-gray-300 hover:bg-[#00629A]">
                            Próxima &gt;
                        </button>
                    </nav>
                </section>

                {/* Modais de Adição e Edição */}
                <EditSensorModal
                    isOpen={modalOpen}
                    sensorData={selectedSensor}
                    onClose={handleModalClose}
                    onSave={handleSaveEdit}
                />

                <AddSensorModal
                    isOpen={addModalOpen}
                    onClose={() => setAddModalOpen(false)}
                    onSave={handleSaveNewSensor}
                />
            </main>
            <Footer />
        </>
    );
};

export default Sensores;
