import { useState } from 'react';
import api from '../services/api';
import { supabase } from '../services/supabase';

export default function Cadastro() {
    const plano = new URLSearchParams(window.location.search).get('plano') || 'BASICO';

    const [form, setForm] = useState({
        nomeDona: '',
        nomeEmpresa: '',
        email: '',
        senha: '',
        telefone: '',
        aceitaTermos: false
    });
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    }

    function nomePlano(p) {
        switch (p) {
            case 'PROFISSIONAL': return 'Festa Pro — R$199/mês';
            case 'PREMIUM': return 'Festa Elite — R$299/mês';
            default: return 'Festa Start — R$99/mês';
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');

        if (!form.aceitaTermos) {
            setErro('Você deve aceitar os termos de uso e política de privacidade');
            return;
        }

        setCarregando(true);

        try {
            // 1. Cadastra a empresa
            await api.post('/auth/cadastrar', { ...form, plano });

            // 2. Tenta logar para pegar o token
            const { data, error } = await supabase.auth.signInWithPassword({
                email: form.email,
                password: form.senha
            });

            // Email não confirmado ou erro de login
            if (error || !data.session) {
                window.location.href = '/aguardando-confirmacao?email=' + encodeURIComponent(form.email);
                return;
            }

            // 3. Login funcionou — vai para o Stripe
            const token = data.session.access_token;
            const checkout = await api.post('/stripe/checkout',
                { plano },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            window.location.href = checkout.data.url;

        } catch (err) {
            const msg = err.response?.data;
            setErro(typeof msg === 'string' ? msg : msg?.erro || 'Erro ao cadastrar. Tente novamente.');
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-blue-900 mb-2 text-center">
                    🎉 Criar sua conta
                </h1>

                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 mb-6 text-center">
                    <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide">Plano selecionado</p>
                    <p className="text-sm font-bold text-blue-900">{nomePlano(plano)}</p>
                </div>

                {erro && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">{erro}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Seu nome</label>
                        <input
                            name="nomeDona"
                            value={form.nomeDona}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome da empresa</label>
                        <input
                            name="nomeEmpresa"
                            value={form.nomeEmpresa}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                        <input
                            name="senha"
                            type="password"
                            value={form.senha}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            minLength={6}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone (opcional)</label>
                        <input
                            name="telefone"
                            value={form.telefone}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* LGPD: consentimento */}
                    <div className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            id="aceitaTermos"
                            name="aceitaTermos"
                            checked={form.aceitaTermos}
                            onChange={handleChange}
                            className="mt-1 cursor-pointer"
                        />
                        <label htmlFor="aceitaTermos" className="text-xs text-gray-500 cursor-pointer">
                            Li e aceito os{' '}
                            <a href="/termos" target="_blank" className="text-blue-700 underline">
                                Termos de Uso
                            </a>{' '}
                            e a{' '}
                            <a href="/privacidade" target="_blank" className="text-blue-700 underline">
                                Política de Privacidade
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={carregando || !form.aceitaTermos}
                        className="w-full bg-blue-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition disabled:opacity-50"
                    >
                        {carregando ? 'Criando conta...' : 'Criar conta e ir para o pagamento'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Já tem conta?{' '}
                    <a href="/" className="text-blue-700 font-medium hover:underline">Fazer login</a>
                </p>
            </div>
        </div>
    );
}