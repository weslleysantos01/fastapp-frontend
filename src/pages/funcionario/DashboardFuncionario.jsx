import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import api from '../../services/api';

export default function DashboardFuncionario() {
    const [escalas, setEscalas] = useState([]);
    const [funcionario, setFuncionario] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                window.location.href = '/';
                return;
            }
            setFuncionario({
                nome: session.user.user_metadata?.nome || session.user.email,
                email: session.user.email
            });
            carregarEscalas();
        });
    }, []);

    function carregarEscalas() {
        api.get('/escalas/minhas').then(response => {
            setEscalas(response.data);
        });
    }

    async function registrarChegada(id) {
        setCarregando(true);
        setMensagem(null);
        try {
            await api.patch(`/escalas/${id}/chegada`);
            setMensagem({ tipo: 'sucesso', texto: 'Chegada registrada com sucesso!' });
            carregarEscalas();
        } catch (err) {
            setMensagem({ tipo: 'erro', texto: 'Erro ao registrar chegada. Tente novamente.' });
        } finally {
            setCarregando(false);
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut();
        window.location.href = '/';
    }

    function formatarData(dataHora) {
        if (!dataHora) return '—';
        return new Date(dataHora).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    }

    const proximasFestas = escalas.filter(e => !e.statusPontualidade);
    const festasRealizadas = escalas.filter(e => e.statusPontualidade);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* NAVBAR */}
            <nav className="bg-blue-900 px-4 py-4 flex items-center shadow-md sticky top-0 z-10">
                <div>
                    <span className="text-white text-lg font-bold">🎉 FestApp</span>
                    <p className="text-blue-300 text-xs">Área do Funcionário</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="ml-auto text-white text-sm font-medium bg-blue-800 px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                >
                    Sair
                </button>
            </nav>

            <div className="p-4 max-w-lg mx-auto">

                {/* CARD DE BOAS VINDAS */}
                {funcionario && (
                    <div className="bg-blue-900 rounded-2xl p-5 mb-4 text-white">
                        <p className="text-blue-300 text-sm">Bem-vindo,</p>
                        <h2 className="text-xl font-bold">{funcionario.nome}</h2>
                        <p className="text-blue-300 text-xs mt-1">{funcionario.email}</p>
                        <div className="mt-3 flex gap-3">
                            <div className="bg-blue-800 rounded-xl px-3 py-2 text-center flex-1">
                                <p className="text-2xl font-bold">{proximasFestas.length}</p>
                                <p className="text-xs text-blue-300">Próximas</p>
                            </div>
                            <div className="bg-blue-800 rounded-xl px-3 py-2 text-center flex-1">
                                <p className="text-2xl font-bold">{festasRealizadas.length}</p>
                                <p className="text-xs text-blue-300">Realizadas</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* MENSAGEM */}
                {mensagem && (
                    <div className={`rounded-xl px-4 py-3 mb-4 text-sm font-medium ${
                        mensagem.tipo === 'sucesso'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {mensagem.texto}
                    </div>
                )}

                {/* PRÓXIMAS FESTAS */}
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Próximas Festas
                </h3>

                {proximasFestas.length === 0 && (
                    <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-400 text-sm mb-4">
                        Nenhuma festa agendada no momento
                    </div>
                )}

                {proximasFestas.map(e => (
                    <div key={e.id} className="bg-white rounded-2xl shadow p-4 mb-3 border-l-4 border-blue-900">
                        <h4 className="font-bold text-blue-900 text-base">🎪 {e.festa?.nomeCliente}</h4>
                        <p className="text-sm text-gray-600 mt-1">📅 {formatarData(e.festa?.dataHora)}</p>
                        <p className="text-sm text-gray-600">📍 {e.festa?.endereco || '—'}</p>
                        <button
                            onClick={() => registrarChegada(e.id)}
                            disabled={carregando}
                            className="mt-3 w-full bg-blue-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-800 transition disabled:opacity-50 active:scale-95"
                        >
                            {carregando ? 'Registrando...' : '📍 Registrar Chegada'}
                        </button>
                    </div>
                ))}

                {/* FESTAS REALIZADAS */}
                {festasRealizadas.length > 0 && (
                    <>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2 mt-4">
                            Festas Realizadas
                        </h3>
                        {festasRealizadas.map(e => (
                            <div key={e.id} className="bg-white rounded-2xl shadow p-4 mb-3 border-l-4 border-gray-300">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-gray-700 text-base">🎪 {e.festa?.nomeCliente}</h4>
                                        <p className="text-sm text-gray-500 mt-1">📅 {formatarData(e.festa?.dataHora)}</p>
                                        <p className="text-sm text-gray-500">📍 {e.festa?.endereco || '—'}</p>
                                        {e.horaChegada && (
                                            <p className="text-sm text-gray-500">✅ Chegada: {formatarData(e.horaChegada)}</p>
                                        )}
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ml-2 ${
                                        e.statusPontualidade === 'NO_PRAZO'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {e.statusPontualidade === 'NO_PRAZO' ? 'No Prazo' : 'Atrasado'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}