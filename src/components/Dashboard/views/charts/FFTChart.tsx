import { useState, useMemo } from 'react';
import { ChartEngine } from '../../../../lib/utils/chart-engine';
import { type FFTData } from '../../../../lib/algorithms/FFTEngine';

type FFTChartProps = {
  data: FFTData | null;
  height?: number;
};

function FFTChart({ data, height = 280 }: FFTChartProps) {
  const width = 800;
  
  // Controles de visibilidad para cada eje
  const [showX, setShowX] = useState(true);
  const [showY, setShowY] = useState(true);
  const [showZ, setShowZ] = useState(true);

  // Mapeo de coordenadas para el SVG
  const lines = useMemo(() => {
    if (!data) return { x: '', y: '', z: '' };

    // Cálculo dinámico de la escala (Auto-Scaling)
    // Extraemos las magnitudes visibles
    const activeData: number[] = [];
    if (showX) activeData.push(...data.magnitudeX);
    if (showY) activeData.push(...data.magnitudeY);
    if (showZ) activeData.push(...data.magnitudeZ);

    // Evitamos problemas si todo está apagado o si la señal es muy pequeña (ruido base)
    const maxVal = activeData.length > 0 ? Math.max(...activeData) : 10;
    // Agregamos un 15% de headroom para que los picos no toquen el techo
    const bounds = { min: 0, max: Math.max(5, maxVal * 1.15) }; 

    return {
      x: showX ? ChartEngine.generatePolylinePoints(data.magnitudeX, { width, height }, bounds) : '',
      y: showY ? ChartEngine.generatePolylinePoints(data.magnitudeY, { width, height }, bounds) : '',
      z: showZ ? ChartEngine.generatePolylinePoints(data.magnitudeZ, { width, height }, bounds) : '',
    };
  }, [data, showX, showY, showZ, height]);

  if (!data) {
    return (
      <div className="fft-chart-container" style={{ 
        height: height + 80, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#f8fafc', 
        borderRadius: '12px', 
        border: '2px dashed #e2e8f0', 
        marginBottom: '2rem',
        color: '#94a3b8',
        fontSize: '13px',
        fontWeight: 600,
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        <div style={{ width: '24px', height: '24px', border: '3px solid #e2e8f0', borderTopColor: '#8b5cf6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        Acumulando búfer FFT (256 muestras)...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Calculamos la resolución por cada punto en la gráfica (Hz/bin)
  const binResolution = data.sampleRateHz / (data.bins * 2);
  const maxFreq = data.sampleRateHz / 2; // Nyquist limit

  return (
    <div className="fft-chart-wrapper" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.25rem', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
      
      {/* Header y Leyenda Interactiva */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            Transformada de Fourier (FFT)
          </h4>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '11px', color: '#64748b' }}>
            Dominio de Frecuencia (0 a {maxFreq.toFixed(0)} Hz) • Res: {binResolution.toFixed(2)} Hz/bin
          </p>
        </div>
        
        {/* Controles para ocultar/mostrar líneas */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setShowX(!showX)}
            style={{ 
              padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'all 0.2s',
              background: showX ? '#fee2e2' : '#f1f5f9', color: showX ? '#ef4444' : '#94a3b8' 
            }}
          >
            Eje X
          </button>
          <button 
            onClick={() => setShowY(!showY)}
            style={{ 
              padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'all 0.2s',
              background: showY ? '#d1fae5' : '#f1f5f9', color: showY ? '#10b981' : '#94a3b8' 
            }}
          >
            Eje Y
          </button>
          <button 
            onClick={() => setShowZ(!showZ)}
            style={{ 
              padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'all 0.2s',
              background: showZ ? '#dbeafe' : '#f1f5f9', color: showZ ? '#3b82f6' : '#94a3b8' 
            }}
          >
            Eje Z
          </button>
        </div>
      </div>

      {/* Contenedor de la gráfica SVG */}
      <div style={{ position: 'relative', width: '100%', height: height, background: '#fafafa', borderRadius: '8px', overflow: 'hidden', borderBottom: '2px solid #e2e8f0', borderLeft: '2px solid #e2e8f0' }}>
        
        {/* Grid Background */}
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.5 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Líneas de FFT */}
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
          
          {/* Sombras base para dar profundidad visual a los picos */}
          {showZ && lines.z && (
             <polygon points={`0,${height} ${lines.z} ${width},${height}`} fill="#3b82f6" opacity="0.1" />
          )}
          {showY && lines.y && (
             <polygon points={`0,${height} ${lines.y} ${width},${height}`} fill="#10b981" opacity="0.1" />
          )}
          {showX && lines.x && (
             <polygon points={`0,${height} ${lines.x} ${width},${height}`} fill="#ef4444" opacity="0.1" />
          )}

          {/* Líneas sólidas */}
          {showZ && lines.z && (
            <polyline points={lines.z} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" />
          )}
          {showY && lines.y && (
            <polyline points={lines.y} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" />
          )}
          {showX && lines.x && (
            <polyline points={lines.x} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinejoin="round" />
          )}
        </svg>
      </div>

      {/* Axis Labels (X-Axis: Frequency) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', color: '#64748b', fontSize: '10px', fontWeight: 600 }}>
        <span>0 Hz</span>
        <span>{Math.round(maxFreq / 4)} Hz</span>
        <span>{Math.round(maxFreq / 2)} Hz</span>
        <span>{Math.round((maxFreq * 3) / 4)} Hz</span>
        <span>{(maxFreq).toFixed(0)} Hz</span>
      </div>

    </div>
  );
}

export default FFTChart;
