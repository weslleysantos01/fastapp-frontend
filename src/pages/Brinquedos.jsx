import { useState, useEffect } from 'react';
import api from '../services/api';

function Brinquedos() {
    const [brinquedos, setBrinquedos] = useState([]);
    const [festas, setFestas] = useState([]);
    const [form, setForm] = useState({
        nome: '',
        descricao: '',
        quantidade: 1,
        valorAluguel: ''
    });
    const [reservaForm, setReservaForm] = useState({
        festaId: '',
        brinquedoId: '',
        quantidade: 1
    });
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erroReserva, setErroReserva] = useState('');
    const [sucessoReserva, setSucessoReserva] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [abaAtiva, setAbaAtiva] = useState('brinquedos');

    useEffect(() => {
        carregarBrinquedos();
        carregarFestas();
    }, []);

    function carregarBrinquedos() {
        api.get('/brinquedos').then(r => setBrinquedos(r.data));
    }

    function carregarFestas() {
        api.get('/festas').then(r => setFestas(r.data));
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleReservaChange(e) {
        setReservaForm({ ...reservaForm, [e.target.name]: e.target.value });
    }

    async function cadastrar() {
        setErro(''); setSucesso('');
        if (!form.nome) { setErro('Nome é obrigatório'); return; }
        setCarregando(true);
        try {
            await api.post('/brinquedos', {
                ...form,
                quantidade: parseInt(form.quantidade),
                valorAluguel: form.valorAluguel ? parseFloat(form.valorAluguel) : null
            });
            setSucesso('Brinquedo cadastrado!');
            setForm({ nome: '', descricao: '', quantidade: 1, valorAluguel: '' });
            carregarBrinquedos();
        } catch (err) {
            setErro(typeof err.response?.data === 'string' ? err.response.data : 'Erro ao cadastrar');
        } finally {
            setCarregando(false);
        }
    }

    async function reservar() {
        setErroReserva(''); setSucessoReserva('');
        if (!reservaForm.festaId || !reservaForm.brinquedoId) {
            setErroReserva('Selecione a festa e o brinquedo');
            return;
        }
        try {
            await api.post('/brinquedos/reservar', {
                festaId: parseInt(reservaForm.festaId),
                brinquedoId: parseInt(reservaForm.brinquedoId),
                quantidade: parseInt(reservaForm.quantidade)
            });
            setSucessoReserva('Reserva realizada com sucesso!');
            setReservaForm({ festaId: '', brinquedoId: '', quantidade: 1 });
        } catch (err) {
            const msg = err.response?.data?.erro || err.response?.data || 'Erro ao reservar';
            setErroReserva(typeof msg === 'string' ? msg : 'Conflito de horário detectado');
        }
    }

    async function alternarStatus(id, statusAtual) {
        const proximo = statusAtual === 'DISPONIVEL' ? 'MANUTENCAO' : 'DISPONIVEL';
        await api.patch(`/brinquedos/${id}/status?status=${proximo}`);
        carregarBrinquedos();
    }

    function statusColor(status) {
        switch (status) {
            case 'DISPONIVEL': return 'bg-green-100 text-green-700';
            case 'RESERVADO': return 'bg-yellow-100 text-yellow-700';
            case 'MANUTENCAO': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    function statusLabel(status) {
        switch (status) {
            case 'DISPONIVEL': return 'Disponível';
            case 'RESERVADO': return 'Reservado';
            case 'MANUTENCAO': return 'Manutenção';
            default: return status;
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">🎠 Brinquedos</h2>

            {/* ABAS */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setAbaAtiva('brinquedos')}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                        abaAtiva === 'brinquedos'
                            ? 'bg-blue-900 text-white'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-900'
                    }`}>
                    Estoque
                </button>
                <button
                    onClick={() => setAbaAtiva('reservas')}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                        abaAtiva === 'reservas'
                            ? 'bg-blue-900 text-white'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-900'
                    }`}>
                    Reservar
                </button>
            </div>

            {/* ABA ESTOQUE */}
            {abaAtiva === 'brinquedos' && (
                <>
                    <div className="bg-white rounded-xl shadow p-5 mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                            Cadastrar brinquedo
                        </h3>

                        {erro && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-3 text-sm">{erro}</div>}
                        {sucesso && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-3 text-sm">{sucesso}</div>}

                        <div className="flex gap-3 flex-wrap">
                            <input
                                name="nome"
                                type="text"
                                placeholder="Nome do brinquedo"
                                value={form.nome}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-52 focus:outline-none focus:ring-2 focus:ring-blue-900"
                            />
                            <input
                                name="descricao"
                                type="text"
                                placeholder="Descrição (opcional)"
                                value={form.descricao}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-52 focus:outline-none focus:ring-2 focus:ring-blue-900"
                            />
                            <input
                                name="quantidade"
                                type="number"
                                placeholder="Qtd"
                                min={1}
                                value={form.quantidade}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-900"
                            />
                            <input
                                name="valorAluguel"
                                type="number"
                                placeholder="Valor R$"
                                step="0.01"
                                value={form.valorAluguel}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-900"
                            />
                            <button
                                onClick={cadastrar}
                                disabled={carregando}
                                className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition disabled:opacity-50">
                                {carregando ? 'Cadastrando...' : '+ Cadastrar'}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-blue-900 text-white">
                                <tr>
                                    <th className="text-left px-5 py-3">Nome</th>
                                    <th className="text-left px-5 py-3">Descrição</th>
                                    <th className="text-left px-5 py-3">Quantidade</th>
                                    <th className="text-left px-5 py-3">Valor</th>
                                    <th className="text-left px-5 py-3">Status</th>
                                    <th className="text-left px-5 py-3">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brinquedos.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8 text-gray-400">
                                            Nenhum brinquedo cadastrado
                                        </td>
                                    </tr>
                                )}
                                {brinquedos.map((b, index) => (
                                    <tr key={b.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-5 py-3 font-medium">{b.nome}</td>
                                        <td className="px-5 py-3 text-gray-500">{b.descricao || '—'}</td>
                                        <td className="px-5 py-3">{b.quantidade}</td>
                                        <td className="px-5 py-3">
                                            {b.valorAluguel
                                                ? `R$ ${b.valorAluguel.toFixed(2)}`
                                                : '—'}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(b.status)}`}>
                                                {statusLabel(b.status)}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <button
                                                onClick={() => alternarStatus(b.id, b.status)}
                                                className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                                                    b.status === 'DISPONIVEL'
                                                        ? 'border-red-400 text-red-600 hover:bg-red-50'
                                                        : 'border-green-400 text-green-600 hover:bg-green-50'
                                                }`}>
                                                {b.status === 'DISPONIVEL' ? 'Manutenção' : 'Disponibilizar'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* ABA RESERVAS */}
            {abaAtiva === 'reservas' && (
                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                        Reservar brinquedo para festa
                    </h3>

                    {erroReserva && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-3 text-sm">
                            ⚠️ {erroReserva}
                        </div>
                    )}
                    {sucessoReserva && (
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-3 text-sm">
                            ✅ {sucessoReserva}
                        </div>
                    )}

                    <div className="flex gap-3 flex-wrap">
                        <select
                            name="festaId"
                            value={reservaForm.festaId}
                            onChange={handleReservaChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-900">
                            <option value="">Selecione a festa</option>
                            {festas.map(f => (
                                <option key={f.id} value={f.id}>
                                    {f.nomeCliente} — {new Date(f.dataHora).toLocaleDateString('pt-BR')}
                                </option>
                            ))}
                        </select>

                        <select
                            name="brinquedoId"
                            value={reservaForm.brinquedoId}
                            onChange={handleReservaChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-900">
                            <option value="">Selecione o brinquedo</option>
                            {brinquedos.filter(b => b.status !== 'MANUTENCAO').map(b => (
                                <option key={b.id} value={b.id}>
                                    {b.nome} (Qtd: {b.quantidade})
                                </option>
                            ))}
                        </select>

                        <input
                            name="quantidade"
                            type="number"
                            min={1}
                            value={reservaForm.quantidade}
                            onChange={handleReservaChange}
                            placeholder="Qtd"
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />

                        <button
                            onClick={reservar}
                            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition">
                            Reservar
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-4">
                        O sistema verifica automaticamente conflitos de horário antes de confirmar a reserva.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Brinquedos;