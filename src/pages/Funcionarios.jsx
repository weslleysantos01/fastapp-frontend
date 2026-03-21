import { useState, useEffect } from 'react';
import api from '../services/api';

function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [nome, setNome] = useState('');

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    function carregarFuncionarios() {
        api.get('/funcionarios').then(response => {
            setFuncionarios(response.data);
        });
    }

    function cadastrar() {
        if (!nome) return;
        api.post('/funcionarios', {
            nome: nome,
            disponivel: true,
            festaHoje: 0
        }).then(() => {
            setNome('');
            carregarFuncionarios();
        });
    }

    function alternarDisponibilidade(id, disponivel) {
        api.patch(`/funcionarios/${id}/disponibilidade?disponivel=${!disponivel}`)
            .then(() => carregarFuncionarios());
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">👥 Funcionários</h2>

            <div className="bg-white rounded-xl shadow p-5 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Cadastrar novo funcionário
                </h3>
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Nome do funcionário"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    <button
                        onClick={cadastrar}
                        className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition">
                        + Cadastrar
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-blue-900 text-white">
                        <tr>
                            <th className="text-left px-5 py-3">Nome</th>
                            <th className="text-left px-5 py-3">Festas Hoje</th>
                            <th className="text-left px-5 py-3">Disponibilidade</th>
                            <th className="text-left px-5 py-3">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.map((f, index) => (
                            <tr key={f.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-5 py-3 font-medium">{f.nome}</td>
                                <td className="px-5 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        f.festaHoje === 2
                                            ? 'bg-red-100 text-red-700'
                                            : f.festaHoje === 1
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-green-100 text-green-700'
                                    }`}>
                                        {f.festaHoje}/2
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        f.disponivel
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {f.disponivel ? 'Disponível' : 'Indisponível'}
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    <button
                                        onClick={() => alternarDisponibilidade(f.id, f.disponivel)}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                                            f.disponivel
                                                ? 'border-red-400 text-red-600 hover:bg-red-50'
                                                : 'border-green-400 text-green-600 hover:bg-green-50'
                                        }`}>
                                        {f.disponivel ? 'Indisponibilizar' : 'Disponibilizar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Funcionarios;