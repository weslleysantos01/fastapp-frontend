import { useState, useEffect } from 'react';
import api from '../services/api';

function Festas() {
    const [festas, setFestas] = useState([]);
    const [nome, setNome] = useState('');
    const [horario, setHorario] = useState('');
    const [qtdFuncionarios, setQtdFuncionarios] = useState(2);

    useEffect(() => {
        carregarFestas();
    }, []);

    function carregarFestas() {
        api.get('/festas').then(response => {
            setFestas(response.data);
        });
    }

    function cadastrar() {
        if (!nome || !horario) return;
        api.post('/festas', {
            nome: nome,
            horario: horario,
            qtdFuncionarios: parseInt(qtdFuncionarios),
            status: 'AGUARDANDO'
        }).then(() => {
            setNome('');
            setHorario('');
            setQtdFuncionarios(2);
            carregarFestas();
        });
    }

    function alocar(id) {
        api.post(`/festas/${id}/alocar`)
            .then(() => {
                alert('Equipe alocada com sucesso!');
                carregarFestas();
            })
            .catch(err => {
                alert('Erro: ' + err.response.data.message);
            });
    }

    function statusColor(status) {
        switch (status) {
            case 'ESCALADA': return 'bg-green-100 text-green-700';
            case 'AGUARDANDO': return 'bg-yellow-100 text-yellow-700';
            case 'CONCLUIDA': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">🎪 Festas</h2>

            <div className="bg-white rounded-xl shadow p-5 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Cadastrar nova festa
                </h3>
                <div className="flex gap-3 flex-wrap">
                    <input
                        type="text"
                        placeholder="Nome da festa"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    <input
                        type="datetime-local"
                        value={horario}
                        onChange={e => setHorario(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    <input
                        type="number"
                        placeholder="Qtd funcionários"
                        value={qtdFuncionarios}
                        onChange={e => setQtdFuncionarios(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-900"
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
                            <th className="text-left px-5 py-3">Horário</th>
                            <th className="text-left px-5 py-3">Funcionários</th>
                            <th className="text-left px-5 py-3">Status</th>
                            <th className="text-left px-5 py-3">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {festas.map((f, index) => (
                            <tr key={f.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-5 py-3 font-medium">{f.nome}</td>
                                <td className="px-5 py-3 text-gray-600">{f.horario}</td>
                                <td className="px-5 py-3">{f.qtdFuncionarios}</td>
                                <td className="px-5 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(f.status)}`}>
                                        {f.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    {f.status === 'AGUARDANDO' && (
                                        <button
                                            onClick={() => alocar(f.id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-green-700 transition">
                                            Alocar Equipe
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Festas;