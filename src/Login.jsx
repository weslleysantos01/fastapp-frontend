import { useState } from 'react';
import api from './services/api';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    function entrar() {
        if (!email || !senha) return;
        api.post('/auth/login', { email, senha })
            .then(response => {
                const { token, perfil, nome, usuarioId, funcionarioId } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('perfil', perfil);
                localStorage.setItem('nome', nome);
                localStorage.setItem('usuarioId', usuarioId);
                if (funcionarioId) localStorage.setItem('funcionarioId', funcionarioId);
                onLogin(perfil);
            })
            .catch(() => setErro('Email ou senha incorretos'));
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <span className="text-5xl">🎉</span>
                    <h1 className="text-3xl font-bold text-blue-900 mt-2">FestApp</h1>
                    <p className="text-gray-500 text-sm mt-1">Sistema de Gestão de Festas</p>
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Senha</label>
                        <input
                            type="password"
                            placeholder="••••••"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && entrar()}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                    </div>

                    {erro && (
                        <p className="text-red-500 text-sm text-center">{erro}</p>
                    )}

                    <button
                        onClick={entrar}
                        className="bg-blue-900 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition mt-2">
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;