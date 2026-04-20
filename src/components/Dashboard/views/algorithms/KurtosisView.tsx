function KurtosisView() {
  return (
    <section className="engineering-report" >
      
      {/* Encabezado del Reporte */}
      <header className="algo-header">
        <h1 className="algo-title">
          CUARTO MOMENTO ESTADÍSTICO (CURTOSIS)
        </h1>
        <p className="algo-subtitle">
          El "Espía Predictivo": Detección temprana de fallos en rodamientos e impactos mecánicos
        </p>
      </header>

      {/* 1.- FUNDAMENTO MATEMÁTICO */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          1.- ¿Qué es la Curtosis?
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            Matemáticamente, es el cuarto momento estadístico de una señal. En términos mecánicos simples, <strong>mide qué tan "puntiaguda" o "esporádica"</strong> es la distribución de tus datos de aceleración frente a una distribución normal suave (Gaussiana de valor 3).
          </p>
          
          <div className="algo-math-box-lg">
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
              <text x="20" y="70" className="math-main">K</text>
              <text x="55" y="70" className="math-op">=</text>
              
              {/* Numerador Σ (x_i - μ)^4 */}
              <text x="120" y="45" className="math-op algo-math-text-26">Σ</text>
              <text x="145" y="45" className="math-op algo-math-text-22">( x</text>
              <text x="172" y="52" className="math-main algo-math-text-14">i</text>
              <text x="185" y="45" className="math-op algo-math-text-22">-</text>
              <text x="205" y="45" className="math-main algo-math-text-22">μ</text>
              <text x="225" y="45" className="math-op algo-math-text-22">)</text>
              <text x="235" y="30" className="math-main" style={{ fontSize: '16px', fontStyle: 'normal' }}>4</text>

              <line x1="90" y1="65" x2="260" y2="65" stroke="#1a202c" strokeWidth="1.5" />
              
              {/* Denominador N * σ^4 */}
              <text x="120" y="95" className="math-main algo-math-text-24 algo-math-normal">N</text>
              <text x="145" y="95" className="math-op algo-math-text-24">·</text>
              <text x="165" y="95" className="math-main algo-math-text-24">σ</text>
              <text x="180" y="80" className="math-main" style={{ fontSize: '16px', fontStyle: 'normal' }}>4</text>
            </svg>
          </div>
          <p className="algo-text-sm">Donde <strong>x_i</strong> es cada muestra cruda de aceleración, <strong>μ</strong> es la media (cero natural), <strong>σ</strong> es la Desviación Estándar (aproximadamente el RMS en AC) y <strong>N</strong> es el tamaño del bloque computacional.</p>
        </div>
      </div>

      {/* 2.- LA MAGIA VS RMS */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          2.- ¿Por qué es el mejor espía industrial?
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            La magia pura de la curtosis radica en que es prácticamente <strong>insensible a los cambios masivos de RPM o carga pesada</strong> del motor, pero explota de dolor ante mínimos impactos metálicos como un rodamiento crujiendo.
          </p>
          <div className="algo-info-grid">
            <div className="algo-box-danger">
              <div className="algo-info-card-title" style={{ color: 'inherit' }}>EL FALLO DEL RMS (ENGAÑO)</div>
              <p className="algo-info-card-desc" style={{ color: 'inherit' }}>
                Cuando una bola de rodamiento tiene un <strong>micro-pitting</strong> (una fisura miniatura), choca metálicamente y genera picos violentos. Pero al ser tan cortos (milisegundos), al promediarse matemáticamente bajo raíz cuadrática, <strong>no tienen peso total para mover el RMS general</strong>. La gráfica de daños severos se verá absurdamente "Sana y Verde".
              </p>
            </div>
            <div className="algo-box-warning">
              <div className="algo-info-card-title" style={{ color: 'inherit' }}>LA EXPOSICI&Oacute;N DE LA CURTOSIS</div>
              <p className="algo-info-card-desc" style={{ color: 'inherit' }}>
                Elevamos la ecuaci&oacute;n a la <strong>cuarta potencia (x<sup>4</sup>)</strong>. Los temblores normales suaves (<strong>~= 1</strong>) se mantienen bajos (<strong>1<sup>4</sup> = 1</strong>), pero ese micro pico violento (<strong>~= 10</strong>) explota de inmediato (<strong>10<sup>4</sup> = 10,000</strong>). La campana matem&aacute;tica se deforma y grita la alerta en nuestro panel antes de que la m&aacute;quina siquiera empieza a calentarse.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3.- EJECUCI&Oacute;N PR&Aacute;CTICA */}
      <div className="report-section mb-12">
        <h2 className="algo-section-title">
          3.- La Din&aacute;mica de la Salud Predictiva (El Tablero)
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            Nuestro motor captura bloques ininterrumpidos y exprime los valores <em>K</em> bas&aacute;ndose en las leyes mundiales de predictibilidad de rodamientos de fricci&oacute;n:
          </p>
          
          <div className="algo-card-dark">
             <h4 className="algo-threshold-row mb-1">
                <span className="text-emerald">K=3.0</span> Estado de Salud Plena (Ruido Gausiano Natural)
             </h4>
             <h4 className="algo-threshold-row mb-1">
                <span className="text-amber">K=3.5</span> Alarma de Micro-fisuras incipientes (Warning)
             </h4>
             <h4 className="algo-threshold-row mb-0.5">
                <span className="text-rose">K=10.0</span> Fallo Catastr&oacute;fico del Balero / Impactos puros (Danger)
             </h4>
             <p className="algo-quote">
                "Todo este diagn&oacute;stico visual ahora subyace en la Pesta&ntilde;a Global de Gr&aacute;ficas de M&aacute;quina como un sem&aacute;foro progresivo para tus operadores de mantenimiento, indic&aacute;ndoles: <strong>'Tu m&aacute;quina no vibra a&uacute;n, pero su rodamiento ya se est&aacute; pudriendo por dentro.'</strong>"
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
