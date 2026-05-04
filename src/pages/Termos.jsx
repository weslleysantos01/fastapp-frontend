export default function Termos() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
                <h1 className="text-3xl font-bold text-blue-900 mb-2">Termos de Uso</h1>
                <p className="text-sm text-gray-400 mb-8">Última atualização: maio de 2026 · v1.0</p>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">1. Aceitação dos Termos</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Ao acessar ou utilizar o FestApp, você declara que leu, compreendeu e concorda com estes
                        Termos de Uso e com a Política de Privacidade. Caso não concorde, não utilize a plataforma.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">2. Identificação do Fornecedor</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        <strong>FestApp Tecnologia Ltda.</strong><br />
                        CNPJ: a definir<br />
                        E-mail: <a href="mailto:contato@festapp.com.br" className="text-blue-700 underline">contato@festapp.com.br</a>
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">3. Objeto</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        O FestApp é uma plataforma SaaS destinada à gestão de eventos, equipes, escalas,
                        registros operacionais e controle financeiro.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">4. Cadastro e Responsabilidade da Conta</h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">O usuário se compromete a:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                        <li>Fornecer dados verídicos e atualizados;</li>
                        <li>Manter a confidencialidade de login e senha;</li>
                        <li>Não compartilhar acesso com terceiros não autorizados.</li>
                    </ul>
                    <p className="text-sm text-gray-600 leading-relaxed mt-3">
                        O titular da conta é integralmente responsável por todas as atividades realizadas.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">5. Responsabilidade sobre Dados de Terceiros</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Ao utilizar o FestApp para cadastrar funcionários ou terceiros, o cliente declara que
                        possui base legal para tratar esses dados (ex: contrato ou consentimento), está em
                        conformidade com a LGPD e é o responsável pelos dados inseridos. O FestApp atua como
                        <strong> operador de dados</strong>, conforme a legislação aplicável.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">6. Uso Permitido e Restrições</h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">É proibido:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                        <li>Utilizar a plataforma para atividades ilegais;</li>
                        <li>Tentar explorar falhas de segurança;</li>
                        <li>Realizar engenharia reversa;</li>
                        <li>Inserir conteúdo malicioso (vírus, scripts, etc.);</li>
                        <li>Interferir no funcionamento da plataforma;</li>
                        <li>Utilizar scripts, bots ou ferramentas de automação para realizar requisições em massa.</li>
                    </ul>
                    <p className="text-sm text-gray-600 leading-relaxed mt-3">
                        O FestApp reserva-se o direito de limitar ou suspender o acesso, de forma temporária
                        ou permanente, de qualquer endereço IP ou conta que ultrapasse os limites de frequência
                        estabelecidos ou que apresente comportamento suspeito, a fim de garantir a estabilidade
                        e segurança do serviço para todos os usuários. A violação pode resultar em suspensão imediata.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">7. Limites de Uso e Rate Limiting</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Para garantir a segurança e estabilidade da plataforma, o FestApp aplica limites
                        automáticos de requisições por endereço IP. Acessos que excedam esses limites serão
                        temporariamente bloqueados. Esses controles são aplicados de forma automática e não
                        constituem penalidade, sendo revertidos após o período de espera indicado.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">8. Planos, Cobrança e Pagamentos</h2>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                        <li>Os serviços são oferecidos em planos pagos com renovação automática;</li>
                        <li>Os valores e condições são apresentados no momento da contratação;</li>
                        <li>Pagamentos são processados exclusivamente pelo <strong>Stripe</strong>, certificado PCI DSS;</li>
                        <li>O FestApp não armazena dados de cartão de crédito ou débito;</li>
                        <li>A inadimplência pode resultar em suspensão ou cancelamento.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">9. Cancelamento e Encerramento</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        O cliente pode cancelar a qualquer momento pelo painel da plataforma. O acesso
                        permanece até o fim do período pago. Não há reembolso proporcional, salvo obrigação
                        legal. O FestApp pode encerrar contas em caso de violação destes Termos.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">10. Disponibilidade e SLA</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        O FestApp busca manter alta disponibilidade, mas não garante operação ininterrupta.
                        Pode haver manutenções programadas, falhas técnicas ou interrupções por terceiros.
                        <strong> SLA indicativo:</strong> disponibilidade de até 99% ao mês.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">11. Backup e Dados</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        O FestApp realiza rotinas de backup, mas não garante recuperação de dados em todos
                        os cenários. Recomenda-se que o cliente mantenha cópias próprias de informações críticas.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">12. Segurança</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        O FestApp adota boas práticas de segurança, incluindo criptografia em trânsito (HTTPS),
                        monitoramento de logs, proteção contra ataques e controle de acesso. Para garantir a
                        segurança da plataforma e prevenir ataques cibernéticos, o FestApp coleta e armazena
                        temporariamente endereços IP, logs de acesso e metadados das requisições, utilizados
                        exclusivamente para monitoramento de segurança. O FestApp poderá utilizar o{' '}
                        <strong>Cloudflare</strong> como camada de proteção de infraestrutura. Nenhum sistema
                        é totalmente isento de riscos.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">13. Propriedade Intelectual</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Todos os direitos sobre a plataforma pertencem ao FestApp. É proibido copiar ou
                        redistribuir o sistema, criar versões derivadas ou usar a marca sem autorização.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">14. Limitação de Responsabilidade</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        O FestApp não se responsabiliza por uso indevido da plataforma, dados inseridos pelos
                        usuários, falhas causadas por terceiros ou danos indiretos. A responsabilidade total,
                        quando aplicável, será limitada ao valor pago nos últimos 12 meses.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">15. Alterações nos Termos</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Os Termos podem ser atualizados a qualquer momento. O uso contínuo da plataforma
                        implica aceitação das alterações. Mudanças relevantes serão comunicadas por email.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">16. Legislação e Foro</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Estes Termos são regidos pelas leis brasileiras, incluindo a LGPD (Lei nº 13.709/2018)
                        e o Código de Defesa do Consumidor. Fica eleito o foro da comarca de
                        <strong> Campina Grande/PB</strong> para dirimir quaisquer controvérsias.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-3">17. Contato</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Em caso de dúvidas:{' '}
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