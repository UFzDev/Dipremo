import { useState, useEffect, useRef } from 'react'
import { type ESPData, type ConnectionStatus, STATUS } from '../../lib/connection'
import { RMSEngine, type RMSData } from '../../lib/algorithms/RMSEngine'
import { FFTEngine, type FFTData } from '../../lib/algorithms/FFTEngine'
import { IntegrationEngine, type VelocityRMSData } from '../../lib/algorithms/IntegrationEngine'
import { KurtosisEngine, type KurtosisData } from '../../lib/algorithms/KurtosisEngine'
import { SkewnessEngine, type SkewnessData } from '../../lib/algorithms/SkewnessEngine'
import { ConnectionEngine, type ConnectionHealth } from '../../lib/algorithms/ConnectionEngine'

// ... (Sub-componentes)
import Sidebar from './Sidebar'
import OverviewView from './views/OverviewView'
import ChartsView from './views/ChartsView'
import HistoryView from './views/HistoryView'
import MathView from './views/MathView'
import RawView from './views/RawView'
import ConfigView from './views/ConfigView'

type DashboardProps = {
  data: ESPData | null;
  status: ConnectionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
};

export type Tab = 'overview' | 'charts' | 'history' | 'math' | 'raw' | 'settings';

function Dashboard({ data, status, onConnect, onDisconnect }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  
  // 0. Configuración de Motor (Persistente)
  const [motorRpm, setMotorRpm] = useState<number>(() => {
    const saved = localStorage.getItem('dipremo_motor_rpm');
    return saved ? parseInt(saved, 10) : 1800;
  });

  useEffect(() => {
    localStorage.setItem('dipremo_motor_rpm', motorRpm.toString());
  }, [motorRpm]);

  // 0.1 Configuración Avanzada (Límites y Picos)
  const [vibeLimits, setVibeLimits] = useState(() => {
    const saved = localStorage.getItem('dipremo_vibe_limits');
    return saved ? JSON.parse(saved) : { minX: -16, maxX: 16, minY: -16, maxY: 16, minZ: -16, maxZ: 16 };
  });

  const [rmsPeaks, setRmsPeaks] = useState(() => {
    const saved = localStorage.getItem('dipremo_rms_peaks');
    return saved ? JSON.parse(saved) : { x: 50, y: 50, z: 50, res: 80 };
  });

  const [fftRange, setFftRange] = useState(() => {
    const saved = localStorage.getItem('dipremo_fft_range');
    return saved ? JSON.parse(saved) : { minHz: 0, maxHz: 50 };
  });

  useEffect(() => {
    localStorage.setItem('dipremo_vibe_limits', JSON.stringify(vibeLimits));
  }, [vibeLimits]);

  useEffect(() => {
    localStorage.setItem('dipremo_rms_peaks', JSON.stringify(rmsPeaks));
  }, [rmsPeaks]);

  useEffect(() => {
    localStorage.setItem('dipremo_fft_range', JSON.stringify(fftRange));
  }, [fftRange]);
  
  // 1. Historial en memoria (solo para renderizado UI)
  const historyRef = useRef<RMSData[]>([]);
  const rawBufferRef = useRef<ESPData[]>([]);

  // 2. Estado de Interfaz (solo se actualiza periódicamente para fluidez)
  const [displayHistory, setDisplayHistory] = useState<RMSData[]>([]);
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

  // 7. Estado Diagnóstico de Conexión
  const healthRef = useRef<ConnectionHealth | null>(null);
  const [displayHealth, setDisplayHealth] = useState<ConnectionHealth | null>(null);

  // Gestión de entrada de datos (Velocidad de Sensor)
  useEffect(() => {
    // A. Gatekeeper: Solo procesar si estamos conectados y hay data
    if (data && status === STATUS.CONNECTED) {
      // B. Buffer RAW (Volátil - Solo para Math/Normalization)
      rawBufferRef.current = [data, ...rawBufferRef.current].slice(0, 200);

      // C. Procesamiento RMS (Persistente - Para Auditoría/Tendencia)
      const rmsResult = RMSEngine.addSample(data);
      if (rmsResult) {
        historyRef.current = [rmsResult, ...historyRef.current].slice(0, 5000);
      }

      // D. Procesamiento Espectral (FFT)
      const fftResult = FFTEngine.addSample(data);
      if (fftResult) {
        fftRef.current = fftResult;
      }

      // E. Integración Numérica ISO
      const isoResult = IntegrationEngine.addSample(data);
      if (isoResult) {
        isoRef.current = isoResult;
      }

      // F. Detección de Daños de Rodamientos (Curtosis)
      const kurtosisResult = KurtosisEngine.addSample(data);
      if (kurtosisResult) {
        kurtosisRef.current = kurtosisResult;
      }

      // G. Detección de Aflojamiento Mecánico (Asimetría)
      const skewnessResult = SkewnessEngine.addSample(data);
      if (skewnessResult) {
        skewnessRef.current = skewnessResult;
      }

      // H. Diagnóstico de Red (Cada muestra cuenta para detectar pérdida)
      healthRef.current = ConnectionEngine.processSample(data);
    }
  }, [data, status]);

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
      if (healthRef.current) {
        setDisplayHealth(healthRef.current);
      }
    }, 100); 

    return () => clearInterval(timer);
  }, []);

  // Motor de Logging Físico (CSV - Cada 10 segundos)
  useEffect(() => {
    const persistTimer = setInterval(() => {
      // 1. Gatekeepers Estrictos
      if (status !== STATUS.CONNECTED) return;
      
      const health = healthRef.current;
      const current = rawBufferRef.current[0];
      
      // Solo grabar si hay calidad de señal mínima (> 10%)
      if (!health || health.quality < 10 || !current) return; 

      const now = new Date().toISOString();
      const rms = historyRef.current[0];
      const kurt = kurtosisRef.current;
      const iso = isoRef.current;
      
      const maxIso = Math.max(iso?.vRmsX ?? 0, iso?.vRmsY ?? 0, iso?.vRmsZ ?? 0);
      const f = (val: number | undefined) => (val || 0).toFixed(4);

      // Ensamblaje estricto de las 10 columnas
      const csvLine = `${now},${f(rms?.x)},${f(rms?.y)},${f(rms?.z)},${f(kurt?.kurtosisX)},${f(kurt?.kurtosisY)},${f(kurt?.kurtosisZ)},${f(maxIso)},${current.diag.temp_c.toFixed(1)},${health.quality}`;
      
      fetch('/api/history/append', { method: 'POST', body: csvLine })
        .catch(err => console.error("Error grabando en disco:", err));
        
    }, 10000); 

    return () => clearInterval(persistTimer);
  }, [status]); // Quitamos 'data' para evitar resets infinitos del timer

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewView 
            data={data} 
            health={displayHealth}
            rmsData={displayHistory[0] || null}
            fftData={displayFft}
            isoData={displayIso}
            kurtosisData={displayKurtosis}
            skewnessData={displaySkewness}
            motorRpm={motorRpm}
          />
        );
      case 'charts':
        return (
          <ChartsView 
            data={data} 
            history={displayHistory} 
            fftData={displayFft} 
            isoData={displayIso} 
            kurtosisData={displayKurtosis} 
            skewnessData={displaySkewness} 
            motorRpm={motorRpm}
          />
        );
      case 'history':
        return <HistoryView history={displayHistory} />;
      case 'math':
        return <MathView rawHistory={displayRawHistory} rmsHistory={displayHistory} motorRpm={motorRpm} />;
      case 'raw':
        return <RawView data={data} />;
      case 'settings':
        return (
          <ConfigView 
            motorRpm={motorRpm} setMotorRpm={setMotorRpm} 
            vibeLimits={vibeLimits} setVibeLimits={setVibeLimits}
            rmsPeaks={rmsPeaks} setRmsPeaks={setRmsPeaks}
            fftRange={fftRange} setFftRange={setFftRange}
          />
        );
      default:
        return (
          <OverviewView 
            data={data} 
            health={displayHealth}
            rmsData={displayHistory[0] || null}
            fftData={displayFft}
            isoData={displayIso}
            kurtosisData={displayKurtosis}
            skewnessData={displaySkewness}
            motorRpm={motorRpm}
          />
        );
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        data={data} 
        status={status}
        health={displayHealth}
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
