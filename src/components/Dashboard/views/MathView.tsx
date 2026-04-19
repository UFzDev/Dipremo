import { useState } from 'react'

// Sub-vistas (Algoritmos)
import SensorReadingView from './algorithms/SensorReadingView'
import NormalizationView from './algorithms/NormalizationView'
import Algo3 from './algorithms/Algo3'

type MathViewProps = {};

type SubTab = 'reading' | 'normalization' | 'algo3';

function MathView({}: MathViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('reading');

  const renderAlgo = () => {
    switch (activeSubTab) {
      case 'reading':
        return <SensorReadingView />;
      case 'normalization':
        return <NormalizationView />;
      case 'algo3':
        return <Algo3 />;
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
          className={`tab-inner-item ${activeSubTab === 'algo3' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('algo3')}
        >
          Algoritmo 3
        </div>
      </div>

      <div className="algo-content" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        {renderAlgo()}
      </div>
    </section>
  );
}

export default MathView;
