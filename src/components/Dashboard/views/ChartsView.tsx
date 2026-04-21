import VibrationChart from './charts/VibrationChart'
import RMSChart from './charts/RMSChart'
import FFTChart from './charts/FFTChart'
import ISO10816Chart from './charts/ISO10816Chart'
import KurtosisChart from './charts/KurtosisChart'
import SkewnessChart from './charts/SkewnessChart'
import { type ESPData } from '../../../lib/connection'
import { type FFTData } from '../../../lib/algorithms/FFTEngine'
import { type VelocityRMSData } from '../../../lib/algorithms/IntegrationEngine'
import { type KurtosisData } from '../../../lib/algorithms/KurtosisEngine'
import { type SkewnessData } from '../../../lib/algorithms/SkewnessEngine'

type ChartsViewProps = {
  data: ESPData | null;
  history: any[];
  fftData: FFTData | null;
  isoData: VelocityRMSData | null;
  kurtosisData: KurtosisData | null;
  skewnessData: SkewnessData | null;
  motorRpm: number;
};

function ChartsView({ data, history, fftData, isoData, kurtosisData, skewnessData, motorRpm }: ChartsViewProps) {
  return (
    <div className="charts-view" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '100%', boxSizing: 'border-box' }}>
      <header style={{ gridColumn: '1 / span 3', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#1e293b', margin: 0 }}>
            Monitor Triaxial (Normalizado)
          </h2>
        </div>
      </header>

      {/* Gráficas de Vibración en tiempo real */}
      <VibrationChart latestSample={data} axis="x" label="Eje X" color="#ef4444" />
      <VibrationChart latestSample={data} axis="y" label="Eje Y" color="#10b981" />
      <VibrationChart latestSample={data} axis="z" label="Eje Z" color="#3b82f6" />

      {/* Gráfica de Energía (Trend) - Ocupa todo el ancho */}
      <div style={{ gridColumn: '1 / span 3', marginTop: '1rem' }}>
        <RMSChart history={history} />
      </div>

      {/* Gráfica Espectral FFT */}
      <div style={{ gridColumn: '1 / span 3' }}>
        <FFTChart data={fftData} motorRpm={motorRpm} />
      </div>

      {/* Indicadores Predictivos Múltiples (Bottom Row) */}
      <div style={{ gridColumn: '1 / span 3', gap: '1rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)' }}>
        <ISO10816Chart data={isoData} />
        <KurtosisChart data={kurtosisData} />
        <SkewnessChart data={skewnessData} />
      </div>
    </div>
  );
}

export default ChartsView;
