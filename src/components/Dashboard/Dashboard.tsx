import { useState, useEffect } from 'react'
import { STATUS, type ESPData, type ConnectionStatus } from '../../lib/connection'

// Sub-componentes
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
  
  // Inicialización inteligente desde localStorage
  const [history, setHistory] = useState<ESPData[]>(() => {
    try {
      const saved = localStorage.getItem('DIPREMO_HISTORY');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Gestión del historial de datos y persistencia optimizada
  useEffect(() => {
    if (data) {
      setHistory(prev => {
        const newHistory = [data, ...prev];
        const trimmedHistory = newHistory.slice(0, 5000); // Elevado a 5,000 muestras
        
        // Persistencia periódica (cada 100 muestras para no impactar rendimiento)
        if (newHistory.length % 100 === 0) {
          localStorage.setItem('DIPREMO_HISTORY', JSON.stringify(trimmedHistory));
        }
        
        return trimmedHistory;
      });
    }
  }, [data]);

  // Persistencia de seguridad al desconectar
  useEffect(() => {
    if (status === STATUS.DISCONNECTED && history.length > 0) {
      localStorage.setItem('DIPREMO_HISTORY', JSON.stringify(history));
    }
  }, [status, history]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'charts':
        return <ChartsView />;
      case 'history':
        return <HistoryView history={history} />;
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
