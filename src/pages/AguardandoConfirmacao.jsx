export default function AguardandoConfirmacao() {
    const email = new URLSearchParams(window.location.search).get('email');

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
                <div className="text-5xl mb-4">📧</div>
                <h2 className="text-xl font-bold text-blue-900 mb-2">Confirme seu email</h2>
                <p className="text-sm text-gray-600 mb-2">
                    Enviamos um link de confirmação para:
                </p>
                <p className="font-bold text-blue-900 mb-6">{email}</p>
                <p className="text-sm text-gray-500 mb-6">
                    Após confirmar seu email, volte aqui para fazer login e finalizar o pagamento.
                </p>
                <a href="/" className="bg-blue-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition">
                    Ir para o Login
                </a>
            </div>
        </div>
    );
}