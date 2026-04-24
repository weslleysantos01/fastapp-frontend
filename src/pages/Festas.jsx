import { useState, useEffect } from 'react';
import api from '../services/api';

function Festas() {
    const [festas, setFestas] = useState([]);
    const [form, setForm] = useState({
        nomeCliente: '',
        dataHora: '',
        endereco: '',
        qtdFuncionariosNecessarios: 2,
        temBarraca: false
    });
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        carregarFestas();
    }, []);

    function carregarFestas() {
        api.get('/festas').then(response => {
            setFestas(response.data);
        });
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function cadastrar() {
        setErro('');
        if (!form.nomeCliente || !form.dataHora) {
            setErro('Nome do cliente e data são obrigatórios');
            return;
        }
        setCarregando(true);
        try {
            await api.post('/festas', {
                ...form,
                qtdFuncionariosNecessarios: parseInt(form.qtdFuncionariosNecessarios)
            });
            setForm({ nomeCliente: '', dataHora: '', endereco: '', qtdFuncionariosNecessarios: 2, temBarraca: false });
            carregarFestas();
        } catch (err) {
            console.log(err.response?.data);
            setErro(typeof err.response?.data === 'string' ? err.response.data : 'Erro ao cadastrar festa');
        } finally {
            setCarregando(false);
        }
    }

    async function alocar(id) {
        try {
            await api.post(`/festas/${id}/alocar`);
            alert('Equipe alocada com sucesso!');
            carregarFestas();
        } catch (err) {
            alert('Erro: ' + (err.response?.data || err.message));
        }
    }

    function statusColor(status) {
        switch (status) {
            case 'AGENDADA': return 'bg-yellow-100 text-yellow-700';
            case 'EM_ANDAMENTO': return 'bg-blue-100 text-blue-700';
            case 'CONCLUIDA': return 'bg-green-100 text-green-700';
            case 'CANCELADA': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    function formatarData(dataHora) {
        if (!dataHora) return '-';
        return new Date(dataHora).toLocaleString('pt-BR');
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">🎪 Festas</h2>

            <div className="bg-white rounded-xl shadow p-5 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Cadastrar nova festa
                </h3>

                {erro && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-3 text-sm">{erro}</div>}

                <div className="flex gap-3 flex-wrap">
                    <input
                        name="nomeCliente"
                        type="text"
                        placeholder="Nome do cliente"
                        value={form.nomeCliente}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    <input
                        name="dataHora"
                        type="datetime-local"
                        value={form.dataHora}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    <input
                        name="endereco"
                        type="text"
                        placeholder="Endereço"
                        value={form.endereco}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    <input
                        name="qtdFuncionariosNecessarios"
                        type="number"
                        placeholder="Qtd funcionários"
                        min={1}
                        max={20}
                        value={form.qtdFuncionariosNecessarios}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    <label className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded-lg px-4 py-2 text-sm select-none">
                        <input
                            type="checkbox"
                            checked={form.temBarraca}
                            onChange={e => setForm({ ...form, temBarraca: e.target.checked })}
                            className="w-4 h-4 accent-blue-900"
                        />
                        <span className="text-gray-700">🍭 Tem barraca?</span>
                    </label>
                    <button
                        onClick={cadastrar}
                        disabled={carregando}
                        className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition disabled:opacity-50">
                        {carregando ? 'Cadastrando...' : '+ Cadastrar'}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-blue-900 text-white">
                        <tr>
                            <th className="text-left px-5 py-3">Cliente</th>
                            <th className="text-left px-5 py-3">Data e Hora</th>
                            <th className="text-left px-5 py-3">Endereço</th>
                            <th className="text-left px-5 py-3">Funcionários</th>
                            <th className="text-left px-5 py-3">Barraca</th>
                            <th className="text-left px-5 py-3">Status</th>
                            <th className="text-left px-5 py-3">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {festas.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-8 text-gray-400">
                                    Nenhuma festa cadastrada
                                </td>
                            </tr>
                        )}
                        {festas.map((f, index) => (
                            <tr key={f.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-5 py-3 font-medium">{f.nomeCliente}</td>
                                <td className="px-5 py-3 text-gray-600">{formatarData(f.dataHora)}</td>
                                <td className="px-5 py-3 text-gray-600">{f.endereco || '-'}</td>
                                <td className="px-5 py-3">{f.qtdFuncionariosNecessarios}</td>
                                <td className="px-5 py-3">
                                    {f.temBarraca
                                        ? <span className="text-green-600 font-medium">✅ Sim</span>
                                        : <span className="text-gray-400">—</span>
                                    }
                                </td>
                                <td className="px-5 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(f.status)}`}>
                                        {f.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    {f.status === 'AGENDADA' && (
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