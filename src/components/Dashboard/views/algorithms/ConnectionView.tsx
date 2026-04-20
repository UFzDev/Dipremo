function ConnectionView() {
  return (
    <section className="engineering-report" style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '1000px', margin: '0 auto', textAlign: 'left', color: '#1a202c', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Encabezado del Reporte */}
      <header style={{ borderBottom: '3px solid #2d3748', paddingBottom: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          DIAGNÓSTICO DE INTEGRIDAD DE RED
        </h1>
        <p style={{ marginTop: '0.75rem', fontSize: '16px', fontWeight: 500, color: '#4a5568' }}>
          Validación de flujo de telemetría mediante análisis de paquetes y jitter temporal
        </p>
      </header>

      {/* 1.- FUNDAMENTO TÉCNICO */}
      <div className="report-section mb-12" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0ea5e9', borderLeft: '4px solid #0ea5e9', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          1.- ¿Cómo se calcula la salud de la conexión?
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Dado que el valor RSSI de hardware puede ser impreciso o nulo en entornos industriales, implementamos un diagnóstico basado en la **Integridad de la Secuencia**. Cada paquete de datos enviado por la ESP32 viaja con un número de serie único e incremental.
          </p>

          <p style={{ fontSize: '15px', lineHeight: '1.7' }}>
            Al recibir los datos, el sistema detecta de forma inmediata cualquier interrupción en la secuencia (por ejemplo, si el último paquete recibido fue el 100 y el actual es el 110, se registra una pérdida de 9 paquetes). Esta relación entre paquetes esperados y recibidos nos permite determinar la **eficiencia real del enlace de datos** independientemente de la potencia de la señal de radio.
          </p>
        </div>
      </div>

      {/* 2.- IMPACTO INDUSTRIAL */}
      <div className="report-section mb-12" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0ea5e9', borderLeft: '4px solid #0ea5e9', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          2.- ¿Por qué es vital este diagnóstico?
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Un flujo de datos interrumpido o "pausado" contamina los algoritmos matemáticos más que el propio ruido del sensor:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem', fontSize: '13px' }}>ARTEFACTOS EN LA FFT</div>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                La FFT asume una señal continua. Los huecos en la red actúan como "golpes" matemáticos que ensucian el espectro, creando picos falsos en altas frecuencias.
              </p>
            </div>
            <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem', fontSize: '13px' }}>DERIVA POR JITTER</div>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                Las variaciones en el tiempo de llegada (Jitter) alteran el cálculo de la integral de velocidad, provocando que los medidores ISO se vuelvan inestables.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 3.- APLICACIÓN DEL DIAGNÓSTICO */}
      <div className="report-section mb-12">
        <h2 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0ea5e9', borderLeft: '4px solid #0ea5e9', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
          3.- ¿Cómo utilizamos la salud de conexión?
        </h2>
        <div style={{ paddingLeft: '1.25rem' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            La salud de la conexión no es solo un indicador visual, es una condición de entrada para la validez de los diagnósticos avanzados:
          </p>
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
             <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#1e293b', marginBottom: '1rem' }}>
               **Filtrado de Alertas:** Cuando el sistema detecta una salud de conexión inestable, se activan advertencias de confiabilidad en los indicadores de FFT y Velocidad ISO 10816 para informar al usuario que los niveles de vibración reportados podrían estar siendo influenciados por la intermitencia en la red.
             </p>
             <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#1e293b', marginBottom: '1rem' }}>
               **Ajuste de Visualización:** El dashboard ajusta dinámicamente la frecuencia de refresco de los indicadores para priorizar la estabilidad de las gráficas sobre la inmediatez, suavizando las transiciones para evitar saltos bruscos cuando se detecta Jitter.
             </p>
             <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#1e293b', margin: 0 }}>
               **Protocolo de Mantenimiento:** Una salud por debajo del 60% genera un bloqueo preventivo en la certificación de mediciones, requiriendo que el operario reubique el equipo de recolección de datos antes de proceder con el registro histórico de salud mecánica.
             </p>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '14px', color: '#64748b', fontStyle: 'italic', textAlign: 'center' }}>
            "La integridad de los datos es la base de un diagnóstico mecánico veraz."
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

export default ConnectionView;
