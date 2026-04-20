
function FFTView() {
  return (
    <section className="engineering-report" >
      
      {/* Encabezado del Reporte */}
      <header className="algo-header">
        <h1 className="algo-title">
          TRANSFORMADA RÁPIDA DE FOURIER (FFT)
        </h1>
        <p className="algo-subtitle">
          Análisis Espectral y Detección de Patrones Mecánicos en el Dominio de Frecuencia
        </p>
      </header>

      {/* 1.- FUNDAMENTO MATEMÁTICO */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          1.- Fundamento Matemático
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            La <strong>FFT</strong> es un algoritmo optimizado para calcular la Transformada Discreta de Fourier (DFT). Su principio fundamental es que cualquier señal compleja en el tiempo (como el "ruido" de un motor) puede descomponerse en una suma de ondas senoidales simples de diferentes frecuencias, amplitudes y fases.
          </p>
          
          <h3 className="algo-info-card-title">La Ecuación de Base</h3>
          
          <p className="algo-text">
            Para una serie de <strong>N</strong> muestras de aceleración <strong>x(n)</strong>, el espectro de frecuencias <strong>X(k)</strong> se calcula mediante:
          </p>

          <div className="algo-math-box-lg">
            <svg width="400" height="120" viewBox="0 0 400 120" className="algo-math-svg">
              <defs>
                <style>{`
                  .math-main { font-family: "Times New Roman", Times, serif; font-style: italic; font-size: 32px; fill: #1a202c; }
                  .math-op { font-family: "Times New Roman", Times, serif; font-size: 32px; fill: #1a202c; }
                  .math-sub { font-size: 16px; font-style: normal; }
                  .math-symbol { font-size: 55px; font-weight: 300; fill: #2d3748; font-family: "Times New Roman", Times, serif; }
                  .math-exp { font-size: 20px; font-style: italic; }
                  .math-frac-num { font-size: 16px; }
                `}</style>
              </defs>
              
              {/* X(k) = */}
              <text x="20" y="70" className="math-main">X(k)</text>
              <text x="95" y="70" className="math-op">=</text>
              
              {/* Sumatoria */}
              <text x="140" y="75" className="math-symbol algo-math-text-50">∑</text>
              <text x="145" y="105" className="math-main algo-math-text-14 algo-math-normal">n=0</text>
              <text x="140" y="25" className="math-main algo-math-text-14 algo-math-normal">N-1</text>
              
              {/* Término x(n) * e^-j... */}
              <text x="190" y="70" className="math-main">x(n) · e</text>
              
              {/* Exponente de e */}
              {/* -j */}
              <text x="290" y="35" className="math-exp">-j</text>
              {/* 2pi / N */}
              <text x="316" y="27" className="math-main math-frac-num algo-math-normal">2π</text>
              <line x1="312" y1="32" x2="336" y2="32" stroke="#1a202c" strokeWidth="1.5" />
              <text x="316" y="48" className="math-main algo-math-text-16">N</text>
              {/* kn */}
              <text x="340" y="35" className="math-exp">kn</text>
            </svg>
          </div>
          
          <div className="algo-info-grid algo-box-slate">
            <div><strong className="text-blue-dark">N:</strong> Número total de muestras (debe ser potencia de 2, como 1024 o 2048).</div>
            <div><strong className="text-blue-dark">x(n):</strong> Valor de la aceleración en el dominio del tiempo.</div>
            <div><strong className="text-blue-dark">X(k):</strong> Componente de la señal en la frecuencia determinada por <em>k</em>.</div>
            <div><strong className="text-blue-dark">e<sup>-j...</sup>:</strong> Representa la rotación en el plano complejo, necesaria para extraer la fase y la amplitud.</div>
          </div>
          
          <h3 className="algo-info-card-title">El Proceso de Optimización</h3>
          <p className="algo-text">
            La DFT original requiere <strong>N<sup>2</sup></strong> operaciones. La FFT (algoritmo de Cooley-Tukey) reduce esto a <strong>N log<sub>2</sub> N</strong>. Para un bloque de 1024 datos, pasamos de 1,048,576 operaciones a solo 10,240. Esta eficiencia matemática es lo que permite que el análisis espectral ocurra en "tiempo real".
          </p>
        </div>
      </div>

      {/* 2.- IMPORTANCIA */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          2.- ¿Por qué es importante?
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            En el mantenimiento industrial, el dominio del tiempo indica que la máquina vibra anormalmente, pero no indica <em>por qué</em>. La importancia de la FFT radica en la visualización de la <strong>Firma Vibratoria</strong>:
          </p>
          <div className="algo-info-grid">
            <div className="algo-box-danger">
              <div className="algo-info-card-title">AISLAMIENTO DE FALLAS</div>
              <p className="algo-info-card-desc">Los problemas mecánicos no ocurren al azar; tienen "domicilios" fijos predecibles en el espectro de frecuencias analizado.</p>
            </div>
            <div className="algo-box-success">
              <div className="algo-info-card-title">DETECCIÓN PRECOZ</div>
              <p className="algo-info-card-desc">Fallas incipientes (ej. rodamientos) generan señales muy débiles que el RMS omite, pero en la FFT saltan como picos aislados de alta frecuencia.</p>
            </div>
            <div className="algo-box-warning">
              <div className="algo-info-card-title">LIMPIEZA DE DATOS</div>
              <p className="algo-info-card-desc">Permite ignorar el ruido eléctrico a 50/60Hz o vibraciones de fondo parásitas de otras máquinas que alteran la lectura del motor objetivo.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3.- FLUJO DE APLICACIÓN */}
      <div className="report-section mb-12">
        <h2 className="algo-section-title">
          3.- ¿Cómo lo vamos a usar? (Flujo de Aplicación)
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            El análisis FFT sigue un proceso de cuatro etapas críticas para convertir datos crudos en un diagnóstico automático:
          </p>
          <div className="algo-list-grid">
            
            {/* Stage A */}
            <div className="algo-stage-card border-violet">
              <strong className="algo-stage-header">
                <span className="algo-stage-badge bg-violet">A</span>
                Ventaneo (Windowing)
              </strong>
              <p className="algo-info-card-desc">
                Antes de aplicar la fórmula, los datos se multiplican por una función (como la Ventana de Hanning). Esto es vital porque la FFT asume que la señal es infinita y periódica. El ventaneo suaviza los bordes para prevenir errores de "filtración espectral" (leakage).
              </p>
            </div>

            {/* Stage B */}
            <div className="algo-stage-card border-blue">
              <strong className="algo-stage-header">
                <span className="algo-stage-badge bg-blue">B</span>
                Cálculo de Magnitud
              </strong>
              <p className="algo-info-card-desc">
                El resultado inicial son números complejos. Para la gráfica del espectro, obtenemos la Magnitud matemática calculando el módulo pitagórico: <code className="algo-code-box" style={{ padding: '2px 6px', display: 'inline', margin: 0 }}>|X(k)| = &(Re<sup>2</sup> + Im<sup>2</sup>)</code>
              </p>
            </div>

            {/* Stage C */}
            <div className="algo-stage-card border-cyan">
              <strong className="algo-stage-header">
                <span className="algo-stage-badge bg-cyan">C</span>
                Mapeo de Frecuencias (Eje X)
              </strong>
              <p className="algo-info-card-desc">
                Cada "bin" del resultado corresponde a una frecuencia. La resolución <strong>&Delta;f</strong> de la gráfica es <code className="algo-code-box" style={{ padding: '2px 6px', display: 'inline', margin: 0 }}>Fs / N</code>. Si procesamos con 1024 puntos a 1000 Hz, cada barra representará bloques miniatura de espectro de aproximadamente 0.97 Hz.
              </p>
            </div>

            {/* Stage D */}
            <div className="algo-stage-card border-emerald">
              <strong className="algo-stage-header">
                <span className="algo-stage-badge bg-emerald">D</span>
                Identificación de Patrones
              </strong>
              <div className="algo-info-card-desc">
                Finalmente, cruzamos los picos detectados con las cinemáticas mecánicas intrínsecas:
                <ul className="algo-list">
                  <li><strong>Pico 1X (RPM):</strong> Fuerte indicador de desbalanceo de masa.</li>
                  <li><strong>Pico 2X:</strong> Probable desalineación de ejes u holladuras en poleas.</li>
                  <li><strong>Armónicos Múltiples (1X, 2X, 3X...):</strong> Común en estados de holgura mecánica estructural.</li>
                  <li><strong>Bandas de Alta Frecuencia ("Alfombras"):</strong> Fallas inminentes de fricción o estrés de materiales en rodamientos.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}

export default FFTView;
