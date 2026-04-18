import { useState } from 'react'
import type { ESPData } from '../../lib/connection'

// Sub-componentes
import Sidebar from './Sidebar'
import OverviewView from './views/OverviewView'
import ChartsView from './views/ChartsView'
import MathView from './views/MathView'
import RawView from './views/RawView'

type DashboardProps = {
  data: ESPData | null;
  onDisconnect: () => void;
};

export type Tab = 'overview' | 'charts' | 'math' | 'raw';

function Dashboard({ data, onDisconnect }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'charts':
        return <ChartsView />;
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
        onDisconnect={onDisconnect} 
      />

      <main className="content-area">
        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;
