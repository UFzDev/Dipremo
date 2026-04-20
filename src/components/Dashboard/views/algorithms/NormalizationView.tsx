import { type ESPData } from '../../../../lib/connection'

type NormalizationViewProps = {
  history: ESPData[];
};

function NormalizationView({}: NormalizationViewProps) {
  return (
    <section className="engineering-report" style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1000px', margin: '0 auto', textAlign: 'left', color: '#1a202c', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Encabezado del Reporte */}
      <header style={{ borderBottom: '3px solid #2d3748', paddingBottom: '2rem', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          ALGORITMO DE ZEROING (DC BLOCKER)
        </h1>
        <p style={{ marginTop: '0.75rem', fontSize: '16px', fontWeight: 500, color: '#4a5568' }}>
          Restador Dinámico de Gravedad y Orientación mediante Leaky Integrator
        </p>
      </header>

      {/* 1.- EL PROBLEMA DE LA GRAVEDAD */}
      <div className="report-section mb-12" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          1.- El Problema del Acelerómetro: Gravedad Estática (DC)
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Cualquier acelerómetro (como el integrado en la placa) obedece a las leyes galileanas, reportando no solo la perturbación mecánica externa, sino también una fuerza invisible y constante: <strong>la Gravedad Terrestre (+1G / 9.8 m/s²)</strong>.
          </p>
          
          <div style={{ padding: '1.5rem', background: '#fff1f2', borderRadius: '8px', border: '1px solid #ffe4e6', display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
             <div style={{ fontSize: '2rem' }}>🌍</div>
             <div>
               <strong style={{ display: 'block', color: '#e11d48', fontSize: '14px', marginBottom: '0.25rem' }}>CALIBRACIÓN INÚTIL POR POSICIÓN</strong>
               <div style={{ fontSize: '14px', color: '#881337', lineHeight: '1.6' }}>
                  Restarle "valores fijos numéricos" a la señal nunca funcionará en la vida industrial. Si el módulo se rota apenas 90 grados en su instalación, la gravedad caerá en un eje distinto (pasando, por ejemplo, del Eje Z al Eje X) e inmediatamente marcará picos gigantes imaginarios porque el ajuste estático guardado ahora es obsoleto.
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* 2.- LA SOLUCIÓN INTELIGENTE */}
      <div className="report-section mb-12" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          2.- La Solución DC Blocker (Filtro Adaptativo)
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            El sistema DIPREMO aborda esto con un High-Pass DC Blocker implementado matemáticamente mediante un EMA (Exponential Moving Average o <em>Leaky Integrator</em>). Su objetivo es purificar las frecuencias basándose en un principio dicotómico simple:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.5rem', border: '1px solid #e2e8f0', borderTop: '4px solid #64748b', borderRadius: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem' }}>SÍNTOMA ESTÁTICO (DIRECTA)</div>
              <strong style={{ fontSize: '16px', display: 'block', marginBottom: '0.5rem', color: '#334155' }}>Vectores de Gravedad y Postura</strong>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
                La gravedad nunca tiembla, jala constantemente. Representa una señal invariable (Señal DC). El Filtro Auto-cero extrae constantemente esta base de "piso gravitatorio", promediándola.
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '1.5rem', border: '1px solid #e2e8f0', borderTop: '4px solid #ef4444', borderRadius: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem' }}>SÍNTOMA DINÁMICO (ALTERNA)</div>
              <strong style={{ fontSize: '16px', display: 'block', marginBottom: '0.5rem', color: '#334155' }}>Vibración Real (AC)</strong>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
                La fricción, desbalance y desgaste son perturbaciones mecánicas de altísima velocidad o aceleraciones cíclicas (Señal AC). Esta es la métrica de interés industrial.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.- CÓMO SE CALCULA */}
       <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          3.- Flujo Matemático de Normalización Activa
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Operacionalmente, por cada ráfaga o milisegundo de información entrante, el microprocesador interno ejecuta dos fases de supresión simultáneas:  
          </p>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '12px' }}>
             <h4 style={{ margin: '0 0 1rem 0', fontSize: '13px', color: '#64748b', textTransform: 'uppercase' }}>Paso 1: Adquisición de la Matriz Postural (Low-Pass Filter)</h4>
             <div style={{ fontFamily: 'monospace', fontWeight: 800, background: '#f1f5f9', padding: '1rem', borderRadius: '6px', color: '#0f172a', marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#0ea5e9', marginRight: '0.5rem' }}>Gravity_EMA =</span> (0.98 × Gravity_EMA) + (0.02 × Sensor_Raw)
             </div>

             <h4 style={{ margin: '0 0 1rem 0', fontSize: '13px', color: '#64748b', textTransform: 'uppercase' }}>Paso 2: Aislamiento Vibratorio Puro (High-Pass Sustraction)</h4>
             <div style={{ fontFamily: 'monospace', fontWeight: 800, background: '#eef2ff', padding: '1rem', borderRadius: '6px', color: '#4338ca', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#6366f1', marginRight: '0.5rem' }}>Vibration_Clean =</span> Sensor_Raw - Gravity_EMA
             </div>
          </div>
          <p style={{ fontSize: '13px', marginTop: '1.5rem', textAlign: 'center', color: '#4a5568', padding: '1.25rem', background: '#ecfdf5', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
            <span style={{ fontSize: '18px', marginRight: '5px' }}>✓</span> <strong>RESULTADO GARANTIZADO:</strong> Sin importar cuántas veces desmontes, voltees o ladees el equipo inalámbrico sobre el motor, el algoritmo detecta el giro y, tras una breve etapa de reconvergencia de 1.0 segundos, la gráfica y el análisis volverán de forma autónoma a tu <strong>CERO ABSOLUTO VIBRATORIO</strong> sin requerir botones de calibración humana.
          </p>
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

export default NormalizationView;
