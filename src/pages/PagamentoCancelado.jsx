export default function PagamentoCancelado() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
                <div className="text-5xl mb-4">😕</div>
                <h2 className="text-xl font-bold text-red-600 mb-2">Pagamento cancelado</h2>
                <p className="text-sm text-gray-600 mb-6">Nenhuma cobrança foi feita. Você pode tentar novamente.</p>
                <a href="/" className="bg-blue-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition">
                    Voltar ao início
                </a>
            </div>
        </div>
    );
}