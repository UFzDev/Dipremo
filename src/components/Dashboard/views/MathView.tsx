import { useState } from 'react'

// Sub-vistas (Algoritmos)
import SensorReadingView from './algorithms/SensorReadingView'
import NormalizationView from './algorithms/NormalizationView'
import RMSView from './algorithms/RMSView'
import FFTView from './algorithms/FFTView'
import { type ESPData } from '../../../lib/connection'
import { type RMSData } from '../../../lib/algorithms/RMSEngine'

type MathViewProps = {
  rawHistory: ESPData[];
  rmsHistory: RMSData[];
};

type SubTab = 'reading' | 'normalization' | 'rms' | 'fft';

function MathView({ rawHistory }: MathViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('reading');

  const renderAlgo = () => {
    switch (activeSubTab) {
      case 'reading':
        return <SensorReadingView />;
      case 'normalization':
        return <NormalizationView history={rawHistory} />;
      case 'rms':
        return <RMSView />;
      case 'fft':
        return <FFTView />;
      default:
        return <SensorReadingView />;
    }
  };

  return (
    <section>
      <div className="tabs-inner">
        <div 
          className={`tab-inner-item ${activeSubTab === 'reading' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('reading')}
        >
          Lectura del Sensor
        </div>
        <div 
          className={`tab-inner-item ${activeSubTab === 'normalization' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('normalization')}
        >
          Normalización
        </div>
        <div 
          className={`tab-inner-item ${activeSubTab === 'rms' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('rms')}
        >
          Análisis RMS
        </div>
        <div 
          className={`tab-inner-item ${activeSubTab === 'fft' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('fft')}
        >
          Transformada FFT
        </div>
      </div>

      <div className="algo-content" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        {renderAlgo()}
      </div>
    </section>
  );
}

export default MathView;
