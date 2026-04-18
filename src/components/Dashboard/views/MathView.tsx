import { useState } from 'react'

// Importar los algoritmos individuales
import Algo1 from './algorithms/Algo1'
import Algo2 from './algorithms/Algo2'
import Algo3 from './algorithms/Algo3'

type AlgoTab = 'algo1' | 'algo2' | 'algo3';

function MathView() {
  const [activeAlgo, setActiveAlgo] = useState<AlgoTab>('algo1');

  const renderAlgoContent = () => {
    switch (activeAlgo) {
      case 'algo1':
        return <Algo1 />;
      case 'algo2':
        return <Algo2 />;
      case 'algo3':
        return <Algo3 />;
      default:
        return <Algo1 />;
    }
  };

  return (
    <section>
      <h2 className="mb-4">Algoritmos Usados en la Aplicación</h2>
      
      {/* Sub-pestañas horizontales */}
      <div className="tabs-inner">
        <div 
          className={`tab-inner-item ${activeAlgo === 'algo1' ? 'active' : ''}`}
          onClick={() => setActiveAlgo('algo1')}
        >
          Algoritmo 1
        </div>
        <div 
          className={`tab-inner-item ${activeAlgo === 'algo2' ? 'active' : ''}`}
          onClick={() => setActiveAlgo('algo2')}
        >
          Algoritmo 2
        </div>
        <div 
          className={`tab-inner-item ${activeAlgo === 'algo3' ? 'active' : ''}`}
          onClick={() => setActiveAlgo('algo3')}
        >
          Algoritmo 3
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        {renderAlgoContent()}
      </div>
    </section>
  );
}

export default MathView;
