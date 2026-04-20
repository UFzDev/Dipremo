function RMSView() {
  return (
    <section className="engineering-report" >
      
      {/* Encabezado del Reporte */}
      <header className="algo-header">
        <h1 className="algo-title">
          AN&Aacute;LISIS DEL VALOR CUADR&Aacute;TICO MEDIO (RMS)
        </h1>
        <p className="algo-subtitle">
          Implementaci&oacute;n de M&eacute;trica de Energ&iacute;a y Potencia en Vibraci&oacute;n Mec&aacute;nica
        </p>
      </header>

      {/* 1.- DEFINICI&Oacute;N Y FUNDAMENTO */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          1.- &iquest;Qu&eacute; es el Valor Cuadr&aacute;tico Medio (RMS)?
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            El RMS (Root Mean Square) es una medida estad&iacute;stica de la magnitud de una cantidad variable. En ingenier&iacute;a, se utiliza para obtener un valor constante que represente la potencia o energ&iacute;a de una se&ntilde;al que cambia r&aacute;pidamente en el tiempo.
          </p>
          
          <h3 className="algo-info-card-title">Fundamento Matem&aacute;tico</h3>
          <div className="algo-math-box-lg">
            {/* Ecuaci&oacute;n Vectorial Profesional (SVG Precision) */}
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
              <text x="100" y="60" className="math-main algo-math-normal">=</text>
              
              {/* S&iacute;mbolo de la Ra&iacute;z Cuadrada */}
              <path d="M140 55 L150 95 L175 15 L350 15" fill="none" stroke="#2d3748" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* T&eacute;rmino de Fracci&oacute;n (1/N) */}
              <text x="185" y="42" className="math-main algo-math-text-20">1</text>
              <line x1="182" y1="50" x2="205" y2="50" stroke="#2d3748" strokeWidth="2" />
              <text x="185" y="75" className="math-main algo-math-text-20">N</text>
              
              {/* S&iacute;mbolo de Sumatoria con l&iacute;mites perfectos */}
              <text x="220" y="63" className="math-symbol algo-math-text-50 algo-math-symbol">&Sigma;</text>
              <text x="228" y="88" className="math-main algo-math-text-12 algo-math-normal">i=1</text>
              <text x="232" y="24" className="math-main algo-math-text-12 algo-math-normal">N</text>
              
              {/* Variable y Exponente: x_i^2 */}
              <text x="265" y="60" className="math-main">x<tspan dy="6" className="math-sub">i</tspan><tspan dy="-24" className="algo-math-text-20">2</tspan></text>
            </svg>
          </div>
          
          <p style={{ fontSize: '14px', marginBottom: '1rem' }}>El proceso matem&aacute;tico consta de tres etapas:</p>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '14px', lineHeight: '1.8' }}>
            <li><strong>Cuadrado (Square):</strong> Se eleva cada lectura al cuadrado, asegurando que todos los valores sean positivos.</li>
            <li><strong>Media (Mean):</strong> Se calcula el promedio de los cuadrados en un intervalo de tiempo definido por N.</li>
            <li><strong>Ra&iacute;z (Root):</strong> Se aplica la ra&iacute;z cuadrada para retornar el resultado a las unidades originales de medida.</li>
          </ul>
        </div>
      </div>

      {/* 2.- IMPORTANCIA EN EL PROYECTO */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          2.- Por qu&eacute; es importante en el proyecto
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            La importancia del RMS radica en que es la m&eacute;trica que representa fielmente el contenido energ&eacute;tico de la se&ntilde;al.
          </p>
          <div className="algo-info-grid">
            <div className="algo-box-info">
              <div className="algo-info-card-title" style={{ color: 'inherit' }}>EVITA LA CANCELACI&Oacute;N</div>
              <p className="algo-info-card-desc" style={{ color: 'inherit' }}>Al promediar una vibraci&oacute;n pura, el promedio simple resulta cercano a cero. El RMS asegura que cada movimiento sume a la magnitud total.</p>
            </div>
            <div className="algo-box-success">
              <div className="algo-info-card-title" style={{ color: 'inherit' }}>CONTENIDO ENERG&Eacute;TICO</div>
              <p className="algo-info-card-desc" style={{ color: 'inherit' }}>La energ&iacute;a mec&aacute;nica es proporcional al cuadrado de la amplitud. El RMS es el indicador directo de la energ&iacute;a disipada.</p>
            </div>
            <div className="algo-box-warning">
              <div className="algo-info-card-title" style={{ color: 'inherit' }}>ESTABILIDAD OPERATIVA</div>
              <p className="algo-info-card-desc" style={{ color: 'inherit' }}>A diferencia del valor "Pico", el RMS promedia el comportamiento para detectar cambios reales en la condici&oacute;n mec&aacute;nica.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3.- C&Oacute;MO LO USAREMOS NOSOTROS */}
      <div className="report-section mb-12">
        <h2 className="algo-section-title">
          3.- C&Oacute;MO LO USAREMOS NOSOTROS
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            En el sistema de monitoreo, el RMS se aplica para tres funciones cr&iacute;ticas:
          </p>
          <div className="algo-info-grid">
            <div className="algo-stage-card">
              <strong className="algo-info-card-title">A. Determinaci&oacute;n de la Severidad Vibratoria</strong>
              <p className="algo-info-card-desc">Permite definir el estado de salud de la m&aacute;quina. Un RMS elevado indica la presencia de problemas estructurales reales.</p>
            </div>
            <div className="algo-stage-card">
              <strong className="algo-info-card-title">B. Establecimiento de L&iacute;mites de Alerta</strong>
              <p className="algo-info-card-desc">Acomoda umbrales l&oacute;gicos de operaci&oacute;n: Zonas de funcionamiento normal, alerta por incremento y peligro cr&iacute;tico.</p>
            </div>
            <div className="algo-stage-card">
              <strong className="algo-info-card-title">C. An&aacute;lisis de Tendencias (Trend Analysis)</strong>
              <p className="algo-info-card-desc">Registra la evoluci&oacute;n temporal de la energ&iacute;a. Facilita la predicci&oacute;n de fallas mediante el seguimiento del incremento gradual de vibraci&oacute;n.</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default RMSView;
