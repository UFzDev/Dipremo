import { useState, useMemo } from 'react'
import type { ESPData } from '../../../lib/connection'

type HistoryViewProps = {
  history: ESPData[];
};

function HistoryView({ history }: HistoryViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const rowsPerPage = 15;

  // Lógica de Filtrado
  const filteredHistory = useMemo(() => {
    if (!searchQuery) return history;
    const q = searchQuery.toLowerCase();
    return history.filter(row => 
      row.sample_id.toString().includes(q) ||
      row.raw.x.toString().includes(q) ||
      row.raw.y.toString().includes(q) ||
      row.raw.z.toString().includes(q)
    );
  }, [history, searchQuery]);

  // Lógica de Paginación basada en el historial filtrado
  const totalPages = Math.ceil(filteredHistory.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredHistory.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Historial de Muestras</h2>
        <input 
          type="text" 
          placeholder="Buscar por ID o Valor..." 
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Resetear a página 1 al buscar
          }}
          style={{ 
            padding: '0.6rem 1rem', 
            borderRadius: '0.5rem', 
            border: '1px solid #e2e8f0', 
            fontSize: '13px', 
            width: '250px',
            outline: 'none'
          }}
        />
      </div>
      
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '900px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>ID</th>
                <th style={{ padding: '1rem' }}>Eje X</th>
                <th style={{ padding: '1rem' }}>Eje Y</th>
                <th style={{ padding: '1rem' }}>Eje Z</th>
                <th style={{ padding: '1rem' }}>Temp</th>
                <th style={{ padding: '1rem' }}>RSSI</th>
                <th style={{ padding: '1rem' }}>Delta</th>
                <th style={{ padding: '1rem' }}>Rate</th>
                <th style={{ padding: '1rem' }}>Uptime</th>
                <th style={{ padding: '1rem' }}>I2C Err</th>
                <th style={{ padding: '1rem' }}>Heap</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((row, idx) => (
                  <tr key={`${row.sample_id}-${idx}`} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{row.sample_id}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#3b82f6', fontWeight: 600 }}>{row.raw.x}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#10b981', fontWeight: 600 }}>{row.raw.y}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#f59e0b', fontWeight: 600 }}>{row.raw.z}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{row.diag.temp_c.toFixed(1)}°C</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#8b5cf6' }}>{row.diag.rssi_dbm} dBm</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{row.delta_ms.toFixed(1)}ms</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{row.sample_rate_hz} Hz</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{(row.uptime_ms / 1000).toFixed(1)}s</td>
                    <td style={{ padding: '0.75rem 1rem', color: row.diag.i2c_error_count > 0 ? '#ef4444' : 'inherit' }}>{row.diag.i2c_error_count}</td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '10px' }}>{row.diag.free_heap.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    {searchQuery ? 'No se encontraron resultados.' : 'No hay datos registrados aún.'}
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

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
        <span>Deslice horizontalmente para ver todos los datos.</span>
        <span>Buffer total: {filteredHistory.length} de 500 muestras.</span>
      </div>
    </section>
  );
}

export default HistoryView;
