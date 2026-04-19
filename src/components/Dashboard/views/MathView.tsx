import { useState } from 'react'
import SensorReadingView from './algorithms/SensorReadingView'

type MathViewProps = {};

type SubTab = 'reading' | 'algo2' | 'algo3';

function MathView({}: MathViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('reading');

  const renderAlgo = () => {
    switch (activeSubTab) {
      case 'reading':
        return <SensorReadingView />;
      case 'algo2':
        return <div className="card" style={{ padding: '3rem', color: 'var(--text-muted)' }}>Módulo Pendiente (Algoritmo 2)</div>;
      case 'algo3':
        return <div className="card" style={{ padding: '3rem', color: 'var(--text-muted)' }}>Módulo Pendiente (Algoritmo 3)</div>;
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
          className={`tab-inner-item ${activeSubTab === 'algo2' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('algo2')}
        >
          Algoritmo 2
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
