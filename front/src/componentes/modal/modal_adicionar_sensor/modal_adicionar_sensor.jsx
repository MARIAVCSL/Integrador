import React, { useState } from 'react';

const AddSensorModal = ({ isOpen, onClose, onSave }) => {
  const [sensorType, setSensorType] = useState('');
  const [sensorUnit, setSensorUnit] = useState('');
  const [sensorStatus, setSensorStatus] = useState('');
  const [sensorLatitude, setSensorLatitude] = useState('');
  const [sensorLongitude, setSensorLongitude] = useState('');
  const [sensorMacAddress, setSensorMacAddress] = useState('');

  const handleSave = (e) => {
    e.preventDefault();

    if (
      !sensorType ||
      !sensorUnit ||
      !sensorStatus ||
      !sensorLatitude ||
      !sensorLongitude ||
      !sensorMacAddress
    ) {
      console.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const newSensor = {
      sensor: sensorType,
      unidade_med: sensorUnit,
      status: sensorStatus,
      latitude: parseFloat(sensorLatitude),
      longitude: parseFloat(sensorLongitude),
      mac_address: sensorMacAddress,
    };

    onSave(newSensor);

    setSensorType('');
    setSensorUnit('');
    setSensorStatus('');
    setSensorLatitude('');
    setSensorLongitude('');
    setSensorMacAddress('');
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-sensor-title"
      className="fixed inset-0 flex justify-center items-center bg-[#00000036] bg-opacity-50 z-50"
    >
      <section className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2
          id="add-sensor-title"
          className="text-2xl font-semibold text-[#007BC0] mb-6"
        >
          Adicionar Sensor
        </h2>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <fieldset>
            <label htmlFor="sensorType" className="text-sm font-semibold text-gray-700">
              Tipo de Sensor
            </label>
            <select
              id="sensorType"
              value={sensorType}
              onChange={(e) => setSensorType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              required
            >
              <option value="">Selecione</option>
              <option value="temperatura">Temperatura</option>
              <option value="luminosidade">Luminosidade</option>
              <option value="umidade">Umidade</option>
              <option value="contador">Contador</option>
            </select>
          </fieldset>

          <fieldset>
            <label htmlFor="sensorUnit" className="text-sm font-semibold text-gray-700">
              Unidade de Medida
            </label>
            <select
              id="sensorUnit"
              value={sensorUnit}
              onChange={(e) => setSensorUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              required
            >
              <option value="">Selecione</option>
              <option value="°C">°C</option>
              <option value="Lux">Lux</option>
              <option value="%">%</option>
              <option value="Num">Num</option>
            </select>
          </fieldset>

          <fieldset>
            <label htmlFor="sensorStatus" className="text-sm font-semibold text-gray-700">
              Status
            </label>
            <select
              id="sensorStatus"
              value={sensorStatus}
              onChange={(e) => setSensorStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              required
            >
              <option value="">Selecione</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </fieldset>

          <fieldset>
            <label htmlFor="sensorLatitude" className="text-sm font-semibold text-gray-700">
              Latitude
            </label>
            <input
              id="sensorLatitude"
              type="number"
              value={sensorLatitude}
              onChange={(e) => setSensorLatitude(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              step="any"
              required
              placeholder="Digite a latitude do sensor"
            />
          </fieldset>

          <fieldset>
            <label htmlFor="sensorLongitude" className="text-sm font-semibold text-gray-700">
              Longitude
            </label>
            <input
              id="sensorLongitude"
              type="number"
              value={sensorLongitude}
              onChange={(e) => setSensorLongitude(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              step="any"
              required
              placeholder="Digite a longitude do sensor"
            />

          </fieldset>

          <fieldset className="md:col-span-2">
            <label htmlFor="sensorMacAddress" className="text-sm font-semibold text-gray-700">
              MAC Address
            </label>
            <input
              id="sensorMacAddress"
              type="text"
              value={sensorMacAddress}
              onChange={(e) => setSensorMacAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              required
              autoComplete="off"
              placeholder="Digite o endereço MAC do sensor"
            />
          </fieldset>

          <div className="md:col-span-2 flex justify-end space-x-4 mt-6">
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

export default AddSensorModal;
