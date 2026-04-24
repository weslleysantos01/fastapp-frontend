import { useState } from 'react';
import { supabase } from '../../services/supabase';

export default function LoginFuncionario() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [enviado, setEnviado] = useState(false);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [modo, setModo] = useState('senha'); // 'senha' ou 'magic'

    async function handleLogin(e) {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: senha
        });

        setCarregando(false);

        if (error) {
            setErro('Email ou senha incorretos');
            return;
        }

        const perfil = data.user.app_metadata?.perfil;
        if (perfil !== 'FUNCIONARIO') {
            setErro('Acesso não autorizado. Use o painel da gestora.');
            await supabase.auth.signOut();
            return;
        }

        window.location.href = '/funcionario/dashboard';
    }

    async function handleMagicLink(e) {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: 'http://localhost:3000/funcionario/criar-senha'
            }
        });

        setCarregando(false);

        if (error) {
            setErro('Erro ao enviar link. Verifique o email e tente novamente.');
            return;
        }

        setEnviado(true);
    }

    if (enviado) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
                    <div className="text-4xl mb-4">📧</div>
                    <h2 className="text-xl font-bold text-blue-900 mb-2">Link enviado!</h2>
                    <p className="text-sm text-gray-600">
                        Verifique sua caixa de entrada em <strong>{email}</strong> e clique no link para acessar.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-blue-900 mb-2 text-center">🎉 FestApp</h1>
                <p className="text-center text-sm text-gray-500 mb-6">Acesso para funcionários</p>

                {/* Toggle de modo */}
                <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                    <button
                        onClick={() => setModo('senha')}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                            modo === 'senha'
                                ? 'bg-white text-blue-900 shadow'
                                : 'text-gray-500'
                        }`}>
                        Email e senha
                    </button>
                    <button
                        onClick={() => setModo('magic')}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                            modo === 'magic'
                                ? 'bg-white text-blue-900 shadow'
                                : 'text-gray-500'
                        }`}>
                        Magic Link
                    </button>
                </div>

                {erro && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">{erro}</div>
                )}

                {modo === 'senha' ? (
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
                            className="w-full bg-blue-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition disabled:opacity-50">
                            {carregando ? 'Entrando...' : 'Entrar'}
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-2">
                            Primeiro acesso?{' '}
                            <button
                                type="button"
                                onClick={() => setModo('magic')}
                                className="text-blue-700 hover:underline">
                                Use o Magic Link
                            </button>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleMagicLink} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Seu email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="funcionario@email.com"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={carregando}
                            className="w-full bg-blue-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition disabled:opacity-50">
                            {carregando ? 'Enviando...' : 'Enviar link de acesso'}
                        </button>
                    </form>
                )}

                <p className="text-center text-sm text-gray-500 mt-6">
                    É gestora?{' '}
                    <a href="/" className="text-blue-700 font-medium hover:underline">
                        Acesse aqui
                    </a>
                </p>
            </div>
        </div>
    );
}