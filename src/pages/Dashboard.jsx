import { useState, useEffect } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Dashboard() {
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        api.get('/dashboard')
            .then(r => setDados(r.data))
            .finally(() => setCarregando(false));
    }, []);

    function formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency', currency: 'BRL'
        }).format(valor || 0);
    }

    function formatarData(dataHora) {
        return new Date(dataHora).toLocaleDateString('pt-BR');
    }

if (carregando) {
    return (
        <div className="p-6 text-center text-gray-400 animate-pulse">
            Carregando dashboard...
        </div>
    );
}

if (!dados) {
    return (
        <div className="p-6 text-center text-red-400">
            ⚠️ Erro ao carregar dashboard. Verifique se o servidor está rodando.
        </div>
    );
}

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">📊 Dashboard</h2>

            {/* CARDS */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
                    <p className="text-sm text-gray-500 mb-1">Receita do Mês</p>
                    <p className="text-2xl font-bold text-green-600">
                        {formatarMoeda(dados.receitaMes)}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
                    <p className="text-sm text-gray-500 mb-1">Festas Hoje</p>
                    <p className="text-2xl font-bold text-blue-700">
                        {dados.festasHoje}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-purple-500">
                    <p className="text-sm text-gray-500 mb-1">Festas na Semana</p>
                    <p className="text-2xl font-bold text-purple-700">
                        {dados.festasSemana}
                    </p>
                </div>
            </div>

            {/* GRÁFICO */}
            <div className="bg-white rounded-xl shadow p-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                    Receita por Mês ({new Date().getFullYear()})
                </h3>
                {dados.graficoReceita.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm py-8">
                        Nenhum dado financeiro registrado ainda
                    </p>
                ) : (
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={dados.graficoReceita}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`}
                            />
                            <Tooltip
                                formatter={v => formatarMoeda(v)}
                                labelFormatter={l => `Mês: ${l}`}
                            />
                            <Bar dataKey="receita" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* ÚLTIMAS FESTAS */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="px-5 py-4 border-b">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">
                        Últimas Festas
                    </h3>
                </div>
                <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-5 py-3 text-gray-500 font-medium">Cliente</th>
                            <th className="text-left px-5 py-3 text-gray-500 font-medium">Data</th>
                            <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.ultimasFestas.length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center py-8 text-gray-400">
                                    Nenhuma festa cadastrada
                                </td>
                            </tr>
                        )}
                        {dados.ultimasFestas.map((f, i) => (
                            <tr key={f.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-5 py-3 font-medium">{f.nomeCliente}</td>
                                <td className="px-5 py-3 text-gray-600">{formatarData(f.dataHora)}</td>
                                <td className="px-5 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        f.status === 'AGENDADA'
                                            ? 'bg-blue-100 text-blue-700'
                                            : f.status === 'CONCLUIDA'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {f.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}