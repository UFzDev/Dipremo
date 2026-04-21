import { type ESPData } from '../../../lib/connection'
import { type ConnectionHealth } from '../../../lib/algorithms/ConnectionEngine'
import { type RMSData } from '../../../lib/algorithms/RMSEngine'
import { type FFTData } from '../../../lib/algorithms/FFTEngine'
import { type VelocityRMSData } from '../../../lib/algorithms/IntegrationEngine'
import { type KurtosisData } from '../../../lib/algorithms/KurtosisEngine'
import { type SkewnessData } from '../../../lib/algorithms/SkewnessEngine'

type OverviewViewProps = {
  data: ESPData | null;
  health: ConnectionHealth | null;
  rmsData: RMSData | null;
  fftData: FFTData | null;
  isoData: VelocityRMSData | null;
  kurtosisData: KurtosisData | null;
  skewnessData: SkewnessData | null;
  motorRpm: number;
};

/**
 * DataRow: Fila horizontal con 4 celdas para los ejes X, Y, Z y Resultante.
 */
function DataRow({ 
  title, 
  x, y, z, res, 
  unit = '', 
  isStatus = false,
  getStyle = () => ({})
}: { 
  title: string, 
  x: string | number, 
  y: string | number, 
  z: string | number, 
  res: string | number, 
  unit?: string,
  isStatus?: boolean,
  getStyle?: (val: any) => React.CSSProperties
}) {
  const cellStyle: React.CSSProperties = {
    flex: 1,
    padding: '0.75rem',
    textAlign: 'center',
    borderLeft: '1px solid #e2e8f0',
    fontSize: isStatus ? '12px' : '14px',
    fontWeight: isStatus ? 800 : 700,
    fontFamily: isStatus ? 'inherit' : 'monospace',
    color: '#1e293b'
  };

  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', alignItems: 'center', background: 'white' }}>
      <div style={{ width: '180px', padding: '0.75rem 1rem', fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </div>
      <div style={{ ...cellStyle, ...getStyle(x) }}>{x}{!isStatus && unit}</div>
      <div style={{ ...cellStyle, ...getStyle(y) }}>{y}{!isStatus && unit}</div>
      <div style={{ ...cellStyle, ...getStyle(z) }}>{z}{!isStatus && unit}</div>
      <div style={{ ...cellStyle, background: '#f8fafc', fontWeight: 900, ...getStyle(res) }}>{res}{!isStatus && unit}</div>
    </div>
  );
}

function OverviewView({ data, health, rmsData, fftData, isoData, kurtosisData, skewnessData, motorRpm }: OverviewViewProps) {
  const isDisconnected = !data;

  // --- LÓGICA DE MAPEO DE ESTADOS ---

  const getKurtState = (val: number) => {
    if (val < 3.0) return { text: 'BAJO RUIDO', color: '#64748b' };
    if (val < 3.5) return { text: 'NORMAL', color: '#10b981' };
    if (val < 10.0) return { text: 'AVISO', color: '#f59e0b' };
    return { text: 'CRÍTICO', color: '#ef4444' };
  };

  const getSkewState = (val: number) => {
    const absVal = Math.abs(val);
    if (absVal < 0.5) return { text: 'SANO', color: '#10b981' };
    if (absVal < 1.0) return { text: 'REVISAR', color: '#f59e0b' };
    return { text: 'SUELTO', color: '#ef4444' };
  };

  const getIsoColor = (v: number) => {
    if (v <= 1.8) return { color: '#10b981' };
    if (v <= 4.5) return { color: '#84cc16' };
    if (v <= 7.1) return { color: '#f59e0b' };
    return { color: '#ef4444' };
  };

  // --- EXTRACCIÓN DE PICOS FFT ---
  const getFftPeak = (bins: number[] | undefined) => {
     if (!bins || !fftData) return 0;
     let maxIdx = 0;
     let maxVal = 0;
     for(let i=0; i<bins.length; i++) {
       if(bins[i] > maxVal) { maxVal = bins[i]; maxIdx = i; }
     }
     return maxIdx * (fftData.sampleRateHz / (fftData.magnitudeX.length * 2));
  };

  const f = (n: number | undefined) => n !== undefined ? n.toFixed(3) : '--';

  return (
    <div className="overview-view" style={{ padding: '2rem', animation: 'fadeIn 0.5s ease-out' }}>
      
      {/* 🟢 CABECERA DE SISTEMA (SISTEMA INFO) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card-mini" style={{ padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
           <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Salud Conexión</div>
           <div style={{ fontSize: '20px', fontWeight: 800, color: (health?.quality ?? 0) > 90 ? '#10b981' : '#f59e0b' }}>{health?.quality ?? 0}%</div>
        </div>
        <div className="card-mini" style={{ padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
           <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Temperatura MCU</div>
           <div style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b' }}>{data ? data.diag.temp_c.toFixed(1) : '--'}°C</div>
        </div>
        <div className="card-mini" style={{ padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
           <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Estado Link</div>
           <div style={{ fontSize: '14px', fontWeight: 800, color: isDisconnected ? '#94a3b8' : '#10b981' }}>{isDisconnected ? 'DESCONECTADO' : 'LINK ACTIVO'}</div>
        </div>
        <div className="card-mini" style={{ padding: '1rem', background: '#f5f3ff', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
           <div style={{ fontSize: '11px', color: '#7c3aed', fontWeight: 800, textTransform: 'uppercase' }}>Velocidad Motor</div>
           <div style={{ fontSize: '20px', fontWeight: 800, color: '#5b21b6' }}>{motorRpm} <span style={{ fontSize: '12px' }}>RPM</span></div>
        </div>
      </div>

      {/* 🔵 MATRIZ DE DATOS HORIZONTAL */}
      <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderLeft: '4px solid #3b82f6', paddingLeft: '0.75rem' }}>
        Resumen Técnico de Instrumentación
      </h3>
      
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        
        {/* Cabecera de Ejes */}
        <div style={{ display: 'flex', background: '#f8fafc', borderBottom: '2px solid #e2e8f0', fontWeight: 800, fontSize: '11px', color: '#64748b', textAlign: 'center' }}>
          <div style={{ width: '180px', padding: '0.75rem' }}>CATEGORÍA / MÉTRICA</div>
          <div style={{ flex: 1, padding: '0.75rem' }}>EJE X</div>
          <div style={{ flex: 1, padding: '0.75rem' }}>EJE Y</div>
          <div style={{ flex: 1, padding: '0.75rem' }}>EJE Z</div>
          <div style={{ flex: 1, padding: '0.75rem', background: '#f1f5f9' }}>RESULTANTE</div>
        </div>

        {/* 1. Tendencia Energética (RMS) */}
        <DataRow 
          title="Energía RMS (m/s²)" 
          x={f(rmsData?.x)} y={f(rmsData?.y)} z={f(rmsData?.z)} res={f(rmsData?.res)} 
        />

        {/* 2. Picos FFT */}
        <DataRow 
          title="Pico Espectral (Hz)" 
          unit=" Hz"
          x={getFftPeak(fftData?.magnitudeX).toFixed(0)} 
          y={getFftPeak(fftData?.magnitudeY).toFixed(0)} 
          z={getFftPeak(fftData?.magnitudeZ).toFixed(0)} 
          res={getFftPeak(fftData?.magnitudeRes).toFixed(0)} 
        />

        {/* 3. Severidad ISO */}
        <DataRow 
          title="Severidad ISO (mm/s)" 
          unit=" mm/s"
          x={f(isoData?.vRmsX)} y={f(isoData?.vRmsY)} z={f(isoData?.vRmsZ)} res={f(isoData?.vRmsRes)} 
          getStyle={(v) => ({ color: getIsoColor(parseFloat(v)).color })}
        />

        {/* 4. Salud Rodamientos */}
        <DataRow 
          title="Estado Rodamiento" 
          isStatus
          x={getKurtState(kurtosisData?.kurtosisX ?? 3).text} 
          y={getKurtState(kurtosisData?.kurtosisY ?? 3).text} 
          z={getKurtState(kurtosisData?.kurtosisZ ?? 3).text} 
          res="--"
          getStyle={(v) => {
            if (v === 'NORMAL') return { color: '#10b981' };
            if (v === 'BAJO RUIDO') return { color: '#64748b' };
            if (v === 'AVISO') return { color: '#f59e0b' };
            if (v === 'CRÍTICO') return { color: '#ef4444' };
            return { color: '#94a3b8' };
          }}
        />

        {/* 5. Holguras / Aflojamiento */}
        <DataRow 
          title="Impactos / Holgura" 
          isStatus
          x={getSkewState(skewnessData?.skewnessX ?? 0).text} 
          y={getSkewState(skewnessData?.skewnessY ?? 0).text} 
          z={getSkewState(skewnessData?.skewnessZ ?? 0).text} 
          res="--"
          getStyle={(v) => {
            if (v === 'SANO') return { color: '#10b981' };
            if (v === 'REVISAR') return { color: '#f59e0b' };
            if (v === 'SUELTO') return { color: '#ef4444' };
            return { color: '#94a3b8' };
          }}
        />

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default OverviewView;
