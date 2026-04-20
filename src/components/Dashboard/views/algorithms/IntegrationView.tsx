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
          
          <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px', textAlign: 'center', marginBottom: '2rem', border: '1px solid #e2e8f0', fontFamily: 'serif', fontSize: '24px', fontStyle: 'italic', letterSpacing: '2px', color: '#1e293b' }}>
             v(t) = ∫ a(t) dt
          </div>
          
          <p className="algo-text">
            Dado que la arquitectura DIPREMO procesa data discreta fragmentada (puntos vectoriales en el JSON) y no un continuo, empleamos la táctica de cálculo conocida como la <strong>Regla del Trapezoide</strong>:
          </p>

          <div style={{ 
            padding: '2.5rem 2rem', 
            background: '#ffffff', 
            borderRadius: '12px', 
            textAlign: 'center', 
            marginBottom: '2rem', 
            border: '1px solid #e2e8f0',
            boxShadow: 'inset 0 1px 4px 0 rgba(0,0,0,0.03)'
          }}>
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
              <text x="195" y="35" className="math-main" className="algo-math-text-24">a<tspan dy="8" className="math-sub" className="algo-math-text-13">n</tspan></text>
              <text x="230" y="35" className="math-op" className="algo-math-text-24">+</text>
              <text x="255" y="35" className="math-main" className="algo-math-text-24">a<tspan dy="8" className="math-sub" className="algo-math-text-13">n-1</tspan></text>
              
              <line x1="190" y1="45" x2="300" y2="45" stroke="#1a202c" strokeWidth="1.5" />
              
              <text x="240" y="70" className="math-main" className="algo-math-text-24 algo-math-normal">2</text>
              
              {/* Paren Derecho */}
              <text x="310" y="65" className="math-paren">)</text>

              {/* * dt */}
              <text x="340" y="55" className="math-op">·</text>
              <text x="365" y="55" className="math-main" className="algo-math-normal">Δ</text>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7' }}>
              <div style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '13px', color: '#16a34a' }}>A. EL LENGUAJE DE LA NORMA ISO 10816</div>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#4a5568' }}>
                Los estándares industriales oficiales mundiales casi nunca evalúan si estás en zona de peligro por aceleración, sino exigiendo una medida en <strong>Velocidad RMS</strong>. Para poder diagnosticar legalmente y disparar un semáforo rojo o verde, estabas forzado a conseguir un vector numérico de <code>mm/s</code> puro.
              </div>
            </div>
            <div style={{ padding: '1.5rem', background: '#fffbeb', borderRadius: '8px', border: '1px solid #fde68a' }}>
              <div style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '13px', color: '#d97706' }}>B. DETECCIÓN DE DAÑOS CATASTRÓFICOS</div>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#4a5568' }}>
                La aceleración ya te permite identificar daños en frecuencias muy altas (es decir, microsurcos y rasguños miniatura en los rodamientos). Sin embargo, <strong>la velocidad detecta todo el espectro de baja frecuencia</strong> donde subyacen los mayores asesinos mecánicos como el desbalanceo total y la rotura de bases de metal.
              </div>
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
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'stretch', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ width: '40px', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>1</div>
              <div style={{ padding: '1rem 1.5rem' }}>
                <strong style={{ display: 'block', fontSize: '14px', marginBottom: '0.25rem', color: '#1e293b' }}>Limpieza DC Previa (DC Blocker)</strong>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Usamos el motor de Normalización de tu sistema para centrar a Cero. Evita el mortal error matemático de "derivar hasta el infinito" al integrar.</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'stretch', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ width: '40px', background: '#8b5cf6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>2</div>
              <div style={{ padding: '1rem 1.5rem' }}>
                <strong style={{ display: 'block', fontSize: '14px', marginBottom: '0.25rem', color: '#1e293b' }}>Conversión Gravitatoria</strong>
                <span style={{ fontSize: '13px', color: '#64748b' }}>La magnitud bruta viene en <strong style={{ color: '#0f172a' }}>g</strong> (Fuerza G). La multiplicamos silenciosamente por <strong style={{ color: '#0f172a' }}>9806.65</strong> para transformarlo a <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>mm/second²</code>.</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'stretch', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ width: '40px', background: '#06b6d4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>3</div>
              <div style={{ padding: '1rem 1.5rem' }}>
                <strong style={{ display: 'block', fontSize: '14px', marginBottom: '0.25rem', color: '#1e293b' }}>Regla del Trapezoide y vRMS</strong>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Los bloques del JSON se encadenan inyectando el valor anterior. Sobre ese nuevo buffer de velocidad en mm/s, activamos el algoritmo ya programado de RMS.</span>
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

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default IntegrationView;
