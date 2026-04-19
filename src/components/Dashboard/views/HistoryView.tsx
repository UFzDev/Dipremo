import { useState, useMemo } from 'react'
import { type RMSData } from '../../../lib/algorithms/RMSEngine'

type HistoryViewProps = {
  history: RMSData[];
};

function HistoryView({ history }: HistoryViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const rowsPerPage = 15;

  // Lógica de Filtrado de Auditoría (RMS)
  const filteredHistory = useMemo(() => {
    if (!searchQuery) return history;
    const q = searchQuery.toLowerCase();
    return history.filter(row => 
      row.x?.toString().includes(q) || 
      row.y?.toString().includes(q) || 
      row.z?.toString().includes(q) ||
      new Date(row.timestamp).toLocaleTimeString().toLowerCase().includes(q)
    );
  }, [history, searchQuery]);

  // Paginación
  const totalPages = Math.ceil(filteredHistory.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredHistory.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <section style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Registro de Auditoría de Energía</h2>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '0.2rem' }}>Monitoreo consolidado de salud mecánica (RMS)</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
           <span style={{ fontSize: '11px', color: '#94a3b8' }}>{history.length} hitos registrados</span>
           <input 
            type="text" 
            placeholder="Buscar en el historial..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            style={{ padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '13px', width: '250px', outline: 'none' }}
          />
        </div>
      </div>
      
      <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '800px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>HORA DEL CÁLCULO</th>
                <th style={{ padding: '1rem' }}>ENERGÍA X (RMS)</th>
                <th style={{ padding: '1rem' }}>ENERGÍA Y (RMS)</th>
                <th style={{ padding: '1rem' }}>ENERGÍA Z (RMS)</th>
                <th style={{ padding: '1rem' }}>TEMPERATURA</th>
                <th style={{ padding: '1rem' }}>SEÑAL (RSSI)</th>
                <th style={{ padding: '1rem' }}>MÉTRICA HZ</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((row, idx) => (
                  <tr key={`${row.timestamp}-${idx}`} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? 'transparent' : '#fafafa' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, fontFamily: 'monospace', color: '#64748b' }}>
                      {new Date(row.timestamp).toLocaleTimeString()}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#ef4444', fontWeight: 800 }}>{row.x?.toFixed(3)}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#10b981', fontWeight: 800 }}>{row.y?.toFixed(3)}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#3b82f6', fontWeight: 800 }}>{row.z?.toFixed(3)}</td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#475569' }}>
                      {row.diag?.temp_c?.toFixed(1)}°C
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#8b5cf6' }}>
                      {row.diag?.rssi_dbm} dBm
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#94a3b8' }}>
                      {row.sample_rate_hz} Hz
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ padding: '5rem', textAlign: 'center', color: '#94a3b8' }}>
                    <div style={{ marginBottom: '1rem', fontSize: '32px' }}>📉</div>
                    <div style={{ fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>Historial en Proceso de Generación</div>
                    <p style={{ fontSize: '13px', maxWidth: '400px', margin: '0 auto' }}>
                      El sistema está consolidando las ráfagas de 100 muestras del sensor. El primer hito aparecerá en unos segundos.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
            <button 
              className="btn btn-ghost" 
              style={{ padding: '0.4rem 0.8rem', fontSize: '12px' }}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', fontWeight: 600, padding: '0 1rem' }}>
              Página {currentPage} de {totalPages}
            </div>
            <button 
              className="btn btn-ghost" 
              style={{ padding: '0.4rem 0.8rem', fontSize: '12px' }}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default HistoryView;
