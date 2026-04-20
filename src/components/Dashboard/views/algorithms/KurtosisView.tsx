function KurtosisView() {
  return (
    <section className="engineering-report" style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1000px', margin: '0 auto', textAlign: 'left', color: '#1a202c', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Encabezado del Reporte */}
      <header style={{ borderBottom: '3px solid #2d3748', paddingBottom: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          CUARTO MOMENTO ESTADÍSTICO (CURTOSIS)
        </h1>
        <p style={{ marginTop: '0.75rem', fontSize: '16px', fontWeight: 500, color: '#4a5568' }}>
          El "Espía Predictivo": Detección temprana de fallos en rodamientos e impactos mecánicos
        </p>
      </header>

      {/* 1.- FUNDAMENTO MATEMÁTICO */}
      <div className="report-section mb-12" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8b5cf6', borderLeft: '4px solid #8b5cf6', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          1.- ¿Qué es la Curtosis?
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Matemáticamente, es el cuarto momento estadístico de una señal. En términos mecánicos simples, <strong>mide qué tan "puntiaguda" o "esporádica"</strong> es la distribución de tus datos de aceleración frente a una distribución normal suave (Gaussiana de valor 3).
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
            <svg width="350" height="120" viewBox="0 0 350 120" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <defs>
                <style>{`
                  .math-main { font-family: "Times New Roman", Times, serif; font-style: italic; font-size: 32px; fill: #1a202c; }
                  .math-op { font-family: "Times New Roman", Times, serif; font-size: 32px; fill: #1a202c; }
                  .math-sub { font-size: 14px; font-style: normal; }
                  .math-sup { font-size: 16px; font-style: normal; }
                  .math-paren { font-size: 65px; font-weight: 300; fill: #2d3748; }
                `}</style>
              </defs>
              <text x="20" y="70" className="math-main">K</text>
              <text x="55" y="70" className="math-op">=</text>
              
              {/* Numerador Σ (x_i - μ)^4 */}
              <text x="120" y="45" className="math-op" style={{ fontSize: '26px' }}>Σ</text>
              <text x="145" y="45" className="math-op" style={{ fontSize: '22px' }}>( x</text>
              <text x="172" y="52" className="math-main" style={{ fontSize: '14px' }}>i</text>
              <text x="185" y="45" className="math-op" style={{ fontSize: '22px' }}>-</text>
              <text x="205" y="45" className="math-main" style={{ fontSize: '22px' }}>μ</text>
              <text x="225" y="45" className="math-op" style={{ fontSize: '22px' }}>)</text>
              <text x="235" y="30" className="math-main" style={{ fontSize: '16px', fontStyle: 'normal' }}>4</text>

              <line x1="90" y1="65" x2="260" y2="65" stroke="#1a202c" strokeWidth="1.5" />
              
              {/* Denominador N * σ^4 */}
              <text x="120" y="95" className="math-main" style={{ fontStyle: 'normal', fontSize: '24px' }}>N</text>
              <text x="145" y="95" className="math-op" style={{ fontSize: '24px' }}>·</text>
              <text x="165" y="95" className="math-main" style={{ fontSize: '24px' }}>σ</text>
              <text x="180" y="80" className="math-main" style={{ fontSize: '16px', fontStyle: 'normal' }}>4</text>
            </svg>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Donde <strong style={{color: '#1a202c'}}>x_i</strong> es cada muestra cruda de aceleración, <strong style={{color: '#1a202c'}}>μ</strong> es la media (cero natural), <strong style={{color: '#1a202c'}}>σ</strong> es la Desviación Estándar (aproximadamente el RMS en AC) y <strong style={{color: '#1a202c'}}>N</strong> es el tamaño del bloque computacional.</p>
        </div>
      </div>

      {/* 2.- LA MAGIA VS RMS */}
      <div className="report-section mb-12" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8b5cf6', borderLeft: '4px solid #8b5cf6', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          2.- ¿Por qué es el mejor espía industrial?
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            La magia pura de la curtosis radica en que es prácticamente <strong>insensible a los cambios masivos de RPM o carga pesada</strong> del motor, pero explota de dolor ante mínimos impactos metálicos como un rodamiento crujiendo.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fee2e2' }}>
              <div style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '13px', color: '#ef4444' }}>EL FALLO DEL RMS (ENGAÑO)</div>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#4a5568' }}>
                Cuando una bola de rodamiento tiene un <em>micro-pitting</em> (una fisura miniatura), choca metálicamente y genera picos violentos. Pero al ser tan cortos (milisegundos), al promediarse matemáticamente bajo raíz cuadrática, <strong>no tienen peso total para mover el RMS general</strong>. La gráfica de daños severos se verá absurdamente "Sana y Verde".
              </div>
            </div>
            <div style={{ padding: '1.5rem', background: '#f5f3ff', borderRadius: '8px', border: '1px solid #ede9fe' }}>
              <div style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '13px', color: '#7c3aed' }}>LA EXPOSICIÓN DE LA CURTOSIS</div>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#4a5568' }}>
                Elevamos la ecuación a la <strong>cuarta potencia (x⁴)</strong>. Los temblores normales suaves ($~= 1$) se mantienen bajos ($1^4 = 1$), pero ese micro pico violento ($~= 10$) explota de inmediato ($10^4 = 10,000$). La campana matemática se deforma y grita la alerta en nuestro panel antes de que la máquina siquiera empiece a calentarse.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.- EJECUCIÓN PRÁCTICA */}
      <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8b5cf6', borderLeft: '4px solid #8b5cf6', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          3.- La Dinámica de la Salud Predictiva (El Tablero)
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Nuestro motor captura bloques ininterrumpidos y exprime los valores <em>K</em> basándose en las leyes mundiales de predictibilidad de rodamientos de fricción:
          </p>
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#1e293b', borderRadius: '12px', border: '2px solid #334155' }}>
             <h4 style={{ margin: '0 0 1rem 0', color: '#f8fafc', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#a78bfa' }}>K=3.0</span> Estado de Salud Plena (Ruido Gausiano Natural)
             </h4>
             <h4 style={{ margin: '0 0 1rem 0', color: '#fcd34d', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#fbbf24' }}>K=3.5</span> Alarma de Micro-fisuras incipientes (Warning)
             </h4>
             <h4 style={{ margin: '0 0 0.5rem 0', color: '#fca5a5', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#f87171' }}>K=10.0</span> Fallo Catastrófico del Balero / Impactos puros (Danger)
             </h4>
             <p style={{ margin: '1rem 0 0 0', fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', fontStyle: 'italic', borderTop: '1px solid #475569', paddingTop: '1rem' }}>
               "Todo este diagnóstico visual ahora subyace en la Pestaña Global de Gráficas de Máquina como un semáforo progresivo para tus operadores de mantenimiento, indicándoles: **'Tu máquina no vibra aún, pero su rodamiento ya se está pudriendo por dentro.'**"
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

export default KurtosisView;
