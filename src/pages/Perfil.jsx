import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Perfil() {
    const [dados, setDados] = useState(null);
    const [form, setForm] = useState({ nome: '', telefone: '' });
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');

    useEffect(() => {
        async function fetchPerfil() {
            try {
                const r = await api.get('/empresa/perfil');
                setDados(r.data);
                setForm({
                    nome: r.data?.nome || '',
                    telefone: r.data?.telefone || ''
                });
            } catch {
                setErro('Erro ao carregar perfil.');
            } finally {
                setCarregando(false);
            }
        }
        fetchPerfil();
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function salvar() {
        setErro('');
        setSucesso('');

        if (!form.nome.trim()) {
            setErro('Nome é obrigatório');
            return;
        }

        setSalvando(true);
        try {
            await api.put('/empresa/perfil', form);
            setSucesso('Perfil atualizado com sucesso!');
        } catch {
            setErro('Erro ao salvar. Tente novamente.');
        } finally {
            setSalvando(false);
        }
    }

    function nomePlano(plano) {
        switch (plano) {
            case 'BASICO':
                return { nome: 'Básico', cor: 'bg-gray-100 text-gray-700', preco: 'R$99/mês' };
            case 'PROFISSIONAL':
                return { nome: 'Profissional', cor: 'bg-blue-100 text-blue-700', preco: 'R$199/mês' };
            case 'PREMIUM':
                return { nome: 'Premium', cor: 'bg-purple-100 text-purple-700', preco: 'R$299/mês' };
            default:
                return { nome: plano, cor: 'bg-gray-100 text-gray-700', preco: '' };
        }
    }

    if (carregando) {
        return (
            <div className="p-6 text-center text-gray-400 animate-pulse">
                Carregando perfil...
            </div>
        );
    }

    if (!dados) {
        return <div className="p-6 text-center text-red-500">Erro ao carregar dados.</div>;
    }

    const planoInfo = nomePlano(dados.plano);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">⚙️ Perfil da Empresa</h2>

            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                    Informações da Empresa
                </h3>

                {erro && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {erro}
                    </div>
                )}

                {sucesso && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
                        {sucesso}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome da Empresa
                        </label>
                        <input
                            name="nome"
                            type="text"
                            value={form.nome}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefone
                        </label>
                        <input
                            name="telefone"
                            type="text"
                            value={form.telefone}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="(83) 99999-9999"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="text"
                            value={dados.email || ''}
                            disabled
                            className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                        />
                    </div>
                </div>

                <button
                    onClick={salvar}
                    disabled={salvando}
                    className="mt-5 bg-blue-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition disabled:opacity-50"
                >
                    {salvando ? 'Salvando...' : 'Salvar alterações'}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                    Plano Atual
                </h3>

                <div className="flex items-center justify-between">
                    <div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${planoInfo.cor}`}>
                            {planoInfo.nome}
                        </span>

                        <p className="text-gray-500 text-sm mt-2">
                            {planoInfo.preco}
                        </p>

                        <p
                            className={`text-xs mt-1 ${
                                dados.statusAssinatura === 'ATIVO'
                                    ? 'text-green-600'
                                    : 'text-red-500'
                            }`}
                        >
                            {dados.statusAssinatura === 'ATIVO'
                                ? '✅ Assinatura ativa'
                                : '❌ Assinatura inativa'}
                        </p>
                    </div>

                    {dados.plano !== 'PREMIUM' && (
                        <a
                            href="/planos"
                            className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
                        >
                            Fazer upgrade
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}