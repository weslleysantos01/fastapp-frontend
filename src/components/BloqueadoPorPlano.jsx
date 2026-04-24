import { useNavigate } from 'react-router-dom';

export default function BloqueadoPorPlano({ planoNecessario }) {
    const navigate = useNavigate();

    const nomes = {
        PROFISSIONAL: 'Profissional',
        PREMIUM: 'Premium'
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full">
                <div className="text-5xl mb-4">🔒</div>
                <h2 className="text-xl font-bold text-blue-900 mb-2">
                    Funcionalidade bloqueada
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                    Esta funcionalidade está disponível a partir do plano{' '}
                    <span className="font-semibold text-blue-900">
                        {nomes[planoNecessario] || planoNecessario}
                    </span>.
                    Faça um upgrade para continuar.
                </p>
                <button
                    onClick={() => navigate('/planos')}
                    className="bg-blue-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition"
                >
                    Ver planos
                </button>
            </div>
        </div>
    );
}