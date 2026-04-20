function ConnectionView() {
  return (
    <section className="engineering-report" >
      
      {/* Encabezado del Reporte */}
      <header className="algo-header">
        <h1 className="algo-title">
          DIAGNÓSTICO DE INTEGRIDAD DE RED
        </h1>
        <p className="algo-subtitle">
          Validación de flujo de telemetría mediante análisis de paquetes y jitter temporal
        </p>
      </header>

      {/* 1.- FUNDAMENTO TÉCNICO */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          1.- ¿Cómo se calcula la salud de la conexión?
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            Dado que el valor RSSI de hardware puede ser impreciso o nulo en entornos industriales, implementamos un diagnóstico basado en la **Integridad de la Secuencia**. Cada paquete de datos enviado por la ESP32 viaja con un número de serie único e incremental.
          </p>

          <p className="algo-text-last">
            Al recibir los datos, el sistema detecta de forma inmediata cualquier interrupción en la secuencia (por ejemplo, si el último paquete recibido fue el 100 y el actual es el 110, se registra una pérdida de 9 paquetes). Esta relación entre paquetes esperados y recibidos nos permite determinar la **eficiencia real del enlace de datos** independientemente de la potencia de la señal de radio.
          </p>
        </div>
      </div>

      {/* 2.- IMPACTO INDUSTRIAL */}
      <div className="algo-section">
        <h2 className="algo-section-title">
          2.- ¿Por qué es vital este diagnóstico?
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
            Un flujo de datos interrumpido o "pausado" contamina los algoritmos matemáticos más que el propio ruido del sensor:
          </p>
          <div className="algo-info-grid">
            <div className="algo-info-card">
              <div className="algo-info-card-title">ARTEFACTOS EN LA FFT</div>
              <p className="algo-info-card-desc">
                La FFT asume una señal continua. Los huecos en la red actúan como "golpes" matemáticos que ensucian el espectro, creando picos falsos en altas frecuencias.
              </p>
            </div>
            <div className="algo-info-card">
              <div className="algo-info-card-title">DERIVA POR JITTER</div>
              <p className="algo-info-card-desc">
                Las variaciones en el tiempo de llegada (Jitter) alteran el cálculo de la integral de velocidad, provocando que los medidores ISO se vuelvan inestables.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 3.- APLICACIÓN DEL DIAGNÓSTICO */}
      <div className="report-section mb-12">
        <h2 className="algo-section-title">
          3.- ¿Cómo utilizamos la salud de conexión?
        </h2>
        <div className="algo-section-content">
          <p className="algo-text">
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
