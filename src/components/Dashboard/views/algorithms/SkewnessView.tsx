function SkewnessView() {
  return (
    <section className="engineering-report" >
      
      {/* Encabezado del Reporte */}
      <header className="algo-header">
        <h1 className="algo-title">
          TERCER MOMENTO ESTADÍSTICO (ASIMETRÍA)
        </h1>
        <p className="algo-subtitle">
          El "Perito de Causa Raíz": Monitoreo direccional de holguras y aflojamientos
        </p>
      </header>

      {/* 1.- FUNDAMENTO MATEMÁTICO */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          1.- ¿Qué es la Asimetría (Skewness)?
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
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
            <svg width="350" height="120" viewBox="0 0 350 120" className="algo-math-svg">
              <defs>
                <style>{`
                  .math-main { font-family: "Times New Roman", Times, serif; font-style: italic; font-size: 32px; fill: #1a202c; }
                  .math-op { font-family: "Times New Roman", Times, serif; font-size: 32px; fill: #1a202c; }
                  .math-sub { font-size: 14px; font-style: normal; }
                  .math-sup { font-size: 16px; font-style: normal; }
                  .math-paren { font-size: 65px; font-weight: 300; fill: #2d3748; }
                `}</style>
              </defs>
              <text x="20" y="70" className="math-main" className="algo-math-normal">S</text>
              <text x="55" y="70" className="math-op">=</text>
              
              {/* Numerador Σ (x_i - μ)^3 */}
              <text x="120" y="45" className="math-op" className="algo-math-text-26">Σ</text>
              <text x="145" y="45" className="math-op" className="algo-math-text-22">( x</text>
              <text x="172" y="52" className="math-main" className="algo-math-text-14">i</text>
              <text x="185" y="45" className="math-op" className="algo-math-text-22">-</text>
              <text x="205" y="45" className="math-main" className="algo-math-text-22">μ</text>
              <text x="225" y="45" className="math-op" className="algo-math-text-22">)</text>
              <text x="235" y="30" className="math-main" className="algo-math-text-16 algo-math-normal algo-math-color">3</text>

              <line x1="90" y1="65" x2="260" y2="65" stroke="#1a202c" strokeWidth="1.5" />
              
              {/* Denominador N * σ^3 */}
              <text x="120" y="95" className="math-main" className="algo-math-text-24 algo-math-normal">N</text>
              <text x="145" y="95" className="math-op" className="algo-math-text-24">·</text>
              <text x="165" y="95" className="math-main" className="algo-math-text-24">σ</text>
              <text x="180" y="80" className="math-main" className="algo-math-text-16 algo-math-normal algo-math-color">3</text>
            </svg>
          </div>
          <p className="algo-text-sm">
            La clave de esta fórmula es estar <strong>elevada al cubo (³)</strong> y no al cuadrado (²). Los cubos no destruyen el signo. Por tanto, evalúan en qué lado magnético (positivo/hacia arriba o negativo/hacia abajo) se está cargando la oscilación destructiva.
          </p>
        </div>
      </div>

      {/* 2.- TRANSCENDENCIA EN EL PROYECTO */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          2.- ¿Para qué sirve diagnosticar la Asimetría?
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            El Skewness detecta comportamientos erráticos mecánicos que pasan completamente debajo del radar (o invisibles) en los otros análisis gausianos de tu software.
          </p>
          <div className="algo-list-grid">
            <div className="algo-list-card">
               <div className="algo-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
               </div>
               <div>
                 <div className="algo-list-title">Pernos Sueltos o Bases Rotas</div>
                 <div className="algo-list-desc">
                   Cuando la bancada está aflojada de un solo lado, el motor en vez de vibrar choca como un rebote contra el suelo o su tope de un lado. Eso es altamente asimétrico e indica que se está jalando el equipo o hay un amortiguamiento asimétrico en la pata de soporte.
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.- EJECUCIÓN PRÁCTICA */}
      <div className="report-section mb-12">
        <h2 className="algo-section-title">
          3.- Criterio Diagnóstico de Taller (Umbrales)
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            Nuestra brújula bidireccional computa lo anterior en vivo usando límites absolutos $Abs(S) \ge 1.0$:
          </p>
          
          <div className="algo-card-dark">
             <h4 className="algo-threshold-row mb-1">
                <span className="text-emerald">|S| {'<'} 0.5 (Sano)</span> Dinámica Simétrica Balanceada.
             </h4>
             <h4 className="algo-threshold-row mb-1">
                <span className="text-amber">|S| {'>'} 0.5 (Alerta)</span> Desviación Ligera (Perno/engrane desgastado).
             </h4>
             <h4 className="algo-threshold-row mb-0.5">
                <span className="text-rose">|S| {'>'} 1.0 (Daño Crítico)</span> Holgura o choque Unidireccional confirmado.
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
