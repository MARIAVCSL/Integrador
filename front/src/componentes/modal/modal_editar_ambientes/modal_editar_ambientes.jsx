import React, { useState, useEffect } from 'react';

const EditAmbienteModal = ({ isOpen, onClose, ambienteData, onSave }) => {
  const [sig, setSig] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ni, setNi] = useState('');
  const [responsavel, setResponsavel] = useState('');

  useEffect(() => {
    if (isOpen && ambienteData) {
      setSig(ambienteData.sig);
      setDescricao(ambienteData.descricao);
      setNi(ambienteData.ni);
      setResponsavel(ambienteData.responsavel);
    }
  }, [isOpen, ambienteData]);

  const handleSave = (e) => {
    e.preventDefault(); // evita reload do form
    const updatedAmbiente = {
      id: ambienteData.id,
      sig: parseInt(sig, 10),
      descricao,
      ni,
      responsavel,
    };
    onSave(updatedAmbiente);

    // limpa campos
    setSig('');
    setDescricao('');
    setNi('');
    setResponsavel('');
  };

  if (!isOpen) return null;

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="editar-ambiente-title"
      className="fixed inset-0 flex justify-center items-center bg-[#00000036] bg-opacity-50 z-50"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <header>
          <h2
            id="editar-ambiente-title"
            className="text-2xl font-semibold text-[#1985A1] mb-6"
          >
            Editar Ambiente
          </h2>
        </header>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <fieldset>
            <label htmlFor="sig" className="text-sm font-semibold text-gray-700">
              SIG
            </label>
            <input
              id="sig"
              name="sig"
              type="number"
              value={sig}
              onChange={(e) => setSig(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Digite o SIG"
              required
            />
          </fieldset>

          <fieldset>
            <label htmlFor="descricao" className="text-sm font-semibold text-gray-700">
              Descrição
            </label>
            <input
              id="descricao"
              name="descricao"
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Digite a descrição"
              required
            />
          </fieldset>

          <fieldset>
            <label htmlFor="ni" className="text-sm font-semibold text-gray-700">
              NI
            </label>
            <input
              id="ni"
              name="ni"
              type="text"
              value={ni}
              onChange={(e) => setNi(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Digite o NI"
            />
          </fieldset>

          <fieldset>
            <label htmlFor="responsavel" className="text-sm font-semibold text-gray-700">
              Responsável
            </label>
            <input
              id="responsavel"
              name="responsavel"
              type="text"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Digite o responsável"
            />
          </fieldset>

          <div className="flex justify-end space-x-4 md:col-span-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1985A1] text-white rounded-md hover:bg-[#4b7f8b]"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditAmbienteModal;
