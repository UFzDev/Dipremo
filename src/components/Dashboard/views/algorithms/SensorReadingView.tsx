function SensorReadingView() {
  return (
    <section className="engineering-report" style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1000px', margin: '0 auto', textAlign: 'left', color: '#1a202c', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Encabezado Ajustado */}
      <header style={{ borderBottom: '3px solid #2d3748', paddingBottom: '2rem', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          CÓMO TRABAJA EL SISTEMA
        </h1>
        <p style={{ marginTop: '0.75rem', fontSize: '16px', fontWeight: 500, color: '#4a5568' }}>
          Análisis del Proceso de Adquisición y Digitalización de Señales de Aceleración
        </p>
      </header>

      {/* 1.- SISTEMA MEMS */}
      <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          1.- Arquitectura de Detección Micromecánica (MEMS)
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1rem' }}>
            El sensor ADXL345 utiliza una estructura micromecanizada de polisilicio suspendida mediante resortes microscópicos. La presencia de aceleración provoca una deflexión física en la masa móvil, lo que genera un desequilibrio en un sistema de capacitores diferenciales internos.
          </p>
          <div className="card" style={{ background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem' }}>
            <p style={{ fontSize: '14px', margin: 0, color: '#2d3748' }}>
              <strong>Componente Estático (Gravedad):</strong> En condiciones de reposo sobre una superficie nivelada, el eje Z interactúa perpendicularmente con el vector de gravedad terrestre, resultando en una lectura estática de ±1g equivalente a aproximadamente 256 LSB (Least Significant Bit) en escala de ±2g. 
              Los ejes X e Y, al encontrarse paralelos al plano, registran valores próximos a 0 LSB.
            </p>
          </div>
        </div>
      </div>

      {/* 2.- CUANTIZACIÓN */}
      <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          2.- Conversión Analógica-Digital y Mapa de Registros
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.25rem' }}>
            Las variaciones de capacitancia se procesan mediante un ADC (Analog-Digital Converter) interno de 13 bits. Los resultados se cuantizan en formato de complemento a dos y se distribuyen en un mapa de memoria de 8 bits (byte-addressable) para almacenar los datos.
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '1.5rem' }}>
            <thead>
              <tr style={{ background: '#edf2f7', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Eje</th>
                <th style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Registro Bajo (Low)</th>
                <th style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Registro Alto (High)</th>
                <th style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Formato</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 700 }}>X</td>
                <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>0x32 (DATAX0)</td>
                <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>0x33 (DATAX1)</td>
                <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }} rowSpan={3}>16-bit Complemento a dos (Left Justified)</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 700 }}>Y</td>
                <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>0x34 (DATAY0)</td>
                <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>0x35 (DATAY1)</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 700 }}>Z</td>
                <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>0x36 (DATAZ0)</td>
                <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>0x37 (DATAZ1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3.- I2C */}
      <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          3.- Protocolo de Comunicación y Extracción
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7' }}>
            La ESP32 inicia la transacción I2C actuando como dispositivo de lectura. Se realiza una lectura multibyte a partir de la dirección base 0x32. 
            El flujo de datos se sincroniza mediante las líneas SCL (Clock) y SDA (Data), garantizando la integridad de las muestras.
          </p>
        </div>
      </div>

      {/* 4.- PROCESAMIENTO */}
      <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          4.- Reconstrucción de Firma y Conversión
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.25rem' }}>
            Los bytes extraídos en ráfagas de 8 bits se concatenan en el firmware de la ESP32 para recuperar el valor entero original de 16 bits. Este proceso utiliza operaciones Bitwise que es el desplazamiento a la izquierda:
          </p>
          <div style={{ background: '#1a202c', color: '#ebf8ff', padding: '1.5rem', borderRadius: '8px', fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', marginBottom: '1.5rem' }}>
            <span style={{ color: '#718096' }}>// Algoritmo de concatenación por desplazamiento en C++</span><br/>
            int16_t rawValue = (register_low | (register_high &lt;&lt; 8));
          </div>
          <p style={{ fontSize: '15px', lineHeight: '1.7' }}>
            La conversión a unidades de aceleración (g) se obtiene aplicando el factor de escala correspondiente a la configuración de resolución completa (Full Res), típicamente <strong>3.9 mg/LSB</strong>.
          </p>
        </div>
      </div>

      {/* 5.- WEBSOCKET */}
      <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          5.- Transmisión de Capa de Aplicación (WebSocket)
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7' }}>
            Los datos procesados se encapsulan en tramas JSON y se transmiten mediante un servidor WebSocket asíncrono sobre TCP/IP. Esta arquitectura permite el streaming de alta frecuencia con latencia reducida, facilitando la visualización inmediata de los transitorios de vibración en el cliente.
          </p>
        </div>
      </div>

      {/* 6.- WEBSOCKET EXPLANATION */}
      <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          6.- Tecnología WebSocket y Persistencia de Datos
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.25rem' }}>
            El protocolo WebSocket proporciona un canal de comunicación bidireccional y 'full-duplex' sobre una única conexión TCP. A diferencia del protocolo HTTP convencional, que es unidireccional y basado en peticiones, el WebSocket permite una transmisión de datos constante y de baja latencia.
          </p>
          <div className="card" style={{ background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem' }}>
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
