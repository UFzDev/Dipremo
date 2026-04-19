function NormalizationView() {
  return (
    <section className="engineering-report" style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1000px', margin: '0 auto', textAlign: 'left', color: '#1a202c', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Encabezado del Reporte */}
      <header style={{ borderBottom: '3px solid #2d3748', paddingBottom: '2rem', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          ALGORITMO DE NORMALIZACIÓN A CERO ABSOLUTO
        </h1>
        <p style={{ marginTop: '0.75rem', fontSize: '16px', fontWeight: 500, color: '#4a5568' }}>
          Procedimiento de Compensación de Sesgo para Calibración de Reposo en 0 LSB
        </p>
      </header>

      {/* 1.- VALORES DE LECTURA EN REPOSO */}
      <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          1.- Valores de Lectura Cruda en Reposo Absoluto
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Se definen los valores de referencia (LSB) promediados con el sensor en estado de reposo sobre una mesa plana. Estos valores representan el error estático a neutralizar.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem', background: '#f7fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#718096', marginBottom: '0.5rem' }}>PROMEDIO X (REPOSO)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>-23</div>
            </div>
            <div className="card" style={{ padding: '1.5rem', background: '#f7fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#718096', marginBottom: '0.5rem' }}>PROMEDIO Y (REPOSO)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>15</div>
            </div>
            <div className="card" style={{ padding: '1.5rem', background: '#f7fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#718096', marginBottom: '0.5rem' }}>PROMEDIO Z (REPOSO)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>-250</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2.- DEFINICIÓN DE OFFSETS */}
      <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          2.- Definición de Offsets de Calibración
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            El Offset es simplemente la magnitud del error estático medida en cada eje durante el estado de reposo horizontal.
          </p>
          <div style={{ background: '#1a202c', color: '#ebf8ff', padding: '1.5rem', borderRadius: '8px', fontFamily: '"JetBrains Mono", monospace', fontSize: '14px', lineHeight: '2.5' }}>
            <div style={{ borderBottom: '1px solid #2d3748', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
              <strong>Offset_X</strong> = -23.0
            </div>
            <div style={{ borderBottom: '1px solid #2d3748', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
              <strong>Offset_Y</strong> = 15.0
            </div>
            <div>
              <strong>Offset_Z</strong> = -250.0
            </div>
          </div>
        </div>
      </div>

      {/* 3.- ECUACIONES DE COMPENSACIÓN */}
      <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2b6cb0', borderLeft: '4px solid #2b6cb0', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          3.- Ecuaciones de Normalización (Suma/Resta Compensatoria)
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.25rem' }}>
            A cada dato crudo entrante se le sustrae el offset. Al restar un sesgo negativo, la operación se convierte en una suma, logrando el cero perfecto en reposo.
          </p>
          <div className="card" style={{ background: '#f0f9ff', border: '1px solid #bee3f8', padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', fontFamily: '"JetBrains Mono", monospace', fontSize: '14px', fontWeight: 700 }}>
               <div style={{ padding: '0.75rem', background: 'white', borderRadius: '4px', border: '1px solid #d1e9f9' }}>
                  X_cal = X_raw - (-23.0) → <strong>X_raw + 23.0</strong>
               </div>
               <div style={{ padding: '0.75rem', background: 'white', borderRadius: '4px', border: '1px solid #d1e9f9' }}>
                  Y_cal = Y_raw - (15.0)  → <strong>Y_raw - 15.0</strong>
               </div>
               <div style={{ padding: '0.75rem', background: 'white', borderRadius: '4px', border: '1px solid #d1e9f9' }}>
                  Z_cal = Z_raw - (-250.0) → <strong>Z_raw + 250.0</strong>
               </div>
            </div>
          </div>
          <p style={{ fontSize: '13px', marginTop: '1.5rem', textAlign: 'center', color: '#4a5568', padding: '1rem', background: '#f7fafc', borderRadius: '6px' }}>
            Resultado esperado en reposo sobre mesa: <strong>X_cal = 0, Y_cal = 0, Z_cal = 0.</strong>
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
