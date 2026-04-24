import { useState } from 'react';
import { supabase } from './services/supabase';
import api from './services/api';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: senha
        });

        if (error) {
            setCarregando(false);
            if (error.message.includes('Email not confirmed')) {
                setErro('Confirme seu email antes de fazer login. Verifique sua caixa de entrada.');
            } else {
                setErro('Email ou senha incorretos');
            }
            return;
        }

        const perfil = data.user.app_metadata?.perfil || 'FUNCIONARIO';
        const empresaId = data.user.app_metadata?.empresa_id;

        localStorage.setItem('perfil', perfil);
        localStorage.setItem('empresa_id', empresaId);

        // Busca o plano da empresa no backend
        try {
            const res = await api.get('/auth/me');
            localStorage.setItem('plano', res.data.plano);
            localStorage.setItem('statusAssinatura', res.data.statusAssinatura);
        } catch {
            localStorage.setItem('plano', 'BASICO');
        }

        setCarregando(false);
        onLogin(perfil);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">🎉 FestApp</h1>

                {erro && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {erro}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full bg-blue-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition disabled:opacity-50"
                    >
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-4 text-xs">
                    Para contratar o FestApp acesse{' '}
                    <a href="/planos" className="text-blue-700 hover:underline">
                        nossos planos
                    </a>
                </p>
            </div>
        </div>
    );
}