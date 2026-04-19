import { useState, useEffect, useRef } from 'react'
import { type ESPData, type ConnectionStatus } from '../../lib/connection'

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
  
  // 1. Carga inicial de persistencia
  const savedHistory = (() => {
    try {
      const saved = localStorage.getItem('DIPREMO_HISTORY');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  })();

  const historyRef = useRef<ESPData[]>(savedHistory);

  // 2. Estado de Interfaz (solo se actualiza periódicamente para fluidez)
  const [displayHistory, setDisplayHistory] = useState<ESPData[]>(historyRef.current);

  // Gestión de entrada de datos (Velocidad de Sensor)
  useEffect(() => {
    if (data) {
      // Actualización silenciosa del búfer maestro
      historyRef.current = [data, ...historyRef.current].slice(0, 5000);
    }
  }, [data]);

  // Motor de Actualización Visual (Throttle a 10Hz/100ms para estabilidad total)
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayHistory(historyRef.current);
    }, 100); // 10 actualizaciones por segundo son suficientes para auditoría estable

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
        return <ChartsView data={data} />;
      case 'history':
        return <HistoryView history={displayHistory} />;
      case 'math':
        return <MathView />;
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
        data={displayHistory[0] || null} 
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
