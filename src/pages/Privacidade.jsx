export default function Privacidade() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
                <h1 className="text-3xl font-bold text-blue-900 mb-2">Política de Privacidade</h1>
                <p className="text-sm text-gray-400 mb-8">Última atualização: maio de 2026 · v1.0</p>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">1. Introdução</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        O FestApp respeita sua privacidade e está comprometido com a proteção dos seus dados
                        pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
                        Esta Política descreve quais dados coletamos, como utilizamos, com quem compartilhamos
                        e quais são os seus direitos.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">2. Controlador dos Dados</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        <strong>FestApp Tecnologia Ltda.</strong><br />
                        CNPJ: a definir<br />
                        E-mail:{' '}
                        <a href="mailto:contato@festapp.com.br" className="text-blue-700 underline">
                            contato@festapp.com.br
                        </a>
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">3. Dados que Coletamos</h2>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                        <li><strong>Dados da empresa:</strong> nome, e-mail, telefone e plano contratado;</li>
                        <li><strong>Dados dos usuários/funcionários:</strong> nome, e-mail, telefone, gênero e data de nascimento;</li>
                        <li><strong>Dados de uso:</strong> festas, escalas, registros de ponto e informações financeiras;</li>
                        <li><strong>Dados de segurança:</strong> endereço IP, logs de acesso e metadados das requisições, armazenados temporariamente para monitoramento e prevenção de ataques;</li>
                        <li><strong>Dados de pagamento:</strong> processados exclusivamente pelo Stripe — o FestApp não armazena dados de cartão.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">4. Finalidade e Base Legal do Tratamento</h2>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                        <li><strong>Execução de contrato:</strong> prestação dos serviços contratados e gestão da conta;</li>
                        <li><strong>Cumprimento de obrigação legal:</strong> atendimento a exigências legais e regulatórias;</li>
                        <li><strong>Legítimo interesse:</strong> segurança da plataforma, prevenção de fraudes e melhoria dos serviços;</li>
                        <li><strong>Consentimento:</strong> quando aplicável, especialmente para comunicações não essenciais.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">5. Dados de Segurança e Logs</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Para garantir a segurança da plataforma e prevenir ataques cibernéticos (como DDoS
                        e acessos não autorizados), coletamos e armazenamos temporariamente endereços IP,
                        logs de acesso e informações técnicas das requisições. Esses dados são utilizados
                        exclusivamente para segurança e auditoria, não sendo utilizados para fins comerciais.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">6. Pagamentos — Stripe</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Os pagamentos são processados pelo <strong>Stripe</strong>, empresa certificada
                        PCI DSS Nível 1. O FestApp não armazena dados completos de cartão de crédito ou
                        débito. Recomendamos a leitura da{' '}
                        <a href="https://stripe.com/br/privacy" target="_blank" rel="noreferrer"
                            className="text-blue-700 underline">
                            Política de Privacidade do Stripe
                        </a>.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">7. Infraestrutura e Proteção</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        O FestApp utiliza ou poderá utilizar serviços de terceiros para infraestrutura e
                        segurança, incluindo:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 mt-3">
                        <li><strong>Cloudflare</strong> — proteção contra ataques DDoS e tráfego malicioso;</li>
                        <li><strong>Supabase</strong> — armazenamento e autenticação de usuários.</li>
                    </ul>
                    <p className="text-sm text-gray-600 leading-relaxed mt-3">
                        Esses serviços podem processar dados conforme suas próprias políticas de privacidade.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">8. Transferência Internacional de Dados</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Alguns provedores utilizados podem estar localizados fora do Brasil. Nesses casos,
                        garantimos que a transferência ocorre em conformidade com a LGPD, adotando medidas
                        adequadas de proteção e segurança.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">9. Compartilhamento de Dados</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        O FestApp não vende dados pessoais. Os dados podem ser compartilhados apenas com
                        prestadores de serviço essenciais (Stripe, Supabase, Cloudflare) e com autoridades
                        públicas quando exigido por lei ou ordem judicial.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">10. Cookies</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Utilizamos cookies para manter a sessão ativa, melhorar a experiência de navegação
                        e garantir a segurança da aplicação. O usuário pode gerenciar cookies nas
                        configurações do navegador.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">11. Direitos do Usuário (LGPD)</h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">Nos termos da LGPD, você pode:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                        <li>Confirmar a existência de tratamento de dados;</li>
                        <li>Acessar seus dados;</li>
                        <li>Corrigir dados incompletos ou desatualizados;</li>
                        <li>Solicitar exclusão de dados;</li>
                        <li>Solicitar portabilidade;</li>
                        <li>Revogar consentimento.</li>
                    </ul>
                    <p className="text-sm text-gray-600 leading-relaxed mt-3">
                        Dentro da plataforma: <strong>Perfil → Exportar dados</strong> ou <strong>Perfil → Excluir conta</strong>.<br />
                        Ou entre em contato:{' '}
                        <a href="mailto:contato@festapp.com.br" className="text-blue-700 underline">
                            contato@festapp.com.br
                        </a>
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">12. Retenção de Dados</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Os dados são mantidos enquanto a conta estiver ativa. Após exclusão da conta, dados
                        pessoais são removidos em até <strong>30 dias</strong>, salvo obrigação legal. Logs
                        de segurança são mantidos por até <strong>90 dias</strong>.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">13. Segurança da Informação</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Adotamos medidas técnicas e organizacionais para proteger os dados, incluindo
                        criptografia em trânsito (HTTPS), controle de acesso restrito, monitoramento de
                        segurança e boas práticas de desenvolvimento seguro (OWASP).
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">14. Uso por Menores de Idade</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        A plataforma não é destinada a menores de 18 anos sem autorização de responsável
                        legal. Caso seja identificado uso indevido, os dados poderão ser removidos.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">15. Encarregado de Proteção de Dados (DPO)</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Para questões relacionadas à proteção de dados:{' '}
                        <a href="mailto:contato@festapp.com.br" className="text-blue-700 underline">
                            contato@festapp.com.br
                        </a>
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">16. Alterações nesta Política</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Esta Política poderá ser atualizada periodicamente. Recomendamos a revisão regular
                        desta página. Mudanças relevantes serão comunicadas por email.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">17. Contato</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        <a href="mailto:contato@festapp.com.br" className="text-blue-700 underline">
                            contato@festapp.com.br
                        </a>
                    </p>
                </section>

                <div className="border-t pt-6 mt-6">
                    <p className="text-xs text-gray-400 text-center">
                        FestApp Tecnologia Ltda. · CNPJ: a definir · contato@festapp.com.br · v1.0 — maio 2026
                    </p>
                </div>
            </div>
        </div>
    );
}