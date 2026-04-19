import VibrationChart from './charts/VibrationChart'
import { type ESPData } from '../../../lib/connection'

type ChartsViewProps = {
  data: ESPData | null;
};

function ChartsView({ data }: ChartsViewProps) {
  return (
    <div className="charts-view" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '100%', boxSizing: 'border-box' }}>
      <header style={{ gridColumn: '1 / span 3', marginBottom: '0.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#1e293b', margin: 0 }}>
          Monitor Triaxial (Normalizado)
        </h2>
      </header>

      {/* Inyectamos el punto individual 'data' en lugar del historial masivo */}
      <VibrationChart latestSample={data} axis="x" label="Eje X" color="#ef4444" />
      <VibrationChart latestSample={data} axis="y" label="Eje Y" color="#10b981" />
      <VibrationChart latestSample={data} axis="z" label="Eje Z" color="#3b82f6" />
    </div>
  );
}

export default ChartsView;
