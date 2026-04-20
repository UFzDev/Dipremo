import { useState, useEffect, useRef } from 'react'
import { type ESPData, type ConnectionStatus } from '../../lib/connection'
import { RMSEngine, type RMSData } from '../../lib/algorithms/RMSEngine'
import { FFTEngine, type FFTData } from '../../lib/algorithms/FFTEngine'
import { IntegrationEngine, type VelocityRMSData } from '../../lib/algorithms/IntegrationEngine'
import { KurtosisEngine, type KurtosisData } from '../../lib/algorithms/KurtosisEngine'
import { SkewnessEngine, type SkewnessData } from '../../lib/algorithms/SkewnessEngine'

// ... (Sub-componentes)
import Sidebar from './Sidebar'
import OverviewView from './views/OverviewView'
import ChartsView from './views/ChartsView'
import HistoryView from './views/HistoryView'
import MathView from './views/MathView'
import RawView from './views/RawView'

type DashboardProps = {
  data: ESPData | null;
  status: ConnectionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
};

export type Tab = 'overview' | 'charts' | 'history' | 'math' | 'raw';

function Dashboard({ data, status, onConnect, onDisconnect }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  
  // 1. Carga inicial de persistencia (Historial RMS)
  const savedHistory = (() => {
    try {
      const saved = localStorage.getItem('DIPREMO_HISTORY');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  })();

  const historyRef = useRef<RMSData[]>(savedHistory);
  const rawBufferRef = useRef<ESPData[]>([]);

  // 2. Estado de Interfaz (solo se actualiza periódicamente para fluidez)
  const [displayHistory, setDisplayHistory] = useState<RMSData[]>(historyRef.current);
  const [displayRawHistory, setDisplayRawHistory] = useState<ESPData[]>([]);

  // 3. Estado FFT
  const fftRef = useRef<FFTData | null>(null);
  const [displayFft, setDisplayFft] = useState<FFTData | null>(null);

  // 4. Estado Velocidad ISO (Integración)
  const isoRef = useRef<VelocityRMSData | null>(null);
  const [displayIso, setDisplayIso] = useState<VelocityRMSData | null>(null);

  // 5. Estado Curtosis
  const kurtosisRef = useRef<KurtosisData | null>(null);
  const [displayKurtosis, setDisplayKurtosis] = useState<KurtosisData | null>(null);

  // 6. Estado Asimetría (Skewness)
  const skewnessRef = useRef<SkewnessData | null>(null);
  const [displaySkewness, setDisplaySkewness] = useState<SkewnessData | null>(null);

  // Gestión de entrada de datos (Velocidad de Sensor)
  useEffect(() => {
    if (data) {
      // A. Buffer RAW (Volátil - Solo para Math/Normalization)
      rawBufferRef.current = [data, ...rawBufferRef.current].slice(0, 200);

      // B. Procesamiento RMS (Persistente - Para Auditoría/Tendencia)
      const rmsResult = RMSEngine.addSample(data);
      if (rmsResult) {
        historyRef.current = [rmsResult, ...historyRef.current].slice(0, 5000);
      }

      // C. Procesamiento Espectral (FFT)
      const fftResult = FFTEngine.addSample(data);
      if (fftResult) {
        fftRef.current = fftResult;
      }

      // D. Integración Numérica ISO
      const isoResult = IntegrationEngine.addSample(data);
      if (isoResult) {
        isoRef.current = isoResult;
      }

      // E. Detección de Daños de Rodamientos (Curtosis)
      const kurtosisResult = KurtosisEngine.addSample(data);
      if (kurtosisResult) {
        kurtosisRef.current = kurtosisResult;
      }

      // F. Detección de Aflojamiento Mecánico (Asimetría)
      const skewnessResult = SkewnessEngine.addSample(data);
      if (skewnessResult) {
        skewnessRef.current = skewnessResult;
      }
    }
  }, [data]);

  // Motor de Actualización Visual (Throttle a 10Hz/100ms para estabilidad total)
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayHistory(historyRef.current);
      setDisplayRawHistory(rawBufferRef.current);
      if (fftRef.current) {
        setDisplayFft(fftRef.current);
      }
      if (isoRef.current) {
        setDisplayIso(isoRef.current);
      }
      if (kurtosisRef.current) {
        setDisplayKurtosis(kurtosisRef.current);
      }
      if (skewnessRef.current) {
        setDisplaySkewness(skewnessRef.current);
      }
    }, 100); 

    return () => clearInterval(timer);
  }, []);

  // Persistencia de seguridad (Cada 5 segundos en lugar de cada muestra)
  useEffect(() => {
    const persistTimer = setInterval(() => {
      if (historyRef.current.length > 0) {
        localStorage.setItem('DIPREMO_HISTORY', JSON.stringify(historyRef.current));
      }
    }, 5000);

    return () => clearInterval(persistTimer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'charts':
        return <ChartsView data={data} history={displayHistory} fftData={displayFft} isoData={displayIso} kurtosisData={displayKurtosis} skewnessData={displaySkewness} />;
      case 'history':
        return <HistoryView history={displayHistory} />;
      case 'math':
        return <MathView rawHistory={displayRawHistory} rmsHistory={displayHistory} />;
      case 'raw':
        return <RawView data={data} />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        data={data} 
        status={status}
        onConnect={onConnect}
        onDisconnect={onDisconnect} 
      />

      <main className="content-area">
        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;
