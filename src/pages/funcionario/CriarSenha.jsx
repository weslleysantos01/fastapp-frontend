import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

export default function CriarSenha() {
    const [senha, setSenha] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [sessao, setSessao] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                window.location.href = '/funcionario';
                return;
            }
            setSessao(session);
        });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');

        if (senha.length < 6) {
            setErro('A senha deve ter no mínimo 6 caracteres');
            return;
        }

        if (senha !== confirmar) {
            setErro('As senhas não coincidem');
            return;
        }

        setCarregando(true);

        const { error } = await supabase.auth.updateUser({ password: senha });

        setCarregando(false);

        if (error) {
            setErro('Erro ao definir senha. Tente novamente.');
            return;
        }

        window.location.href = '/funcionario/dashboard';
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <div className="text-center mb-6">
                    <div className="text-4xl mb-2">🔐</div>
                    <h1 className="text-2xl font-bold text-blue-900">Criar sua senha</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Defina uma senha para acessar o FestApp
                    </p>
                </div>

                {erro && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {erro}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nova senha
                        </label>
                        <input
                            type="password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            minLength={6}
                            placeholder="Mínimo 6 caracteres"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar senha
                        </label>
                        <input
                            type="password"
                            value={confirmar}
                            onChange={e => setConfirmar(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="Repita a senha"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full bg-blue-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition disabled:opacity-50"
                    >
                        {carregando ? 'Salvando...' : 'Salvar e entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}