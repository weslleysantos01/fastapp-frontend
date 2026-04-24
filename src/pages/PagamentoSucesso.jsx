import { useEffect, useState } from 'react';
import api from '../services/api';

export default function PagamentoSucesso() {
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        let interval;
        let tentativas = 0;

        async function atualizarPlano() {
            tentativas++;
            try {
                const res = await api.get('/auth/me');

                if (res.data.statusAssinatura === 'ATIVO') {
                    localStorage.setItem('plano', res.data.plano);
                    localStorage.setItem('statusAssinatura', res.data.statusAssinatura);
                    setCarregando(false);
                    clearInterval(interval);
                }
            } catch (err) {
                console.log('Erro ao verificar plano:', err);
            }

            if (tentativas >= 30) {
                clearInterval(interval);
                setCarregando(false);
            }
        }

        atualizarPlano();
        interval = setInterval(atualizarPlano, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-xl font-bold text-green-700 mb-2">
                    Pagamento confirmado!
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    Sua assinatura está ativa. Bem-vinda ao FestApp!
                </p>

                {carregando ? (
                    <div className="text-sm text-gray-400 animate-pulse">
                        Ativando sua conta...
                    </div>
                ) : (
                    <a
                        href="/"
                        className="bg-blue-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition"
                    >
                        Acessar o sistema
                    </a>
                )}
            </div>
        </div>
    );
}