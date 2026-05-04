import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { supabase } from './services/supabase';
import api from './services/api';

// Importação das Páginas
import Login from './Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import Funcionarios from './pages/Funcionarios';
import Festas from './pages/Festas';
import Chegada from './pages/Chegada';
import Brinquedos from './pages/Brinquedos';
import Financeiro from './pages/Financeiro';
import Planos from './pages/Planos';
import PagamentoSucesso from './pages/PagamentoSucesso';
import PagamentoCancelado from './pages/PagamentoCancelado';
import AguardandoConfirmacao from './pages/AguardandoConfirmacao';
import RelatorioFuncionarios from './pages/RelatorioFuncionarios';
import Perfil from './pages/Perfil';
import Termos from './pages/Termos';
import Privacidade from './pages/Privacidade';

function ModalUpgrade({ onFechar }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4 text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h2 className="text-xl font-bold text-blue-900 mb-2">Funcionalidade bloqueada</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Essa funcionalidade não está disponível no seu plano atual.
                    Faça upgrade para continuar crescendo!
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onFechar}
                        className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                    >
                        Agora não
                    </button>
                    
                    <Link
                        to="/planos"
                        onClick={onFechar}
                        className="flex-1 bg-blue-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition text-center"
                    >
                        Ver planos →
                    </Link>
                </div>
            </div>
        </div>
    );
}

function RotaBloqueada({ plano, planosPermitidos, children }) {
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        if (!planosPermitidos.includes(plano)) {
            setMostrarModal(true);
        }
    }, [plano, planosPermitidos]);

    if (!planosPermitidos.includes(plano)) {
        return (
            <>
                <div className="p-6 text-center text-gray-400">
                    <div className="text-5xl mb-4">🔒</div>
                    <p className="font-medium text-gray-600">Funcionalidade não disponível no seu plano</p>
                    <Link to="/planos" className="mt-4 inline-block text-blue-700 text-sm hover:underline">
                        Ver opções de upgrade →
                    </Link>
                </div>
                {mostrarModal && <ModalUpgrade onFechar={() => setMostrarModal(false)} />}
            </>
        );
    }

    return children;
}

function App() {
    const [perfil, setPerfil] = useState(localStorage.getItem('perfil'));
    const [plano, setPlano] = useState(localStorage.getItem('plano') || 'BASICO');
    const [modalUpgrade, setModalUpgrade] = useState(false);

    const PRO_OU_ACIMA = ['PROFISSIONAL', 'PREMIUM'];

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                const p = session.user.app_metadata?.perfil;

                if (p === 'FUNCIONARIO') {
                    handleLogout();
                    return;
                }

                setPerfil(p);
                localStorage.setItem('perfil', p);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (perfil === 'DONA') {
            api.get('/empresa/perfil')
                .then(r => {
                    const p = r.data?.plano || 'BASICO';
                    setPlano(p);
                    localStorage.setItem('plano', p);
                })
                .catch(() => {});
        }
    }, [perfil]);

    function handleLogout() {
        supabase.auth.signOut();
        localStorage.clear();
        setPerfil(null);
        setPlano('BASICO');
    }

    function temAcesso(planosPermitidos) {
        return planosPermitidos.includes(plano);
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* --- ROTAS PÚBLICAS --- */}
                <Route path="/login" element={!perfil ? <Login onLogin={setPerfil} /> : <Navigate to="/" />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/planos" element={<Planos />} />
                <Route path="/aguardando-confirmacao" element={<AguardandoConfirmacao />} />
                <Route path="/pagamento/sucesso" element={<PagamentoSucesso />} />
                <Route path="/pagamento/cancelado" element={<PagamentoCancelado />} />
                <Route path="/termos" element={<Termos />} />
                <Route path="/privacidade" element={<Privacidade />} />

                {/* --- ÁREA PRIVADA --- */}
                <Route
                    path="/*"
                    element={
                        !perfil ? (
                            <Navigate to="/login" />
                        ) : (
                            <div className="min-h-screen bg-gray-100">
                                <nav className="bg-blue-900 px-6 py-4 flex items-center gap-4 shadow-md flex-wrap">
                                    <span className="text-white text-xl font-bold mr-6">🎉 FestApp</span>

                                    {perfil === 'DONA' && (
                                        <>
                                            <Link to="/" className="text-white text-sm font-medium hover:underline">Dashboard</Link>
                                            <Link to="/funcionarios" className="text-white text-sm font-medium hover:underline">Funcionários</Link>
                                            <Link to="/festas" className="text-white text-sm font-medium hover:underline">Festas</Link>
                                            <Link to="/brinquedos" className="text-white text-sm font-medium hover:underline">Brinquedos</Link>
                                            <Link to="/chegada" className="text-white text-sm font-medium hover:underline">Ponto</Link>

                                            {temAcesso(PRO_OU_ACIMA) ? (
                                                <>
                                                    <Link to="/financeiro" className="text-white text-sm font-medium hover:underline">Financeiro</Link>
                                                    <Link to="/relatorio/funcionarios" className="text-white text-sm font-medium hover:underline">Relatório</Link>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => setModalUpgrade(true)} className="text-yellow-300 text-sm font-medium hover:underline">🔒 Financeiro</button>
                                                    <button onClick={() => setModalUpgrade(true)} className="text-yellow-300 text-sm font-medium hover:underline">🔒 Relatório</button>
                                                </>
                                            )}

                                            <Link to="/planos" className="text-white text-sm font-medium hover:underline">Planos</Link>
                                            <Link to="/perfil" className="text-white text-sm font-medium hover:underline">Perfil</Link>
                                        </>
                                    )}

                                    <button
                                        onClick={handleLogout}
                                        className="ml-auto text-white text-sm font-medium hover:underline"
                                    >
                                        Sair
                                    </button>
                                </nav>

                                {modalUpgrade && <ModalUpgrade onFechar={() => setModalUpgrade(false)} />}

                                <div className="p-4">
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/funcionarios" element={<Funcionarios />} />
                                        <Route path="/festas" element={<Festas />} />
                                        <Route path="/brinquedos" element={<Brinquedos />} />
                                        <Route path="/chegada" element={<Chegada />} />
                                        <Route path="/perfil" element={<Perfil />} />
                                        <Route path="/planos" element={<Planos />} />

                                        <Route
                                            path="/financeiro"
                                            element={
                                                <RotaBloqueada plano={plano} planosPermitidos={PRO_OU_ACIMA}>
                                                    <Financeiro />
                                                </RotaBloqueada>
                                            }
                                        />
                                        <Route
                                            path="/relatorio/funcionarios"
                                            element={
                                                <RotaBloqueada plano={plano} planosPermitidos={PRO_OU_ACIMA}>
                                                    <RelatorioFuncionarios />
                                                </RotaBloqueada>
                                            }
                                        />
                                    </Routes>
                                </div>
                            </div>
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
