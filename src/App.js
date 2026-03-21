import { useState } from 'react';
import Login from './Login';
import Funcionarios from './pages/Funcionarios';
import Festas from './pages/Festas';
import Chegada from './pages/Chegada';

function App() {
    const [perfil, setPerfil] = useState(localStorage.getItem('perfil'));
    const [pagina, setPagina] = useState('funcionarios');

    function handleLogin(perfilLogado) {
        setPerfil(perfilLogado);
    }

    function handleLogout() {
        localStorage.clear();
        setPerfil(null);
    }

    if (!perfil) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-900 px-6 py-4 flex items-center gap-4 shadow-md">
                <span className="text-white text-xl font-bold mr-6">🎉 FestApp</span>

                {perfil === 'DONA' && (
                    <>
                        <button
                            onClick={() => setPagina('funcionarios')}
                            className={`px-4 py-2 rounded text-sm font-medium transition ${
                                pagina === 'funcionarios'
                                    ? 'bg-white text-blue-900'
                                    : 'text-white hover:bg-blue-800'
                            }`}>
                            👥 Funcionários
                        </button>
                        <button
                            onClick={() => setPagina('festas')}
                            className={`px-4 py-2 rounded text-sm font-medium transition ${
                                pagina === 'festas'
                                    ? 'bg-white text-blue-900'
                                    : 'text-white hover:bg-blue-800'
                            }`}>
                            🎪 Festas
                        </button>
                        <button
                            onClick={() => setPagina('chegada')}
                            className={`px-4 py-2 rounded text-sm font-medium transition ${
                                pagina === 'chegada'
                                    ? 'bg-white text-blue-900'
                                    : 'text-white hover:bg-blue-800'
                            }`}>
                            ⏰ Chegada
                        </button>
                    </>
                )}

                {perfil === 'FUNCIONARIO' && (
                    <button
                        onClick={() => setPagina('chegada')}
                        className={`px-4 py-2 rounded text-sm font-medium transition ${
                            pagina === 'chegada'
                                ? 'bg-white text-blue-900'
                                : 'text-white hover:bg-blue-800'
                        }`}>
                        ⏰ Minha Chegada
                    </button>
                )}

                <div className="ml-auto flex items-center gap-3">
                    <span className="text-white text-sm">
                        Olá, {localStorage.getItem('nome')}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 rounded text-sm text-white border border-white hover:bg-blue-800 transition">
                        Sair
                    </button>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto p-6">
                {pagina === 'funcionarios' && perfil === 'DONA' && <Funcionarios />}
                {pagina === 'festas' && perfil === 'DONA' && <Festas />}
                {pagina === 'chegada' && <Chegada />}
            </main>
        </div>
    );
}

export default App;