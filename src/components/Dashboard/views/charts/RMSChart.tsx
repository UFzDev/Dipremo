import { useMemo } from 'react';
import { ChartEngine } from '../../../../lib/utils/chart-engine';

type RMSChartProps = {
  history: any[];
  height?: number;
};

function RMSChart({ history, height = 200 }: RMSChartProps) {
  const width = 800;
  const WINDOW_SIZE = 100; // Mostraremos los últimos 100 puntos RMS (aprox 1.4 horas de tendencia)

  // 1. Filtramos y preparamos los datos RMS
  const rmsData = useMemo(() => {
    return history
      .filter(p => p.isRMS)
      .slice(0, WINDOW_SIZE)
      .reverse(); // De izquierda a derecha
  }, [history]);

  // 2. Generamos puntos para los 3 ejes
  const axisPoints = useMemo(() => {
    const scale = { min: 0, max: 256 }; // Rango esperado de energía RMS en LSB
    
    return {
      x: ChartEngine.generatePolylinePoints(rmsData.map(p => p.x), { width, height }, scale),
      y: ChartEngine.generatePolylinePoints(rmsData.map(p => p.y), { width, height }, scale),
      z: ChartEngine.generatePolylinePoints(rmsData.map(p => p.z), { width, height }, scale),
    };
  }, [rmsData, height]);

  if (rmsData.length === 0) {
    return (
      <div className="rms-chart-container" style={{ 
        height: height + 60, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#f8fafc', 
        borderRadius: '12px', 
        border: '2px dashed #e2e8f0', 
        marginBottom: '2rem',
        color: '#94a3b8',
        fontSize: '12px',
        fontWeight: 600,
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid #e2e8f0', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        Esperando estabilización de energía...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="rms-chart-container" style={{ position: 'relative', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Monitor de Tendencia Energética (3 Ejes)</h4>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '10px', fontWeight: 700 }}>
          <span style={{ color: '#ef4444' }}>● Eje X</span>
          <span style={{ color: '#10b981' }}>● Eje Y</span>
          <span style={{ color: '#3b82f6' }}>● Eje Z</span>
        </div>
      </div>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
        {/* Rejilla de Referencia */}
        <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="#f1f5f9" strokeWidth="1" />
        <line x1="0" y1={height} x2={width} y2={height} stroke="#e2e8f0" strokeWidth="1" />

        {/* Líneas de Tendencia */}
        <polyline points={axisPoints.z} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        <polyline points={axisPoints.y} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        <polyline points={axisPoints.x} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      
      <div style={{ marginTop: '0.5rem', textAlign: 'right', fontSize: '10px', color: '#94a3b8' }}>
        Últimos {rmsData.length} puntos de energía calculados
      </div>
    </div>
  );
}

export default RMSChart;
