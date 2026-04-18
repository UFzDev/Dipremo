export const STATUS = {
  CONNECTED: "Conectado",
  DISCONNECTED: "Desconectado",
  ERROR: "Error",
  CONNECTING: "Conectando..."
} as const;

export type ConnectionStatus = typeof STATUS[keyof typeof STATUS];

export type ESPData = {
  // Datos de identificación y tiempo
  device_id: string;
  boot_id: number;
  sample_id: number;
  sample_rate_hz: number;
  uptime_ms: number;
  delta_ms: number;

  // Datos crudos del sensor
  raw: {
    x: number;
    y: number;
    z: number;
  };

  // Diagnóstico de la placa
  diag: {
    temp_c: number;
    free_heap: number;
    rssi_dbm: number;
    i2c_error_count: number;
  };
};

export function connectToESP(
  onData: (data: ESPData) => void,
  onStatus: (status: ConnectionStatus) => void
) {
  const socket = new WebSocket('ws://192.168.4.1:81');

  let hasOpened = false;

  socket.onopen = () => {
    hasOpened = true;
    onStatus(STATUS.CONNECTED);
    console.log("WebSocket Abierto");
  };

  socket.onclose = () => {
    if (!hasOpened) {
      onStatus(STATUS.ERROR);
    } else {
      onStatus(STATUS.DISCONNECTED);
    }
    console.log("WebSocket Cerrado");
  };

  socket.onerror = (error) => {
    onStatus(STATUS.ERROR);
    console.error("Error WebSocket:", error);
  };

  socket.onmessage = (event) => {
    try {
      const parsed: ESPData = JSON.parse(event.data);
      onData(parsed);
    } catch (e) {
      console.error("Error al parsear datos de la ESP32:", e);
    }
  };

  return () => {
    socket.close();
  };
}
