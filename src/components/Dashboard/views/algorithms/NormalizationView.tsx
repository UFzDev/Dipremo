import { type ESPData } from '../../../../lib/connection'

type NormalizationViewProps = {
  history: ESPData[];
};

function NormalizationView({ history }: NormalizationViewProps) {
  return (
    <section className="engineering-report" >
      
      {/* Encabezado del Reporte */}
      <header className="algo-header">
        <h1 className="algo-title">
          NORMALIZACIÓN EN XYZ
        </h1>
        <p className="algo-subtitle">
          Gesti&oacute;n din&aacute;mica de la componente AC/DC y supresi&oacute;n de vectores gravitatorios
        </p>
      </header>

      {/* 1.- EL PROBLEMA DE LA GRAVEDAD */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          1.- Offset DC y Tecnolog&iacute;a MEMS
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            Todo aceler&oacute;metro <strong>MEMS</strong> (Micro-Electro-Mechanical Systems) como el ADXL345 integrado, detecta una aceleraci&oacute;n constante de <strong>1g (9.8 m/s<sup>2</sup>)</strong> dirigida hacia el centro de la Tierra. Esta fuerza se manifiesta como un <strong>Offset DC</strong> (corriente continua), desplazando el punto de reposo l&oacute;gico de la se&ntilde;al.
          </p>

          <div className="algo-info-grid">
            <div className="algo-box-slate">
              <strong className="algo-info-card-title">¿Qu&eacute; es el Offset DC?</strong>
              <p className="algo-info-card-desc">
                Es la componente de valor promedio de la se&ntilde;al. Representa la suma del <strong>vector gravitatorio</strong> y el <strong>Bias Error</strong> (desviaci&oacute;n residual de f&aacute;brica). Para el an&aacute;lisis de vibraci&oacute;n din&aacute;mico (AC), este valor act&uacute;a como un ruido est&aacute;tico que debe ser eliminado para evitar lecturas de energ&iacute;a falsas.
              </p>
            </div>
            <div className="algo-box-indigo">
              <strong className="algo-info-card-title">Tecnolog&iacute;a MEMS de Silicio</strong>
              <p className="algo-info-card-desc">
                Estos sensores utilizan estructuras microsc&oacute;picas de silicio que act&uacute;an como condensadores variables. Cuando existe una aceleraci&oacute;n, una "masa de prueba" se mueve, cambiando la capacitancia y permitiendo una conversi&oacute;n digital de alta fidelidad con un consumo m&iacute;nimo.
              </p>
            </div>
          </div>
          
          <div className="algo-box-danger" style={{ marginBottom: '2rem' }}>
             <strong className="algo-info-card-title" style={{ color: 'inherit', display: 'block', marginBottom: '0.5rem' }}>LIMITACI&Oacute;N DE LA CALIBRACI&Oacute;N EST&Aacute;TICA</strong>
             <p className="algo-info-card-desc" style={{ color: 'inherit' }}>
                En una instalaci&oacute;n ideal, la gravedad caer&iacute;a sobre un solo eje (ej: Z=1g, X=0, Y=0). Sin embargo, en un motor real, el sensor puede montarse con inclinaciones arbitrarias, distribuyendo el vector de 1g entre los tres ejes seg&uacute;n los <strong>cosenos directores</strong> de su orientaci&oacute;n. Una resta de "valores fijos" es in&uacute;til ante cualquier reajuste f&iacute;sico del sensor.
             </p>
          </div>
        </div>
      </div>

      {/* 2.- LA SOLUCI&Oacute;N INTELIGENTE */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          2.- Diferenciaci&oacute;n de Señales AC y DC
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            El sistema DIPREMO implementa un <strong>DC Blocker</strong> (Filtro Pasa-Altas) mediante un Leaky Integrator. Este algoritmo separa la informaci&oacute;n entrante en dos dominios cr&iacute;ticos:
          </p>
          <div className="algo-info-grid">
            <div className="algo-info-card shadow-sm" style={{ borderTop: '4px solid #64748b' }}>
              <div className="algo-info-card-title" style={{ color: '#94a3b8', fontSize: '11px' }}>DOMINIO DC (EST&Aacute;TICO)</div>
              <strong className="algo-info-card-title" style={{ fontSize: '16px', color: '#334155' }}>Postura y Gravedad</strong>
              <p className="algo-info-card-desc">
                Representa la l&iacute;nea base de la se&ntilde;al. Es una componente de frecuencia casi nula que el algoritmo rastrea continuamente para identificar cu&aacute;l es el "piso" gravitatorio actual de cada eje.
              </p>
            </div>
            <div className="algo-info-card shadow-sm" style={{ borderTop: '4px solid #ef4444' }}>
              <div className="algo-info-card-title" style={{ color: '#94a3b8', fontSize: '11px' }}>DOMINIO AC (DIN&Aacute;MICO)</div>
              <strong className="algo-info-card-title" style={{ fontSize: '16px', color: '#334155' }}>Vibraci&oacute;n Industrial Real</strong>
              <p className="algo-info-card-desc">
                Son las perturbaciones de alta velocidad (desbalanceo, impactos, fricci&oacute;n). Al restar el Dominio DC del sensor crudo, aislamos puramente la energ&iacute;a vibratoria necesaria para el an&aacute;lisis predictivo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3.- C&Oacute;MO SE CALCULA */}
       <div className="report-section mb-12">
        <h2 className="algo-section-title">
          3.- Implementaci&oacute;n del Leaky Integrator (EMA)
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            El microprocesador ejecuta un Promedio M&oacute;vil Exponencial (EMA) en tiempo real. La selecci&oacute;n de la constante de suavizado (<strong>Alpha = 0.98</strong>) es vital: permite que el sistema ignore los picos de vibraci&oacute;n r&aacute;pidos pero reaccione ante cambios lentos en la inclinaci&oacute;n o gravedad.
          </p>
          <div className="algo-card-light">
             <h4 className="algo-info-card-title" style={{ color: '#64748b', fontSize: '13px' }}>Fase 1: Estimaci&oacute;n Din&aacute;mica del Vector de Postura</h4>
             <div className="algo-code-box" style={{ marginBottom: '2rem' }}>
                <span className="algo-math-color" style={{ marginRight: '0.5rem' }}>Gravity_EMA =</span> (0.98 * Gravity_EMA) + (0.02 * Sensor_Raw)
             </div>

             <h4 className="algo-info-card-title" style={{ color: '#64748b', fontSize: '13px' }}>Fase 2: Extracci&oacute;n de Cero Absoluto (Filtro AC)</h4>
             <div className="algo-code-box" style={{ background: '#eef2ff', color: '#4338ca' }}>
                <span style={{ color: '#6366f1', marginRight: '0.5rem' }}>Vibration_Clean =</span> Sensor_Raw - Gravity_EMA
             </div>
          </div>
          <div className="algo-box-success" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <span style={{ fontSize: '18px', marginRight: '5px' }}>🛡️</span> <strong>AUTONOM&Iacute;A DE CALIBRACI&Oacute;N:</strong> Este m&eacute;todo elimina la dependencia de botones de "Zero" manuales. Al iniciar o reubicar el sensor, el algoritmo atraviesa una etapa de <strong>Reconvergencia Din&aacute;mica</strong> de ~1.0s, tras la cual las gr&aacute;ficas retornan autom&aacute;ticamente a su centro de energ&iacute;a, garantizando la integridad de la telemetr&iacute;a sin importar el &aacute;ngulo de montaje.
          </div>
        </div>
      </div>
    </section>
  );
}

export default NormalizationView;
