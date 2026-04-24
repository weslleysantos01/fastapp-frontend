export function usePlano() {
    const plano = localStorage.getItem('plano') || 'BASICO';

    const niveis = { BASICO: 0, PROFISSIONAL: 1, PREMIUM: 2 };

    function temAcesso(planoRequerido) {
        return (niveis[plano] ?? 0) >= (niveis[planoRequerido] ?? 0);
    }

    return { plano, temAcesso };
}