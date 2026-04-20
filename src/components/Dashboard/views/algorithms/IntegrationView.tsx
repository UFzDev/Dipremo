function IntegrationView() {
  return (
    <section className="engineering-report" >
      
      {/* Encabezado del Reporte */}
      <header className="algo-header">
        <h1 className="algo-title">
          INTEGRACIÓN NUMÉRICA Y VELOCIDAD (ISO 10816)
        </h1>
        <p className="algo-subtitle">
          Conversión de Aceleración a Velocidad mediante la Regla del Trapezoide
        </p>
      </header>

      {/* 1.- FUNDAMENTO MATEMÁTICO */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          1.- ¿Qué es el algoritmo de Integración Numérica?
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            Es el proceso matemático de convertir la señal de <strong>Aceleración (m/s²)</strong> que entrega el ADXL345 dictado en hardware, en una señal de <strong>Velocidad (mm/s)</strong>. En términos de cálculo diferencial puro, la velocidad es la integral de la aceleración respecto al tiempo:
          </p>
          
          <div className="algo-math-box algo-math-text-24 algo-math-normal algo-math-symbol">
             v(t) = ∫ a(t) dt
          </div>
          
          <p className="algo-text">
            Dado que la arquitectura DIPREMO procesa data discreta fragmentada (puntos vectoriales en el JSON) y no un continuo, empleamos la táctica de cálculo conocida como la <strong>Regla del Trapezoide</strong>:
          </p>

          <div className="algo-math-box-lg">
            <svg width="450" height="90" viewBox="0 0 450 90" className="algo-math-svg">
              <defs>
                <style>{`
                  .math-main { font-family: "Times New Roman", Times, serif; font-style: italic; font-size: 32px; fill: #1a202c; }
                  .math-op { font-family: "Times New Roman", Times, serif; font-size: 32px; fill: #1a202c; }
                  .math-sub { font-size: 16px; font-style: normal; }
                  .math-paren { font-size: 55px; font-weight: 300; fill: #2d3748; }
                `}</style>
              </defs>
              {/* v_n = v_{n-1} + */}
              <text x="10" y="55" className="math-main">v<tspan dy="10" className="math-sub">n</tspan></text>
              <text x="45" y="55" className="math-op">=</text>
              <text x="75" y="55" className="math-main">v<tspan dy="10" className="math-sub">n-1</tspan></text>
              <text x="135" y="55" className="math-op">+</text>

              {/* Paren Izquierdo */}
              <text x="170" y="65" className="math-paren">(</text>
              
              {/* Fracción a_n + a_{n-1} / 2 */}
              <text x="195" y="35" className="math-main algo-math-text-24">a<tspan dy="8" className="math-sub algo-math-text-13">n</tspan></text>
              <text x="230" y="35" className="math-op algo-math-text-24">+</text>
              <text x="255" y="35" className="math-main algo-math-text-24">a<tspan dy="8" className="math-sub algo-math-text-13">n-1</tspan></text>
              
              <line x1="190" y1="45" x2="300" y2="45" stroke="#1a202c" strokeWidth="1.5" />
              
              <text x="240" y="70" className="math-main algo-math-text-24 algo-math-normal">2</text>
              
              {/* Paren Derecho */}
              <text x="310" y="65" className="math-paren">)</text>

              {/* * dt */}
              <text x="340" y="55" className="math-op">·</text>
              <text x="365" y="55" className="math-main algo-math-normal">&Delta;</text>
              <text x="385" y="55" className="math-main">t</text>
            </svg>
          </div>
        </div>
      </div>

      {/* 2.- IMPORTANCIA */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          2.- ¿Por qué es importante en tu proyecto?
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            Esta componente es la piedra angular que cataloga a DIPREMO como un software de monitoreo "Profesional", respaldado por las métricas de fiabilidad ISO:
          </p>
          <div className="algo-info-grid">
            <div className="algo-box-success">
              <div className="algo-info-card-title">A. EL LENGUAJE DE LA NORMA ISO 10816</div>
              <p className="algo-info-card-desc">
                Los estándares industriales oficiales mundiales casi nunca evalúan si estás en zona de peligro por aceleración, sino exigiendo una medida en <strong>Velocidad RMS</strong>. Para poder diagnosticar legalmente y disparar un semáforo rojo o verde, estabas forzado a conseguir un vector numérico de <code>mm/s</code> puro.
              </p>
            </div>
            <div className="algo-box-warning">
              <div className="algo-info-card-title">B. DETECCIÓN DE DAÑOS CATASTRÓFICOS</div>
              <p className="algo-info-card-desc">
                La aceleración ya te permite identificar daños en frecuencias muy altas (es decir, microsurcos y rasguños miniatura en los rodamientos). Sin embargo, <strong>la velocidad detecta todo el espectro de baja frecuencia</strong> donde subyacen los mayores asesinos mecánicos como el desbalanceo total y la rotura de bases de metal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3.- FLUJO DE APLICACIÓN */}
      <div className="report-section mb-12">
        <h2 className="algo-section-title">
          3.- ¿Cómo lo usamos? (Pipeline de Software)
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            Al delegar esto directamente en la PC, obtenemos integraciones de alta precisión en tiempo real de la siguiente manera operativa:
          </p>
          
          <div className="algo-list-grid">
            
            <div className="algo-num-step-card">
              <div className="algo-num-step-badge bg-blue">1</div>
              <div className="algo-num-step-content">
                <strong className="algo-num-step-title">Limpieza DC Previa (DC Blocker)</strong>
                <p className="algo-num-step-desc">Usamos el motor de Normalización de tu sistema para centrar a Cero. Evita el mortal error matemático de "derivar hasta el infinito" al integrar.</p>
              </div>
            </div>

            <div className="algo-num-step-card">
              <div className="algo-num-step-badge bg-violet">2</div>
              <div className="algo-num-step-content">
                <strong className="algo-num-step-title">Conversión Gravitatoria</strong>
                <p className="algo-num-step-desc">La magnitud bruta viene en <strong>g</strong> (Fuerza G). La multiplicamos silenciosamente por <strong>9806.65</strong> para transformarlo a <code className="algo-code-box">mm/s<sup>2</sup></code>.</p>
              </div>
            </div>

            <div className="algo-num-step-card">
              <div className="algo-num-step-badge bg-cyan">3</div>
              <div className="algo-num-step-content">
                <strong className="algo-num-step-title">Regla del Trapezoide y vRMS</strong>
                <p className="algo-num-step-desc">Los bloques del JSON se encadenan inyectando el valor anterior. Sobre ese nuevo buffer de velocidad en mm/s, activamos el algoritmo ya programado de RMS.</p>
              </div>
            </div>

          </div>

          <div className="algo-card-dark">
             <h4 className="algo-threshold-row mb-0.5">
                <span style={{ color: '#38bdf8' }}>▶</span> Salida Visual Directa
             </h4>
             <p style={{ margin: 0, fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6' }}>
                Tu panel web ahora aloja bajo tu área de monitoreo principal, un diagnóstico global "Termómetro" que compara esa velocidad contra límites estrictos mundiales programados en hard-code: <em>Si lees un vRMS global sumado de 4.5 mm/s, el Dashboard encenderá la alarma de "Peligro Inminente".</em>
             </p>
          </div>
        </div>
      </div>

    </section>
  );
}

export default IntegrationView;
