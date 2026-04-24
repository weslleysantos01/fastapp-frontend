import { useState, useEffect } from 'react';
import api from '../services/api';

function Chegada() {
    const [escalas, setEscalas] = useState([]);
    const [festaId, setFestaId] = useState('');
    const [carregando, setCarregando] = useState(false);
    const perfil = localStorage.getItem('perfil');

    useEffect(() => {
        if (perfil === 'FUNCIONARIO') {
            carregarMinhasEscalas();
        }
    }, []);

    function carregarMinhasEscalas() {
        api.get('/escalas/minhas').then(response => {
            setEscalas(response.data);
        });
    }

    function buscarEscalas() {
        if (!festaId) return;
        api.get(`/escalas/festa/${festaId}`).then(response => {
            setEscalas(response.data);
        });
    }

    async function registrarChegada(id) {
        setCarregando(true);
        try {
            await api.patch(`/escalas/${id}/chegada`);
            alert('Chegada registrada!');
            if (perfil === 'FUNCIONARIO') {
                carregarMinhasEscalas();
            } else {
                buscarEscalas();
            }
        } catch (err) {
            alert('Erro: ' + (err.response?.data || err.message));
        } finally {
            setCarregando(false);
        }
    }

    function statusColor(status) {
        switch (status) {
            case 'NO_PRAZO': return 'bg-green-100 text-green-700';
            case 'ATRASADO': return 'bg-red-100 text-red-700';
            default: return 'bg-yellow-100 text-yellow-700';
        }
    }

    function statusLabel(status) {
        switch (status) {
            case 'NO_PRAZO': return 'No Prazo';
            case 'ATRASADO': return 'Atrasado';
            case 'AUSENTE': return 'Ausente';
            default: return 'Pendente';
        }
    }

    function formatarData(dataHora) {
        if (!dataHora) return '—';
        return new Date(dataHora).toLocaleString('pt-BR');
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">⏰ Registro de Chegada</h2>

            {perfil === 'DONA' && (
                <div className="bg-white rounded-xl shadow p-5 mb-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                        Buscar escalas da festa
                    </h3>
                    <div className="flex gap-3">
                        <input
                            type="number"
                            placeholder="ID da festa"
                            value={festaId}
                            onChange={e => setFestaId(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                        <button
                            onClick={buscarEscalas}
                            className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition">
                            Buscar
                        </button>
                    </div>
                </div>
            )}

            {perfil === 'FUNCIONARIO' && escalas.length === 0 && (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
                    Você não tem festas escaladas no momento.
                </div>
            )}

            {escalas.length > 0 && (
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-blue-900 text-white">
                            <tr>
                                <th className="text-left px-5 py-3">Cliente</th>
                                <th className="text-left px-5 py-3">Data e Hora</th>
                                <th className="text-left px-5 py-3">Endereço</th>
                                {perfil === 'DONA' && (
                                    <th className="text-left px-5 py-3">Funcionário</th>
                                )}
                                <th className="text-left px-5 py-3">Chegada</th>
                                <th className="text-left px-5 py-3">Status</th>
                                <th className="text-left px-5 py-3">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {escalas.map((e, index) => (
                                <tr key={e.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-5 py-3 font-medium">{e.festa?.nomeCliente}</td>
                                    <td className="px-5 py-3 text-gray-600">{formatarData(e.festa?.dataHora)}</td>
                                    <td className="px-5 py-3 text-gray-600">{e.festa?.endereco || '—'}</td>
                                    {perfil === 'DONA' && (
                                        <td className="px-5 py-3">{e.funcionario?.nome}</td>
                                    )}
                                    <td className="px-5 py-3 text-gray-600">{formatarData(e.horaChegada)}</td>
                                    <td className="px-5 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(e.statusPontualidade)}`}>
                                            {statusLabel(e.statusPontualidade)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        {!e.statusPontualidade && perfil === 'FUNCIONARIO' && (
                                            <button
                                                onClick={() => registrarChegada(e.id)}
                                                disabled={carregando}
                                                className="bg-blue-900 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-blue-800 transition disabled:opacity-50">
                                                Registrar Chegada
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Chegada;