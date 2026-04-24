import { useState, useEffect } from 'react';
import api from '../services/api';
import { usePlano } from '../hooks/usePlano';
import BloqueadoPorPlano from '../components/BloqueadoPorPlano';

function Financeiro() {
    const { temAcesso } = usePlano();

    const [registros, setRegistros] = useState([]);
    const [festas, setFestas] = useState([]);
    const [resumo, setResumo] = useState({ receita: 0, custo: 0, lucro: 0 });
    const [form, setForm] = useState({
        festaId: '',
        valorCobrado: '',
        valorPagoEquipe: ''
    });
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        if (temAcesso('PROFISSIONAL')) {
            carregarTudo();
        }
    }, []);

    function carregarTudo() {
        api.get('/financeiro').then(r => setRegistros(r.data));
        api.get('/financeiro/resumo').then(r => setResumo(r.data));
        api.get('/festas').then(r => setFestas(r.data));
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function salvar() {
        setErro(''); setSucesso('');
        if (!form.festaId || !form.valorCobrado) {
            setErro('Festa e valor cobrado são obrigatórios');
            return;
        }
        setCarregando(true);
        try {
            await api.post('/financeiro', {
                festaId: parseInt(form.festaId),
                valorCobrado: parseFloat(form.valorCobrado),
                valorPagoEquipe: form.valorPagoEquipe ? parseFloat(form.valorPagoEquipe) : 0
            });
            setSucesso('Registro salvo!');
            setForm({ festaId: '', valorCobrado: '', valorPagoEquipe: '' });
            carregarTudo();
        } catch (err) {
            setErro(typeof err.response?.data === 'string' ? err.response.data : 'Erro ao salvar');
        } finally {
            setCarregando(false);
        }
    }

    async function atualizarStatus(id, status) {
        await api.patch(`/financeiro/${id}/status?status=${status}`);
        carregarTudo();
    }

    function statusColor(status) {
        switch (status) {
            case 'PAGO': return 'bg-green-100 text-green-700';
            case 'PENDENTE': return 'bg-yellow-100 text-yellow-700';
            case 'CANCELADO': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    function formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency', currency: 'BRL'
        }).format(valor || 0);
    }

    if (!temAcesso('PROFISSIONAL')) {
        return <BloqueadoPorPlano planoNecessario="PROFISSIONAL" />;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">💰 Financeiro</h2>

            {/* RESUMO */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
                    <p className="text-sm text-gray-500 mb-1">Receita Total</p>
                    <p className="text-2xl font-bold text-green-600">{formatarMoeda(resumo.receita)}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-400">
                    <p className="text-sm text-gray-500 mb-1">Custo Equipe</p>
                    <p className="text-2xl font-bold text-red-500">{formatarMoeda(resumo.custo)}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
                    <p className="text-sm text-gray-500 mb-1">Lucro</p>
                    <p className={`text-2xl font-bold ${resumo.lucro >= 0 ? 'text-blue-700' : 'text-red-600'}`}>
                        {formatarMoeda(resumo.lucro)}
                    </p>
                </div>
            </div>

            {/* FORMULÁRIO */}
            <div className="bg-white rounded-xl shadow p-5 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Registrar valor da festa
                </h3>

                {erro && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-3 text-sm">{erro}</div>}
                {sucesso && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-3 text-sm">{sucesso}</div>}

                <div className="flex gap-3 flex-wrap">
                    <select
                        name="festaId"
                        value={form.festaId}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-900">
                        <option value="">Selecione a festa</option>
                        {festas.map(f => (
                            <option key={f.id} value={f.id}>
                                {f.nomeCliente} — {new Date(f.dataHora).toLocaleDateString('pt-BR')}
                            </option>
                        ))}
                    </select>
                    <input
                        name="valorCobrado"
                        type="number"
                        step="0.01"
                        placeholder="Valor cobrado R$"
                        value={form.valorCobrado}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-44 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    <input
                        name="valorPagoEquipe"
                        type="number"
                        step="0.01"
                        placeholder="Custo equipe R$"
                        value={form.valorPagoEquipe}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-44 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    <button
                        onClick={salvar}
                        disabled={carregando}
                        className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition disabled:opacity-50">
                        {carregando ? 'Salvando...' : '+ Registrar'}
                    </button>
                </div>
            </div>

            {/* TABELA */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-blue-900 text-white">
                        <tr>
                            <th className="text-left px-5 py-3">Festa</th>
                            <th className="text-left px-5 py-3">Data</th>
                            <th className="text-left px-5 py-3">Valor Cobrado</th>
                            <th className="text-left px-5 py-3">Custo Equipe</th>
                            <th className="text-left px-5 py-3">Lucro</th>
                            <th className="text-left px-5 py-3">Status</th>
                            <th className="text-left px-5 py-3">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-8 text-gray-400">
                                    Nenhum registro financeiro
                                </td>
                            </tr>
                        )}
                        {registros.map((r, index) => (
                            <tr key={r.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-5 py-3 font-medium">{r.festa?.nomeCliente}</td>
                                <td className="px-5 py-3 text-gray-600">
                                    {new Date(r.festa?.dataHora).toLocaleDateString('pt-BR')}
                                </td>
                                <td className="px-5 py-3 text-green-600 font-medium">
                                    {formatarMoeda(r.valorCobrado)}
                                </td>
                                <td className="px-5 py-3 text-red-500">
                                    {formatarMoeda(r.valorPagoEquipe)}
                                </td>
                                <td className={`px-5 py-3 font-medium ${
                                    (r.valorCobrado - r.valorPagoEquipe) >= 0
                                        ? 'text-blue-700' : 'text-red-600'
                                }`}>
                                    {formatarMoeda(r.valorCobrado - r.valorPagoEquipe)}
                                </td>
                                <td className="px-5 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(r.statusPagamento)}`}>
                                        {r.statusPagamento}
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    {r.statusPagamento === 'PENDENTE' && (
                                        <button
                                            onClick={() => atualizarStatus(r.id, 'PAGO')}
                                            className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-green-700 transition">
                                            Marcar Pago
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

export default Financeiro;