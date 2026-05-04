import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Perfil() {
    const [dados, setDados] = useState(null);
    const [form, setForm] = useState({ nome: '', telefone: '' });
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [exportando, setExportando] = useState(false);
    const [excluindo, setExcluindo] = useState(false);
    const [confirmarExclusao, setConfirmarExclusao] = useState(false);
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

    async function exportarDados() {
        setExportando(true);
        try {
            const r = await api.get('/empresa/meus-dados');
            const blob = new Blob([JSON.stringify(r.data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `festapp-meus-dados-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
            setSucesso('Dados exportados com sucesso!');
        } catch {
            setErro('Erro ao exportar dados. Tente novamente.');
        } finally {
            setExportando(false);
        }
    }

    async function excluirConta() {
        setExcluindo(true);
        try {
            await api.delete('/empresa/conta');
            localStorage.clear();
            window.location.href = '/login';
        } catch {
            setErro('Erro ao excluir conta. Tente novamente.');
            setExcluindo(false);
            setConfirmarExclusao(false);
        }
    }

    function nomePlano(plano) {
        switch (plano) {
            case 'BASICO': return { nome: 'Básico', cor: 'bg-gray-100 text-gray-700', preco: 'R$99/mês' };
            case 'PROFISSIONAL': return { nome: 'Profissional', cor: 'bg-blue-100 text-blue-700', preco: 'R$199/mês' };
            case 'PREMIUM': return { nome: 'Premium', cor: 'bg-purple-100 text-purple-700', preco: 'R$299/mês' };
            default: return { nome: plano, cor: 'bg-gray-100 text-gray-700', preco: '' };
        }
    }

    if (carregando) return <div className="p-6 text-center text-gray-400 animate-pulse">Carregando perfil...</div>;
    if (!dados) return <div className="p-6 text-center text-red-500">Erro ao carregar dados.</div>;

    const planoInfo = nomePlano(dados.plano);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">⚙️ Perfil da Empresa</h2>

            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Informações da Empresa</h3>
                {erro && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">{erro}</div>}
                {sucesso && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">{sucesso}</div>}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
                        <input name="nome" type="text" value={form.nome} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                        <input name="telefone" type="text" value={form.telefone} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="(83) 99999-9999" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="text" value={dados.email || ''} disabled className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed" />
                    </div>
                </div>
                <button onClick={salvar} disabled={salvando} className="mt-5 bg-blue-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition disabled:opacity-50">
                    {salvando ? 'Salvando...' : 'Salvar alterações'}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Plano Atual</h3>
                <div className="flex items-center justify-between">
                    <div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${planoInfo.cor}`}>{planoInfo.nome}</span>
                        <p className="text-gray-500 text-sm mt-2">{planoInfo.preco}</p>
                        <p className={`text-xs mt-1 ${dados.statusAssinatura === 'ATIVO' ? 'text-green-600' : 'text-red-500'}`}>
                            {dados.statusAssinatura === 'ATIVO' ? '✅ Assinatura ativa' : '❌ Assinatura inativa'}
                        </p>
                    </div>
                    {dados.plano !== 'PREMIUM' && (
                        <Link to="/planos" className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">Fazer upgrade</Link>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Privacidade e Dados</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="pr-4">
                            <p className="text-sm font-medium text-gray-700">Exportar meus dados</p>
                            <p className="text-xs text-gray-400 mt-1">Baixe seus dados em JSON (LGPD — Art. 18)</p>
                        </div>
                        <button onClick={exportarDados} disabled={exportando} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition disabled:opacity-50">
                            {exportando ? 'Exportando...' : '⬇ Exportar'}
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                        <div className="pr-4">
                            <p className="text-sm font-medium text-red-700">Excluir minha conta</p>
                            <p className="text-xs text-red-400 mt-1">Ação irreversível conforme LGPD.</p>
                        </div>
                        <button onClick={() => setConfirmarExclusao(true)} className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-red-700 transition">🗑 Excluir conta</button>
                    </div>
                </div>
            </div>

            {confirmarExclusao && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h2 className="text-xl font-bold text-red-700 mb-2">Excluir conta?</h2>
                        <p className="text-sm text-gray-500 mb-6">Ação permanente. Todos os dados da empresa e funcionários serão apagados.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmarExclusao(false)} disabled={excluindo} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm font-medium">Cancelar</button>
                            <button onClick={excluirConta} disabled={excluindo} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-medium">{excluindo ? 'Excluindo...' : 'Sim, excluir'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}