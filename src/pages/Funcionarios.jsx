import { useState, useEffect } from 'react';
import api from '../services/api';
import { supabase } from '../services/supabase';

function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [form, setForm] = useState({ nome: '', email: '', telefone: '' });
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    function carregarFuncionarios() {
        api.get('/funcionarios').then(response => {
            setFuncionarios(response.data);
        });
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function cadastrar() {
        setErro('');
        setSucesso('');
        if (!form.nome || !form.email) {
            setErro('Nome e email são obrigatórios');
            return;
        }
        setCarregando(true);
        try {
            await api.post('/funcionarios', form);
            await supabase.auth.signInWithOtp({
                email: form.email,
                options: {
                    emailRedirectTo: 'http://localhost:3000',
                    data: { nome: form.nome }
                }
            });
            setSucesso(`Funcionário cadastrado! Email de acesso enviado para ${form.email}`);
            setForm({ nome: '', email: '', telefone: '' });
            carregarFuncionarios();
        } catch (err) {
            console.log(err.response);
            setErro(typeof err.response?.data === 'string' ? err.response.data : 'Erro ao cadastrar funcionário');
        } finally {
            setCarregando(false);
        }
    }

    function statusDiaLabel(status) {
        switch (status) {
            case 'DISPONIVEL': return { label: 'Disponível', css: 'bg-green-100 text-green-700' };
            case 'DE_FOLGA': return { label: 'De Folga', css: 'bg-yellow-100 text-yellow-700' };
            case 'AUSENTE': return { label: 'Ausente', css: 'bg-red-100 text-red-700' };
            default: return { label: status ?? 'DISPONIVEL', css: 'bg-gray-100 text-gray-700' };
        }
    }

    function alternarStatus(id, statusAtual) {
        const proximo = statusAtual === 'DISPONIVEL' ? 'DE_FOLGA' : 'DISPONIVEL';
        api.patch(`/funcionarios/${id}/status?statusDia=${proximo}`)
            .then(() => carregarFuncionarios());
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">👥 Funcionários</h2>

            <div className="bg-white rounded-xl shadow p-5 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Cadastrar novo funcionário
                </h3>

                {erro && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-3 text-sm">{erro}</div>}
                {sucesso && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-3 text-sm">{sucesso}</div>}

                <div className="flex gap-3 flex-wrap">
                    <input
                        name="nome"
                        type="text"
                        placeholder="Nome completo"
                        value={form.nome}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    <input
                        name="telefone"
                        type="text"
                        placeholder="Telefone (opcional)"
                        value={form.telefone}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-44 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
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
                            <th className="text-left px-5 py-3">Nome</th>
                            <th className="text-left px-5 py-3">Email</th>
                            <th className="text-left px-5 py-3">Festas Hoje</th>
                            <th className="text-left px-5 py-3">Avaliação</th>
                            <th className="text-left px-5 py-3">Status</th>
                            <th className="text-left px-5 py-3">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-400">
                                    Nenhum funcionário cadastrado
                                </td>
                            </tr>
                        )}
                        {funcionarios.map((f, index) => {
                            const { label, css } = statusDiaLabel(f.statusDia);
                            return (
                                <tr key={f.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-5 py-3 font-medium">{f.nome}</td>
                                    <td className="px-5 py-3 text-gray-500">{f.email}</td>
                                    <td className="px-5 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            f.festasNoDia === 2
                                                ? 'bg-red-100 text-red-700'
                                                : f.festasNoDia === 1
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-green-100 text-green-700'
                                        }`}>
                                            {f.festasNoDia}/2
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">⭐ {f.avaliacaoMedia?.toFixed(1)}</td>
                                    <td className="px-5 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${css}`}>
                                            {label}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <button
                                            onClick={() => alternarStatus(f.id, f.statusDia)}
                                            className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                                                f.statusDia === 'DISPONIVEL'
                                                    ? 'border-red-400 text-red-600 hover:bg-red-50'
                                                    : 'border-green-400 text-green-600 hover:bg-green-50'
                                            }`}>
                                            {f.statusDia === 'DISPONIVEL' ? 'Folga' : 'Disponibilizar'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Funcionarios;