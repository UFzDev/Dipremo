function RMSView() {
  return (
    <section className="engineering-report" >
      
      {/* Encabezado del Reporte */}
      <header className="algo-header">
        <h1 className="algo-title">
          ANÁLISIS DEL VALOR CUADRÁTICO MEDIO (RMS)
        </h1>
        <p className="algo-subtitle">
          Implementación de Métrica de Energía y Potencia en Vibración Mecánica
        </p>
      </header>

      {/* 1.- DEFINICIÓN Y FUNDAMENTO */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          1.- ¿Qué es el Valor Cuadrático Medio (RMS)?
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            El RMS (Root Mean Square) es una medida estadística de la magnitud de una cantidad variable. En ingeniería, se utiliza para obtener un valor constante que represente la potencia o energía de una señal que cambia rápidamente en el tiempo.
          </p>
          
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '1.5rem', color: '#4a5568' }}>Fundamento Matemático</h3>
          <div style={{ 
            padding: '3.5rem 2rem', 
            background: '#ffffff', 
            borderRadius: '12px', 
            textAlign: 'center', 
            marginBottom: '2rem', 
            border: '1px solid #e2e8f0',
            boxShadow: 'inset 0 1px 4px 0 rgba(0,0,0,0.03)',
            position: 'relative'
          }}>
            {/* Ecuación Vectorial Profesional (SVG Precision) */}
            <svg width="360" height="110" viewBox="0 0 360 110" className="algo-math-svg">
              <defs>
                <style>{`
                  .math-main { font-family: "Times New Roman", Times, serif; font-style: italic; font-size: 32px; fill: #1a202c; }
                  .math-sub { font-size: 16px; font-style: normal; }
                  .math-symbol { font-size: 40px; font-weight: 300; fill: #2d3748; }
                `}</style>
              </defs>
              
              {/* Parte Izquierda: X_RMS = */}
              <text x="10" y="60" className="math-main">X<tspan dy="10" className="math-sub">RMS</tspan></text>
              <text x="100" y="60" className="math-main" className="algo-math-normal">=</text>
              
              {/* Símbolo de la Raíz Cuadrada */}
              <path d="M140 55 L150 95 L175 15 L350 15" fill="none" stroke="#2d3748" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Término de Fracción (1/N) */}
              <text x="185" y="42" className="math-main" className="algo-math-text-20">1</text>
              <line x1="182" y1="50" x2="205" y2="50" stroke="#2d3748" strokeWidth="2" />
              <text x="185" y="75" className="math-main" className="algo-math-text-20">N</text>
              
              {/* Símbolo de Sumatoria con límites perfectos */}
              <text x="220" y="63" className="math-symbol" style={{ fontSize: '50px', fontFamily: 'serif' }}>Σ</text>
              <text x="228" y="88" className="math-main" style={{ fontSize: '12px', fontStyle: 'normal' }}>i=1</text>
              <text x="232" y="24" className="math-main" style={{ fontSize: '12px', fontStyle: 'normal' }}>N</text>
              
              {/* Variable y Exponente: x_i^2 */}
              <text x="265" y="60" className="math-main">x<tspan dy="6" className="math-sub">i</tspan><tspan dy="-24" className="algo-math-text-20">2</tspan></text>
            </svg>
          </div>
          
          <p style={{ fontSize: '14px', marginBottom: '1rem' }}>El proceso matemático consta de tres etapas:</p>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '14px', lineHeight: '1.8' }}>
            <li><strong>Cuadrado (Square):</strong> Se eleva cada lectura al cuadrado, asegurando que todos los valores sean positivos.</li>
            <li><strong>Media (Mean):</strong> Se calcula el promedio de los cuadrados en un intervalo de tiempo definido por N.</li>
            <li><strong>Raíz (Root):</strong> Se aplica la raíz cuadrada para retornar el resultado a las unidades originales de medida.</li>
          </ul>
        </div>
      </div>

      {/* 2.- IMPORTANCIA EN EL PROYECTO */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          2.- Por qué es importante en el proyecto
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            La importancia del RMS radica en que es la métrica que representa fielmente el contenido energético de la señal.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div style={{ padding: '1.25rem', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bee3f8' }}>
              <div style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '12px' }}>EVITA LA CANCELACIÓN</div>
              <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#4a5568' }}>Al promediar una vibración pura, el promedio simple resulta cercano a cero. El RMS asegura que cada movimiento sume a la magnitud total.</div>
            </div>
            <div style={{ padding: '1.25rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <div style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '12px' }}>CONTENIDO ENERGÉTICO</div>
              <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#4a5568' }}>La energía mecánica es proporcional al cuadrado de la amplitud. El RMS es el indicador directo de la energía disipada.</div>
            </div>
            <div style={{ padding: '1.25rem', background: '#fffaf0', borderRadius: '8px', border: '1px solid #fbd38d' }}>
              <div style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '12px' }}>ESTABILIDAD OPERATIVA</div>
              <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#4a5568' }}>A diferencia del valor "Pico", el RMS promedia el comportamiento para detectar cambios reales en la condición mecánica.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.- CÓMO LO USAREMOS NOSOTROS */}
      <div className="report-section mb-12">
        <h2 className="algo-section-title">
          3.- Cómo lo usaremos nosotros
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            En el sistema de monitoreo, el RMS se aplica para tres funciones críticas:
          </p>
          <div className="algo-list-grid">
            <div style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <strong style={{ display: 'block', fontSize: '14px', marginBottom: '0.5rem', color: '#2d3748' }}>A. Determinación de la Severidad Vibratoria</strong>
              <div style={{ fontSize: '14px', color: '#4a5568' }}>Permite definir el estado de salud de la máquina. Un RMS elevado indica la presencia de problemas estructurales reales.</div>
            </div>
            <div style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <strong style={{ display: 'block', fontSize: '14px', marginBottom: '0.5rem', color: '#2d3748' }}>B. Establecimiento de Límites de Alerta</strong>
              <div style={{ fontSize: '14px', color: '#4a5568' }}>Acomoda umbrales lógicos de operación: Zonas de funcionamiento normal, alerta por incremento y peligro crítico.</div>
            </div>
            <div style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <strong style={{ display: 'block', fontSize: '14px', marginBottom: '0.5rem', color: '#2d3748' }}>C. Análisis de Tendencias (Trend Analysis)</strong>
              <div style={{ fontSize: '14px', color: '#4a5568' }}>Registra la evolución temporal de la energía. Facilita la predicción de fallas mediante el seguimiento del incremento gradual de vibración.</div>
            </div>
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

export default RMSView;
