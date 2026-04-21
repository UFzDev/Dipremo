
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
            <div className="math-container">
              <span>X(k)</span>
              <span className="math-op">=</span>
              <div className="math-sum">
                <span className="math-sum-limit">N-1</span>
                <span className="math-sum-sym">&Sigma;</span>
                <span className="math-sum-limit">n=0</span>
              </div>
              <span>x(n) &middot; e</span>
              <div className="math-sup" style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', top: '-1em' }}>
                <span>-j</span>
                <div className="math-frac" style={{ fontSize: '0.7em' }}>
                  <span className="math-frac-num" style={{ borderBottomWidth: '1px' }}>2&pi;</span>
                  <span className="math-frac-den">N</span>
                </div>
                <span>kn</span>
              </div>
            </div>
          </div>
          
          <div className="algo-info-grid algo-box-slate" style={{ marginTop: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div><strong className="text-blue-dark">X(k):</strong> Magnitud de señal en frecuencia.</div>
            <div><strong className="text-blue-dark">x(n):</strong> Valor de la muestra en tiempo n.</div>
            <div><strong className="text-blue-dark">e:</strong> Base natural.</div>
            <div><strong className="text-blue-dark">-j:</strong> Unidad imaginaria o rotación.</div>
            <div><strong className="text-blue-dark">2&pi;/N:</strong> Resolución angular por muestra.</div>
            <div><strong className="text-blue-dark">kn:</strong> Producto de índices de correlación.</div>
          </div>
          
          <h3 className="algo-info-card-title" style={{ marginTop: '2rem' }}>El Proceso de Transformación</h3>
          <p className="algo-text">
            Matemáticamente, la FFT correlaciona tu señal de tiempo con una serie de ondas complejas (senoidales). Si la señal "vibra" de forma similar a una de estas ondas, el resultado de la sumatoria explota en un <strong>Pico Espectral</strong>, indicando presencia de energía en esa frecuencia exacta.
          </p>
          
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
