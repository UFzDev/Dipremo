function SensorReadingView() {
  return (
    <section className="engineering-report" >
      
      {/* Encabezado Ajustado */}
      <header style={{ borderBottom: '3px solid #2d3748', paddingBottom: '2rem', marginBottom: '3rem' }}>
        <h1 className="algo-title">
          CÓMO TRABAJA EL SISTEMA
        </h1>
        <p className="algo-subtitle">
          Análisis del Proceso de Adquisición y Digitalización de Señales de Aceleración
        </p>
      </header>

      {/* 1.- SISTEMA MEMS */}
      <div className="report-section mb-12">
        <h2 className="algo-section-title">
          1.- Arquitectura de Detección Micromecánica (MEMS)
        </h2>
        <div className="algo-section-content">
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1rem' }}>
            El sensor ADXL345 utiliza una estructura micromecanizada de polisilicio suspendida mediante resortes microscópicos. La presencia de aceleración provoca una deflexión física en la masa móvil, lo que genera un desequilibrio en un sistema de capacitores diferenciales internos.
          </p>
          <div className="card" className="algo-card-light">
            <p style={{ fontSize: '14px', margin: 0, color: '#2d3748' }}>
              <strong>Componente Estático (Gravedad):</strong> En condiciones de reposo sobre una superficie nivelada, el eje Z interactúa perpendicularmente con el vector de gravedad terrestre, resultando en una lectura estática de ±1g equivalente a aproximadamente 256 LSB (Least Significant Bit) en escala de ±2g. 
              Los ejes X e Y, al encontrarse paralelos al plano, registran valores próximos a 0 LSB.
            </p>
          </div>
        </div>
      </div>

      {/* 2.- CUANTIZACIÓN */}
      <div className="report-section mb-12">
        <h2 className="algo-section-title">
          2.- Conversión Analógica-Digital y Mapa de Registros
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            Las variaciones de capacitancia se procesan mediante un ADC (Analog-Digital Converter) interno de 13 bits. Los resultados se cuantizan en formato de complemento a dos y se distribuyen en un mapa de memoria de 8 bits (byte-addressable) para almacenar los datos.
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '1.5rem' }}>
            <thead>
              <tr style={{ background: '#edf2f7', textAlign: 'left' }}>
                <th className="algo-table-cell">Eje</th>
                <th className="algo-table-cell">Registro Bajo (Low)</th>
                <th className="algo-table-cell">Registro Alto (High)</th>
                <th className="algo-table-cell">Formato</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="algo-table-cell algo-table-cell-bold">X</td>
                <td className="algo-table-cell">0x32 (DATAX0)</td>
                <td className="algo-table-cell">0x33 (DATAX1)</td>
                <td className="algo-table-cell" rowSpan={3}>16-bit Complemento a dos (Left Justified)</td>
              </tr>
              <tr>
                <td className="algo-table-cell algo-table-cell-bold">Y</td>
                <td className="algo-table-cell">0x34 (DATAY0)</td>
                <td className="algo-table-cell">0x35 (DATAY1)</td>
              </tr>
              <tr>
                <td className="algo-table-cell algo-table-cell-bold">Z</td>
                <td className="algo-table-cell">0x36 (DATAZ0)</td>
                <td className="algo-table-cell">0x37 (DATAZ1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3.- I2C */}
      <div className="report-section mb-12">
        <h2 className="algo-section-title">
          3.- Protocolo de Comunicación y Extracción
        </h2>
        <div className="algo-section-content">
          <p className="algo-text-last">
            La ESP32 inicia la transacción I2C actuando como dispositivo de lectura. Se realiza una lectura multibyte a partir de la dirección base 0x32. 
            El flujo de datos se sincroniza mediante las líneas SCL (Clock) y SDA (Data), garantizando la integridad de las muestras.
          </p>
        </div>
      </div>

      {/* 4.- PROCESAMIENTO */}
      <div className="report-section mb-12">
        <h2 className="algo-section-title">
          4.- Reconstrucción de Firma y Conversión
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            Los bytes extraídos en ráfagas de 8 bits se concatenan en el firmware de la ESP32 para recuperar el valor entero original de 16 bits. Este proceso utiliza operaciones Bitwise que es el desplazamiento a la izquierda:
          </p>
          <div className="algo-code-box">
            <span className="algo-code-comment">// Algoritmo de concatenación por desplazamiento en C++</span><br/>
            int16_t rawValue = (register_low | (register_high &lt;&lt; 8));
          </div>
          <p className="algo-text-last">
            La conversión a unidades de aceleración (g) se obtiene aplicando el factor de escala correspondiente a la configuración de resolución completa (Full Res), típicamente <strong>3.9 mg/LSB</strong>.
          </p>
        </div>
      </div>

      {/* 5.- WEBSOCKET */}
      <div className="report-section mb-12">
        <h2 className="algo-section-title">
          5.- Transmisión de Capa de Aplicación (WebSocket)
        </h2>
        <div className="algo-section-content">
          <p className="algo-text-last">
            Los datos procesados se encapsulan en tramas JSON y se transmiten mediante un servidor WebSocket asíncrono sobre TCP/IP. Esta arquitectura permite el streaming de alta frecuencia con latencia reducida, facilitando la visualización inmediata de los transitorios de vibración en el cliente.
          </p>
        </div>
      </div>

      {/* 6.- WEBSOCKET EXPLANATION */}
      <div className="report-section mb-12">
        <h2 className="algo-section-title">
          6.- Tecnología WebSocket y Persistencia de Datos
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            El protocolo WebSocket proporciona un canal de comunicación bidireccional y 'full-duplex' sobre una única conexión TCP. A diferencia del protocolo HTTP convencional, que es unidireccional y basado en peticiones, el WebSocket permite una transmisión de datos constante y de baja latencia.
          </p>
          <div className="card" className="algo-card-light">
            <p style={{ fontSize: '14px', margin: 0, color: '#2d3748' }}>
              <strong>Mecanismo de Conexión:</strong> La comunicación inicia con un 'handshake' HTTP donde el cliente solicita una actualización de protocolo. Una vez establecida, la conexión permanece abierta, permitiendo que la ESP32 envíe los paquetes de vibración de forma proactiva (Push) sin que el servidor o el cliente tengan que solicitarlos repetidamente. Esta persistencia garantiza la monitorización industrial en tiempo real.
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default SensorReadingView;
