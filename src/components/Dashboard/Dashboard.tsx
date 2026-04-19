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
  const [history, setHistory] = useState<ESPData[]>([]);

  // Gestión del historial de datos
  useEffect(() => {
    if (data) {
      setHistory(prev => {
        const newHistory = [data, ...prev];
        return newHistory.slice(0, 2000); // Aumentado a 2000 muestras para mayor profundidad
      });
    }
  }, [data]);

  // Limpiar historial al desconectar
  useEffect(() => {
    if (status === STATUS.DISCONNECTED) {
      setHistory([]);
    }
  }, [status]);

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
