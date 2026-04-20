import { type ESPData } from '../../../lib/connection'
import { type ConnectionHealth } from '../../../lib/algorithms/ConnectionEngine'

type OverviewViewProps = {
  data: ESPData | null;
  health: ConnectionHealth | null;
};

function StatusCard({ title, value, subValue, icon, color }: { title: string, value: string, subValue: string, icon: string, color: string }) {
  return (
    <div className="card-mini" style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="label-sm" style={{ color: '#64748b' }}>{title}</div>
        <div style={{ color }}>{icon}</div>
      </div>
      <div style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b' }}>{value}</div>
      <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>{subValue}</div>
    </div>
  );
}

function OverviewView({ data, health }: OverviewViewProps) {
  const isHealthy = (health?.quality ?? 0) > 90;
  const isDisconnected = !data;

  return (
    <div className="overview-view" style={{ padding: '2rem', animation: 'fadeIn 0.5s ease-out' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>Estado General del Sistema</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isDisconnected ? '#94a3b8' : (isHealthy ? '#10b981' : '#f59e0b') }}></div>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
            {isDisconnected ? 'Esperando Conexión...' : (isHealthy ? 'Sistemas Operativos' : 'Conexión Inestable')}
          </span>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <StatusCard 
          title="Salud de Conexión"
          value={`${health?.quality ?? 0}%`}
          subValue={isDisconnected ? '--' : `${health?.lostPackets} paquetes perdidos`}
          color={isHealthy ? '#10b981' : '#f59e0b'}
          icon="📡"
        />
        <StatusCard 
          title="Estabilidad (Jitter)"
          value={isDisconnected ? '--' : `${health?.jitterMs}ms`}
          subValue={isDisconnected ? '--' : `Fluctuación de llegada`}
          color="#3b82f6"
          icon="⏱️"
        />
        <StatusCard 
          title="Temperatura MCU"
          value={data ? `${data.diag.temp_c.toFixed(1)}°C` : '--'}
          subValue="Temperatura interna ESP32"
          color="#ef4444"
          icon="🌡️"
        />
        <StatusCard 
          title="Consistencia I2C"
          value={data ? `${data.diag.i2c_error_count}` : '--'}
          subValue="Errores de bus hardware"
          color="#8b5cf6"
          icon="⛓️"
        />
      </div>

      {!isHealthy && !isDisconnected && (
        <div style={{ padding: '1.5rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ fontSize: '24px' }}>⚠️</div>
          <div>
            <div style={{ fontWeight: 800, color: '#92400e', marginBottom: '0.25rem' }}>Alerta de Estabilidad de Datos</div>
            <p style={{ fontSize: '14px', color: '#b45309', margin: 0 }}>
              Se está detectando una pérdida de paquetes significativa. Esto suele deberse a la distancia con la ESP32 o interferencia en la banda 2.4GHz. 
              <strong> Por favor, acerque el dispositivo a la computadora o revise la antena.</strong>
            </p>
          </div>
        </div>
      )}

      {isDisconnected && (
        <div className="flex-center" style={{ flexDirection: 'column', minHeight: '30vh', gap: '1rem', background: '#f8fafc', borderRadius: '12px', border: '2px dashed #e2e8f0' }}>
           <div className="label-sm" style={{ opacity: 0.5 }}>DIPREMO está listo para recibir telemetría</div>
           <p style={{ fontSize: '12px', color: '#94a3b8' }}>Conecte la ESP32 desde el menú lateral para iniciar el diagnóstico</p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default OverviewView;
