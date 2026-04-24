import { useState, useEffect } from 'react';
import api from '../services/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function RelatorioFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        api.get('/relatorio/funcionarios')
            .then(r => setFuncionarios(r.data))
            .finally(() => setCarregando(false));
    }, []);

    function statusColor(status) {
        switch (status) {
            case 'DISPONIVEL': return 'bg-green-100 text-green-700';
            case 'DE_FOLGA': return 'bg-yellow-100 text-yellow-700';
            case 'AUSENTE': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    }

    function pontualidadeColor(p) {
        if (p >= 90) return 'text-green-600';
        if (p >= 70) return 'text-yellow-600';
        return 'text-red-600';
    }

    function estrelas(media) {
        const cheias = Math.floor(media);
        return '★'.repeat(cheias) + '☆'.repeat(5 - cheias);
    }

    function exportarPDF() {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.setTextColor(30, 58, 138);
        doc.text('Relatório de Funcionários', 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 14, 28);

        const pontMedia = funcionarios.length > 0
            ? Math.round(funcionarios.reduce((acc, f) => acc + f.pontualidade, 0) / funcionarios.length)
            : 0;

        doc.setFontSize(11);
        doc.setTextColor(0);
        doc.text(`Total de funcionários: ${funcionarios.length}`, 14, 38);
        doc.text(`Disponíveis hoje: ${funcionarios.filter(f => f.statusDia === 'DISPONIVEL').length}`, 14, 45);
        doc.text(`Pontualidade média: ${pontMedia}%`, 14, 52);

        autoTable(doc, {
            startY: 60,
            head: [['#', 'Nome', 'Avaliação', 'Festas', 'No Prazo', 'Atrasos', 'Pontualidade', 'Status']],
            body: funcionarios.map((f, i) => [
                `#${i + 1}`,
                f.nome,
                `${f.avaliacaoMedia}/5`,
                f.totalFestas,
                f.noPrazo,
                f.atrasados,
                `${f.pontualidade}%`,
                f.statusDia
            ]),
            headStyles: {
                fillColor: [30, 58, 138],
                textColor: 255,
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [245, 247, 250]
            },
            styles: {
                fontSize: 9,
                cellPadding: 4
            }
        });

        doc.save(`relatorio-funcionarios-${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`);
    }

    if (carregando) {
        return (
            <div className="p-6 text-center text-gray-400 animate-pulse">
                Carregando relatório...
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-900">👥 Relatório de Funcionários</h2>
                <button
                    onClick={exportarPDF}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
                >
                    📄 Exportar PDF
                </button>
            </div>

            {/* CARDS RESUMO */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
                    <p className="text-sm text-gray-500 mb-1">Total de Funcionários</p>
                    <p className="text-2xl font-bold text-blue-700">{funcionarios.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
                    <p className="text-sm text-gray-500 mb-1">Disponíveis Hoje</p>
                    <p className="text-2xl font-bold text-green-600">
                        {funcionarios.filter(f => f.statusDia === 'DISPONIVEL').length}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-500">
                    <p className="text-sm text-gray-500 mb-1">Pontualidade Média</p>
                    <p className="text-2xl font-bold text-yellow-600">
                        {funcionarios.length > 0
                            ? Math.round(funcionarios.reduce((acc, f) => acc + f.pontualidade, 0) / funcionarios.length)
                            : 0}%
                    </p>
                </div>
            </div>

            {/* TABELA */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-blue-900 text-white">
                        <tr>
                            <th className="text-left px-5 py-3">#</th>
                            <th className="text-left px-5 py-3">Funcionário</th>
                            <th className="text-left px-5 py-3">Avaliação</th>
                            <th className="text-left px-5 py-3">Festas</th>
                            <th className="text-left px-5 py-3">No Prazo</th>
                            <th className="text-left px-5 py-3">Atrasos</th>
                            <th className="text-left px-5 py-3">Pontualidade</th>
                            <th className="text-left px-5 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center py-8 text-gray-400">
                                    Nenhum funcionário cadastrado
                                </td>
                            </tr>
                        )}
                        {funcionarios.map((f, index) => (
                            <tr key={f.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-5 py-3 text-gray-400 font-medium">#{index + 1}</td>
                                <td className="px-5 py-3">
                                    <p className="font-medium text-gray-800">{f.nome}</p>
                                    <p className="text-xs text-gray-400">{f.email}</p>
                                </td>
                                <td className="px-5 py-3 text-yellow-500 text-base">
                                    {estrelas(f.avaliacaoMedia)}
                                    <span className="text-gray-400 text-xs ml-1">({f.avaliacaoMedia})</span>
                                </td>
                                <td className="px-5 py-3 font-medium text-blue-700">{f.totalFestas}</td>
                                <td className="px-5 py-3 text-green-600">{f.noPrazo}</td>
                                <td className="px-5 py-3 text-red-500">{f.atrasados}</td>
                                <td className={`px-5 py-3 font-bold ${pontualidadeColor(f.pontualidade)}`}>
                                    {f.pontualidade}%
                                </td>
                                <td className="px-5 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(f.statusDia)}`}>
                                        {f.statusDia}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}