import React, { useState, useEffect } from 'react';

const EditSensorModal = ({ isOpen, sensorData, onClose, onSave }) => {
    const [sensorName, setSensorName] = useState(sensorData?.sensor || '');
    const [sensorUnit, setSensorUnit] = useState(sensorData?.unidade_med || '');
    const [sensorStatus, setSensorStatus] = useState(sensorData?.status || '');
    const [sensorLatitude, setSensorLatitude] = useState(sensorData?.latitude || '');
    const [sensorLongitude, setSensorLongitude] = useState(sensorData?.longitude || '');
    const [sensorMacAddress, setSensorMacAddress] = useState(sensorData?.mac_address || '');
    const [sensorType, setSensorType] = useState(sensorData?.sensor || '');

    useEffect(() => {
        if (sensorData) {
            setSensorName(sensorData.sensor || '');
            setSensorUnit(sensorData.unidade_med || '');
            setSensorStatus(sensorData.status || '');
            setSensorLatitude(sensorData.latitude || '');
            setSensorLongitude(sensorData.longitude || '');
            setSensorMacAddress(sensorData.mac_address || '');
            setSensorType(sensorData.sensor || '');
        }
    }, [sensorData]);

    const handleSave = (event) => {
        event.preventDefault(); // previne reload da página ao enviar form

        if (!sensorName || !sensorUnit || !sensorStatus || !sensorLatitude || !sensorLongitude || !sensorMacAddress || !sensorType) {
            console.error("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const updatedSensor = {
            ...sensorData,
            sensor: sensorName,
            unidade_med: sensorUnit,
            status: sensorStatus,
            latitude: sensorLatitude,
            longitude: sensorLongitude,
            mac_address: sensorMacAddress,
            type: sensorType,
        };

        onSave(updatedSensor);
    };

    if (!isOpen || !sensorData) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 flex justify-center items-center bg-[#00000036] bg-opacity-50 z-50"
        >
            <section className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" aria-describedby="modal-desc">
                <h2 id="modal-title" className="text-2xl font-semibold text-[#007BC0] mb-4">Editar Sensor</h2>

                <form onSubmit={handleSave} className="space-y-4" id="modal-desc">
                    {/* Nome do Sensor */}
                    <div>
                        <label htmlFor="sensor-name" className="block text-sm font-semibold text-gray-700 mb-1">
                            Nome do Sensor
                            <input
                                id="sensor-name"
                                type="text"
                                value={sensorName}
                                onChange={(e) => setSensorName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm mt-1"
                                required
                                placeholder="Digite o nome do sensor"
                            />
                        </label>
                    </div>

                    {/* Tipo de Sensor */}
                    <div>
                        <label htmlFor="sensor-type" className="block text-sm font-semibold text-gray-700 mb-1">
                            Tipo de Sensor
                            <select
                                id="sensor-type"
                                value={sensorType}
                                onChange={(e) => setSensorType(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm mt-1"
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="temperatura">Temperatura</option>
                                <option value="luminosidade">Luminosidade</option>
                                <option value="umidade">Umidade</option>
                                <option value="contador">Contador</option>
                            </select>
                        </label>
                    </div>

                    {/* Unidade de Medida */}
                    <div>
                        <label htmlFor="sensor-unit" className="block text-sm font-semibold text-gray-700 mb-1">
                            Unidade de Medida
                            <select
                                id="sensor-unit"
                                value={sensorUnit}
                                onChange={(e) => setSensorUnit(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm mt-1"
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="°C">°C</option>
                                <option value="Lux">Lux</option>
                                <option value="%">%</option>
                                <option value="Num">Num</option>
                            </select>
                        </label>
                    </div>

                    {/* Status */}
                    <div>
                        <label htmlFor="sensor-status" className="block text-sm font-semibold text-gray-700 mb-1">
                            Status
                            <select
                                id="sensor-status"
                                value={sensorStatus}
                                onChange={(e) => setSensorStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm mt-1"
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </select>
                        </label>
                    </div>

                    {/* Latitude */}
                    <div>
                        <label htmlFor="sensor-latitude" className="block text-sm font-semibold text-gray-700 mb-1">
                            Latitude
                            <input
                                id="sensor-latitude"
                                type="number"
                                value={sensorLatitude}
                                onChange={(e) => setSensorLatitude(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm mt-1"
                                required
                                step="any"
                                placeholder="Digite a latitude do sensor"
                            />
                        </label>
                    </div>

                    {/* Longitude */}
                    <div>
                        <label htmlFor="sensor-longitude" className="block text-sm font-semibold text-gray-700 mb-1">
                            Longitude
                            <input
                                id="sensor-longitude"
                                type="number"
                                value={sensorLongitude}
                                onChange={(e) => setSensorLongitude(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm mt-1"
                                required
                                step="any"
                                placeholder="Digite a longitude do sensor"
                            />
                        </label>
                    </div>

                    {/* MAC Address */}
                    <div>
                        <label htmlFor="sensor-mac" className="block text-sm font-semibold text-gray-700 mb-1">
                            MAC Address
                            <input
                                id="sensor-mac"
                                type="text"
                                value={sensorMacAddress}
                                onChange={(e) => setSensorMacAddress(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm mt-1"
                                required
                                placeholder="Digite o MAC address do sensor"
                            />
                        </label>
                    </div>

                    {/* Botões */}
                    <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#007BC0] text-white rounded-md hover:bg-[#00629A]"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default EditSensorModal;
