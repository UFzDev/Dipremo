import type { ESPData } from '../../lib/connection'

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  data: ESPData | null;
  onDisconnect: () => void;
};

function Sidebar({ activeTab, setActiveTab, data, onDisconnect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>DIPREMO</h1>
        <div className="label-sm" style={{ opacity: 0.6 }}>Panel de Datos</div>
      </div>

      <nav className="sidebar-menu">
        <div 
          className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Vista General
        </div>
        <div 
          className={`nav-item ${activeTab === 'charts' ? 'active' : ''}`}
          onClick={() => setActiveTab('charts')}
        >
          Gráficas
        </div>
        <div 
          className={`nav-item ${activeTab === 'math' ? 'active' : ''}`}
          onClick={() => setActiveTab('math')}
        >
          Algoritmos
        </div>
        <div 
          className={`nav-item ${activeTab === 'raw' ? 'active' : ''}`}
          onClick={() => setActiveTab('raw')}
        >
          Consola JSON
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="label-sm" style={{ marginBottom: '0.5rem' }}>Dispositivo</div>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem', wordBreak: 'break-all' }}>
          ID: {data?.device_id || 'SIN CONEXIÓN'}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
          Boot Count: {data?.boot_id ?? '--'}
        </div>
        <button className="btn btn-ghost w-full" onClick={onDisconnect} style={{ fontSize: '13px' }}>
          Desconectar
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;
