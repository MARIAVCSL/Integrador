import React, { useState } from 'react';

const AddAmbienteModal = ({ isOpen, onClose, onSave }) => {
    const [sig, setSig] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ni, setNi] = useState('');
    const [responsavel, setResponsavel] = useState('');

    const handleSave = () => {
        if (!sig || !descricao || !ni || !responsavel) {
            console.error("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const newAmbiente = {
            sig,
            descricao,
            ni,
            responsavel,
        };

        onSave(newAmbiente);
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
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000036] bg-opacity-50"
        >
            <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
                <header>
                    <h2
                        id="modal-title"
                        className="mb-6 text-2xl font-semibold text-[#1985A1]"
                    >
                        Adicionar Ambiente
                    </h2>
                </header>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    <fieldset className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label htmlFor="sig" className="text-sm font-semibold text-gray-700">
                                SIG
                            </label>
                            <input
                                id="sig"
                                type="text"
                                value={sig}
                                onChange={(e) => setSig(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                placeholder="Digite o SIG"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="descricao" className="text-sm font-semibold text-gray-700">
                                Descrição
                            </label>
                            <input
                                id="descricao"
                                type="text"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                placeholder="Digite a descrição do ambiente"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="ni" className="text-sm font-semibold text-gray-700">
                                NI
                            </label>
                            <input
                                id="ni"
                                type="text"
                                value={ni}
                                onChange={(e) => setNi(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                placeholder="Digite o NI"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="responsavel" className="text-sm font-semibold text-gray-700">
                                Responsável
                            </label>
                            <input
                                id="responsavel"
                                type="text"
                                value={responsavel}
                                onChange={(e) => setResponsavel(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                placeholder="Digite o responsável pelo ambiente"
                                required
                            />
                        </div>
                    </fieldset>

                    <footer className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-[#1985A1] px-4 py-2 text-white hover:bg-[#4b7f8b]"
                        >
                            Salvar
                        </button>
                    </footer>
                </form>
            </div>
        </section>
    );
};

export default AddAmbienteModal;
