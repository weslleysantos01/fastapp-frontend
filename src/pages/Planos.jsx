export default function Planos() {
    function irParaCadastro(plano) {
        window.location.href = `/cadastro?plano=${plano}`;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl">

                <p className="text-center text-blue-700 text-sm font-semibold mb-2 uppercase tracking-widest">
                    Planos e preços
                </p>
                <h1 className="text-3xl font-bold text-blue-900 text-center mb-2">
                    Organize sua empresa e economize tempo na gestão de festas
                </h1>
                <p className="text-center text-gray-500 mb-2">
                    Cancele quando quiser. Sem surpresas.
                </p>
                <p className="text-center text-gray-400 text-sm mb-10">
                    🔒 Pagamento seguro via Stripe &nbsp;·&nbsp; ✅ 7 dias de garantia
                </p>

                <div className="grid grid-cols-3 gap-6 items-start">

                    {/* FESTA START */}
                    <div className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col">
                        <div className="mb-4">
                            <h2 className="font-bold text-gray-500 text-sm uppercase mb-1">Festa Start</h2>
                            <p className="text-4xl font-bold text-blue-900 mb-1">
                                R$99<span className="text-base font-normal text-gray-400">/mês</span>
                            </p>
                            <p className="text-sm text-gray-400">Até 15 funcionários</p>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-3 mb-8 flex-1">
                            <li>✅ Escale sua equipe automaticamente</li>
                            <li>✅ Evite funcionários atrasados automaticamente</li>
                            <li>✅ Saiba quem chegou e quem faltou em cada festa</li>
                            <li>✅ Suporte por email</li>
                        </ul>
                        <button
                            onClick={() => irParaCadastro('BASICO')}
                            className="w-full border-2 border-blue-900 text-blue-900 py-3 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition">
                            Começar agora
                        </button>
                    </div>

                    {/* FESTA PRO */}
                    <div className="bg-blue-900 rounded-xl shadow-xl p-6 border border-blue-900 relative flex flex-col">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-blue-900 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                            🔥 Mais escolhido por empresas
                        </span>
                        <div className="mb-4">
                            <h2 className="font-bold text-blue-300 text-sm uppercase mb-1">Festa Pro</h2>
                            <div className="flex items-baseline gap-2 mb-1">
                                <p className="text-4xl font-bold text-white">
                                    R$199<span className="text-base font-normal text-blue-300">/mês</span>
                                </p>
                                <span className="text-blue-300 line-through text-sm">R$249</span>
                            </div>
                            <p className="text-sm text-blue-300">Até 30 funcionários</p>
                        </div>
                        <ul className="text-sm text-blue-100 space-y-3 mb-8 flex-1">
                            <li>✅ Tudo do Festa Start</li>
                            <li>✅ Saiba quanto você lucra em cada festa</li>
                            <li>✅ Nunca mais dois brinquedos no mesmo horário</li>
                            <li>✅ Relatórios completos de receita e lucro</li>
                            <li>✅ Suporte prioritário</li>
                        </ul>
                        <button
                            onClick={() => irParaCadastro('PROFISSIONAL')}
                            className="w-full bg-yellow-400 text-blue-900 py-3 rounded-lg font-bold hover:bg-yellow-300 transition">
                            Quero crescer meu negócio
                        </button>
                        <p className="text-center text-blue-300 text-xs mt-3">
                            Ideal para empresas que querem crescer
                        </p>
                    </div>

                    {/* FESTA ELITE */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900 flex flex-col">
                        <div className="mb-4">
                            <h2 className="font-bold text-blue-900 text-sm uppercase mb-1">Festa Elite</h2>
                            <div className="flex items-baseline gap-2 mb-1">
                                <p className="text-4xl font-bold text-blue-900">
                                    R$299<span className="text-base font-normal text-gray-400">/mês</span>
                                </p>
                                <span className="text-gray-400 line-through text-sm">R$379</span>
                            </div>
                            <p className="text-sm text-gray-400">Funcionários ilimitados</p>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-3 mb-8 flex-1">
                            <li>✅ Tudo do Festa Pro</li>
                            <li>🚀 Em breve: atendimento automático no WhatsApp</li>
                            <li>✅ Suporte dedicado 24/7</li>
                            <li>✅ Acesso antecipado a novas funcionalidades</li>
                        </ul>
                        <button
                            onClick={() => irParaCadastro('PREMIUM')}
                            className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
                            Quero o melhor
                        </button>
                    </div>

                </div>

                <p className="text-center text-gray-400 text-xs mt-8">
                    🔒 Pagamento seguro via Stripe &nbsp;·&nbsp; ✅ Cancele quando quiser &nbsp;·&nbsp; ✅ 7 dias de garantia
                </p>
            </div>
        </div>
    );
}