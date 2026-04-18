import { STATUS, type ConnectionStatus } from '../../lib/connection'
import './Connection.css'

type ConnectionProps = {
  status: ConnectionStatus;
  onConnect: () => void;
  onSetup: () => void;
};

function Connection({ status, onConnect, onSetup }: ConnectionProps) {
  return (
    <div className="flex-center">
      <div className="card connection-card">        
        <h1>DIPREMO</h1>
        <p className="mb-8">
          Monitoreo de vibraciones en tiempo real vía WiFi
        </p>

        <div className="label-sm mb-4">
          Estado: {status}
        </div>

        <button 
          className="btn btn-primary w-full" 
          onClick={onConnect}
          disabled={status === STATUS.CONNECTING}
        >
          {status === STATUS.DISCONNECTED ? "Conectar con ESP32" : "Reintentar conexión"}
        </button>

        <button className="btn btn-ghost w-full" style={{ marginTop: '0.75rem' }} onClick={onSetup}>
          Iniciar sesión
        </button>

        {status === STATUS.ERROR && (
          <span className="text-error">
            Error de conexión. Asegúrate de estar conectado a la red <b>ESP32_DIPREMO</b>.
          </span>
        )}
      </div>
    </div>
  );
}

export default Connection;
