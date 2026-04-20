
function FFTView() {
  return (
    <section className="engineering-report" style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1000px', margin: '0 auto', textAlign: 'left', color: '#1a202c', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Encabezado del Reporte */}
      <header style={{ borderBottom: '3px solid #2d3748', paddingBottom: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          TRANSFORMADA RÁPIDA DE FOURIER (FFT)
        </h1>
        <p style={{ marginTop: '0.75rem', fontSize: '16px', fontWeight: 500, color: '#4a5568' }}>
          Análisis Espectral y Detección de Patrones Mecánicos en el Dominio de Frecuencia
        </p>
      </header>

      {/* 1.- FUNDAMENTO MATEMÁTICO */}
      <div className="report-section mb-12" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          1.- Fundamento Matemático
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            La <strong>FFT</strong> es un algoritmo optimizado para calcular la Transformada Discreta de Fourier (DFT). Su principio fundamental es que cualquier señal compleja en el tiempo (como el "ruido" de un motor) puede descomponerse en una suma de ondas senoidales simples de diferentes frecuencias, amplitudes y fases.
          </p>
          
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '1.5rem', color: '#4a5568' }}>La Ecuación de Base</h3>
          
          <p style={{ fontSize: '14px', marginBottom: '1.5rem' }}>
            Para una serie de <strong style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '16px' }}>N</strong> muestras de aceleración <strong style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '16px' }}>x(n)</strong>, el espectro de frecuencias <strong style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '16px' }}>X(k)</strong> se calcula mediante:
          </p>

          <div style={{ 
            padding: '3rem 2rem', 
            background: '#ffffff', 
            borderRadius: '12px', 
            textAlign: 'center', 
            marginBottom: '2rem', 
            border: '1px solid #e2e8f0',
            boxShadow: 'inset 0 1px 4px 0 rgba(0,0,0,0.03)'
          }}>
            <svg width="400" height="120" viewBox="0 0 400 120" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
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
              <text x="140" y="75" className="math-symbol">∑</text>
              <text x="145" y="105" className="math-main" style={{ fontSize: '14px', fontStyle: 'normal' }}>n=0</text>
              <text x="140" y="25" className="math-main" style={{ fontSize: '14px', fontStyle: 'normal' }}>N-1</text>
              
              {/* Término x(n) * e^-j... */}
              <text x="190" y="70" className="math-main">x(n) · e</text>
              
              {/* Exponente de e */}
              {/* -j */}
              <text x="290" y="35" className="math-exp">-j</text>
              {/* 2pi / N */}
              <text x="316" y="27" className="math-main math-frac-num" style={{ fontStyle: 'normal' }}>2π</text>
              <line x1="312" y1="32" x2="336" y2="32" stroke="#1a202c" strokeWidth="1.5" />
              <text x="316" y="48" className="math-main" style={{ fontSize: '16px' }}>N</text>
              {/* kn */}
              <text x="340" y="35" className="math-exp">kn</text>
            </svg>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '14px', background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
            <div><strong style={{ color: '#2b6cb0' }}>N:</strong> Número total de muestras (debe ser potencia de 2, como 1024 o 2048).</div>
            <div><strong style={{ color: '#2b6cb0' }}>x(n):</strong> Valor de la aceleración en el dominio del tiempo.</div>
            <div><strong style={{ color: '#2b6cb0' }}>X(k):</strong> Componente de la señal en la frecuencia determinada por <em>k</em>.</div>
            <div><strong style={{ color: '#2b6cb0' }}>e<sup>-j...</sup>:</strong> Representa la rotación en el plano complejo, necesaria para extraer la fase y la amplitud.</div>
          </div>
          
          <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '2rem 0 1rem 0', color: '#4a5568' }}>El Proceso de Optimización</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
            La DFT original requiere <strong>N²</strong> operaciones. La FFT (algoritmo de Cooley-Tukey) reduce esto a <strong>N log₂ N</strong>. Para un bloque de 1024 datos, pasamos de 1,048,576 operaciones a solo 10,240. Esta eficiencia matemática es lo que permite que el análisis espectral ocurra en "tiempo real".
          </p>
        </div>
      </div>

      {/* 2.- IMPORTANCIA */}
      <div className="report-section mb-12" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          2.- ¿Por qué es importante?
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            En el mantenimiento industrial, el dominio del tiempo indica que la máquina vibra anormalmente, pero no indica <em>por qué</em>. La importancia de la FFT radica en la visualización de la <strong>Firma Vibratoria</strong>:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div style={{ padding: '1.25rem', background: '#fff1f2', borderRadius: '8px', border: '1px solid #ffe4e6' }}>
              <div style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '12px', color: '#e11d48' }}>AISLAMIENTO DE FALLAS</div>
              <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#4a5568' }}>Los problemas mecánicos no ocurren al azar; tienen "domicilios" fijos predecibles en el espectro de frecuencias analizado.</div>
            </div>
            <div style={{ padding: '1.25rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7' }}>
              <div style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '12px', color: '#16a34a' }}>DETECCIÓN PRECOZ</div>
              <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#4a5568' }}>Fallas incipientes (ej. rodamientos) generan señales muy débiles que el RMS omite, pero en la FFT saltan como picos aislados de alta frecuencia.</div>
            </div>
            <div style={{ padding: '1.25rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
              <div style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '12px', color: '#d97706' }}>LIMPIEZA DE DATOS</div>
              <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#4a5568' }}>Permite ignorar el ruido eléctrico a 50/60Hz o vibraciones de fondo parásitas de otras máquinas que alteran la lectura del motor objetivo.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.- FLUJO DE APLICACIÓN */}
      <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          3.- ¿Cómo lo vamos a usar? (Flujo de Aplicación)
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            El análisis FFT sigue un proceso de cuatro etapas críticas para convertir datos crudos en un diagnóstico automático:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.5rem' }}>
            
            {/* Stage A */}
            <div style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderLeft: '4px solid #8b5cf6', borderRadius: '8px' }}>
              <strong style={{ fontSize: '14px', marginBottom: '0.5rem', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '24px', height: '24px', background: '#8b5cf6', color: '#fff', borderRadius: '50%', textAlign: 'center', lineHeight: '24px', fontSize: '12px' }}>A</span>
                Ventaneo (Windowing)
              </strong>
              <div style={{ fontSize: '14px', color: '#4a5568', lineHeight: '1.6' }}>
                Antes de aplicar la fórmula, los datos se multiplican por una función (como la Ventana de Hanning). Esto es vital porque la FFT asume que la señal es infinita y periódica. El ventaneo suaviza los bordes para prevenir errores de "filtración espectral" (leakage).
              </div>
            </div>

            {/* Stage B */}
            <div style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderLeft: '4px solid #3b82f6', borderRadius: '8px' }}>
              <strong style={{ fontSize: '14px', marginBottom: '0.5rem', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '24px', height: '24px', background: '#3b82f6', color: '#fff', borderRadius: '50%', textAlign: 'center', lineHeight: '24px', fontSize: '12px' }}>B</span>
                Cálculo de Magnitud
              </strong>
              <div style={{ fontSize: '14px', color: '#4a5568', lineHeight: '1.6' }}>
                El resultado inicial son números complejos. Para la gráfica del espectro, obtenemos la Magnitud matemática calculando el módulo pitagórico: <strong style={{ fontFamily: 'monospace', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', letterSpacing: '0.05em' }}>|X(k)| = √(Re² + Im²)</strong>
              </div>
            </div>

            {/* Stage C */}
            <div style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderLeft: '4px solid #06b6d4', borderRadius: '8px' }}>
              <strong style={{ fontSize: '14px', marginBottom: '0.5rem', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '24px', height: '24px', background: '#06b6d4', color: '#fff', borderRadius: '50%', textAlign: 'center', lineHeight: '24px', fontSize: '12px' }}>C</span>
                Mapeo de Frecuencias (Eje X)
              </strong>
              <div style={{ fontSize: '14px', color: '#4a5568', lineHeight: '1.6' }}>
                Cada "bin" del resultado corresponde a una frecuencia. La resolución <strong style={{ fontFamily: 'serif', fontStyle: 'italic' }}>Δf</strong> de la gráfica es <strong style={{ fontFamily: 'monospace', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>Fs / N</strong>. Si procesamos con 1024 puntos a 1000 Hz, cada barra representará bloques miniatura de espectro de aproximadamente 0.97 Hz.
              </div>
            </div>

            {/* Stage D */}
            <div style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderLeft: '4px solid #10b981', borderRadius: '8px' }}>
              <strong style={{ fontSize: '14px', marginBottom: '0.5rem', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '24px', height: '24px', background: '#10b981', color: '#fff', borderRadius: '50%', textAlign: 'center', lineHeight: '24px', fontSize: '12px' }}>D</span>
                Identificación de Patrones
              </strong>
              <div style={{ fontSize: '14px', color: '#4a5568', lineHeight: '1.6' }}>
                Finalmente, cruzamos los picos detectados con las cinemáticas mecánicas intrínsecas:
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li><strong style={{ color: '#0f172a' }}>Pico 1X (RPM):</strong> Fuerte indicador de desbalanceo de masa.</li>
                  <li><strong style={{ color: '#0f172a' }}>Pico 2X:</strong> Probable desalineación de ejes u holladuras en poleas.</li>
                  <li><strong style={{ color: '#0f172a' }}>Armónicos Múltiples (1X, 2X, 3X...):</strong> Común en estados de holgura mecánica estructural.</li>
                  <li><strong style={{ color: '#0f172a' }}>Bandas de Alta Frecuencia ("Alfombras"):</strong> Fallas inminentes de fricción o estrés de materiales en rodamientos.</li>
                </ul>
              </div>
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

export default FFTView;
