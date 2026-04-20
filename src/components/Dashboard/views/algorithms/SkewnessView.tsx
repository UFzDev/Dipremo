function SkewnessView() {
  return (
    <section className="engineering-report" style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1000px', margin: '0 auto', textAlign: 'left', color: '#1a202c', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Encabezado del Reporte */}
      <header style={{ borderBottom: '3px solid #2d3748', paddingBottom: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          TERCER MOMENTO ESTADÍSTICO (ASIMETRÍA)
        </h1>
        <p style={{ marginTop: '0.75rem', fontSize: '16px', fontWeight: 500, color: '#4a5568' }}>
          El "Perito de Causa Raíz": Monitoreo direccional de holguras y aflojamientos
        </p>
      </header>

      {/* 1.- FUNDAMENTO MATEMÁTICO */}
      <div className="report-section mb-12" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0ea5e9', borderLeft: '4px solid #0ea5e9', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          1.- ¿Qué es la Asimetría (Skewness)?
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Mientras el **RMS** te dice "cuánta fuerza" tiene la vibración y la **Curtosis** te advierte sobre "impactos agudos" metálicos, la **Asimetría** (Tercer momento) extrae de la física pura qué tan balanceada está la oscilación alrededor del punto mecánico muerto.
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
              <text x="20" y="70" className="math-main" style={{ fontStyle: 'normal' }}>S</text>
              <text x="55" y="70" className="math-op">=</text>
              
              {/* Numerador Σ (x_i - μ)^3 */}
              <text x="120" y="45" className="math-op" style={{ fontSize: '26px' }}>Σ</text>
              <text x="145" y="45" className="math-op" style={{ fontSize: '22px' }}>( x</text>
              <text x="172" y="52" className="math-main" style={{ fontSize: '14px' }}>i</text>
              <text x="185" y="45" className="math-op" style={{ fontSize: '22px' }}>-</text>
              <text x="205" y="45" className="math-main" style={{ fontSize: '22px' }}>μ</text>
              <text x="225" y="45" className="math-op" style={{ fontSize: '22px' }}>)</text>
              <text x="235" y="30" className="math-main" style={{ fontSize: '16px', fontStyle: 'normal', color: '#0ea5e9' }}>3</text>

              <line x1="90" y1="65" x2="260" y2="65" stroke="#1a202c" strokeWidth="1.5" />
              
              {/* Denominador N * σ^3 */}
              <text x="120" y="95" className="math-main" style={{ fontStyle: 'normal', fontSize: '24px' }}>N</text>
              <text x="145" y="95" className="math-op" style={{ fontSize: '24px' }}>·</text>
              <text x="165" y="95" className="math-main" style={{ fontSize: '24px' }}>σ</text>
              <text x="180" y="80" className="math-main" style={{ fontSize: '16px', fontStyle: 'normal', color: '#0ea5e9' }}>3</text>
            </svg>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            La clave de esta fórmula es estar <strong>elevada al cubo (³)</strong> y no al cuadrado (²). Los cubos no destruyen el signo. Por tanto, evalúan en qué lado magnético (positivo/hacia arriba o negativo/hacia abajo) se está cargando la oscilación destructiva.
          </p>
        </div>
      </div>

      {/* 2.- TRANSCENDENCIA EN EL PROYECTO */}
      <div className="report-section mb-12" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0ea5e9', borderLeft: '4px solid #0ea5e9', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          2.- ¿Para qué sirve diagnosticar la Asimetría?
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            El Skewness detecta comportamientos erráticos mecánicos que pasan completamente debajo del radar (o invisibles) en los otros análisis gausianos de tu software.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <div style={{ padding: '1.5rem', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #e0f2fe', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
               <div style={{ background: '#0ea5e9', padding: '0.5rem', borderRadius: '50%', color: 'white' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
               </div>
               <div>
                 <div style={{ fontWeight: 800, marginBottom: '0.25rem', fontSize: '14px', color: '#0284c7' }}>Pernos Sueltos o Bases Rotas</div>
                 <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#334155' }}>
                   Cuando la bancada está aflojada de un solo lado, el motor en vez de vibrar choca como un rebote contra el suelo o su tope de un lado. Eso es altamente asimétrico e indica que se está jalando el equipo o hay un amortiguamiento asimétrico en la pata de soporte.
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.- EJECUCIÓN PRÁCTICA */}
      <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0ea5e9', borderLeft: '4px solid #0ea5e9', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          3.- Criterio Diagnóstico de Taller (Umbrales)
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Nuestra brújula bidireccional computa lo anterior en vivo usando límites absolutos $Abs(S) \ge 1.0$:
          </p>
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#1e293b', borderRadius: '12px', border: '2px solid #334155' }}>
             <h4 style={{ margin: '0 0 1rem 0', color: '#f8fafc', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#10b981' }}>|S| {'<'} 0.5 (Sano)</span> Dinámica Simétrica Balanceada.
             </h4>
             <h4 style={{ margin: '0 0 1rem 0', color: '#fcd34d', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#fbbf24' }}>|S| {'>'} 0.5 (Alerta)</span> Desviación Ligera (Perno/engrane desgastado).
             </h4>
             <h4 style={{ margin: '0 0 0.5rem 0', color: '#fca5a5', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#ef4444' }}>|S| {'>'} 1.0 (Daño Crítico)</span> Holgura o choque Unidireccional confirmado.
             </h4>
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

export default SkewnessView;
