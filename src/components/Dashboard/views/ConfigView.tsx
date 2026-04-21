type ConfigViewProps = {
  motorRpm: number;
  setMotorRpm: (rpm: number) => void;
  vibeLimits: { minX: number; maxX: number; minY: number; maxY: number; minZ: number; maxZ: number };
  setVibeLimits: (val: any) => void;
  rmsPeaks: { x: number; y: number; z: number; res: number };
  setRmsPeaks: (val: any) => void;
  fftRange: { minHz: number; maxHz: number };
  setFftRange: (val: any) => void;
};

function ConfigView({ 
  motorRpm, setMotorRpm, 
  vibeLimits, setVibeLimits,
  rmsPeaks, setRmsPeaks,
  fftRange, setFftRange
}: ConfigViewProps) {

  const labelStyle: React.CSSProperties = { 
    display: 'block', 
    fontSize: '11px', 
    fontWeight: 800, 
    color: 'var(--text-muted)', 
    textTransform: 'uppercase', 
    marginBottom: '0.5rem',
    letterSpacing: '0.05em'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem',
    fontSize: '13px',
    fontWeight: 600,
    borderRadius: '6px',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-main)',
    outline: 'none',
    background: 'var(--bg-card)'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 800,
    color: 'var(--text-main)',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderLeft: '4px solid var(--primary)',
    paddingLeft: '0.75rem'
  };

  return (
    <div className="config-view" style={{ padding: '2rem', animation: 'fadeIn 0.5s ease-out', maxWidth: '1000px' }}>
      <header className="algo-header" style={{ marginBottom: '2rem' }}>
        <h1 className="algo-title-sm">Configuraci&oacute;n de Instrumentaci&oacute;n</h1>
        <p className="algo-subtitle">Calibraci&oacute;n de l&iacute;mites y picos operativos del sistema DIPREMO.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* SECCIÓN 1: MOTOR BÁSICO */}
        <section>
          <h3 style={sectionTitleStyle}>Par&aacute;metros del Motor</h3>
          <div className="algo-card-light" style={{ padding: '1.5rem' }}>
            <label style={labelStyle}>Velocidad de giro (Nominal)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input 
                type="number" 
                value={motorRpm === 0 ? '' : motorRpm}
                onChange={(e) => setMotorRpm(e.target.value === '' ? 0 : parseInt(e.target.value, 10))}
                style={{ ...inputStyle, width: '120px' }}
              />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>RPM</span>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: RANGO FFT */}
        <section>
          <h3 style={sectionTitleStyle}>An&aacute;lisis Espectral (FFT)</h3>
          <div className="algo-card-light" style={{ padding: '1.5rem', display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>M&iacute;nimo Hz</label>
              <input 
                type="number" 
                value={fftRange.minHz}
                onChange={(e) => setFftRange({ ...fftRange, minHz: parseFloat(e.target.value) || 0 })}
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>M&aacute;ximo Hz</label>
              <input 
                type="number" 
                value={fftRange.maxHz}
                onChange={(e) => setFftRange({ ...fftRange, maxHz: parseFloat(e.target.value) || 0 })}
                style={inputStyle}
              />
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: MONITOR TRIAXIAL */}
        <section style={{ gridColumn: '1 / -1' }}>
          <h3 style={sectionTitleStyle}>L&iacute;mites Monitor Triaxial (Normalizaci&oacute;n)</h3>
          <div className="algo-card-light" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div>
              <label style={{ ...labelStyle, color: 'var(--error)' }}>Eje X (Min / Max)</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="number" value={vibeLimits.minX} onChange={(e) => setVibeLimits({ ...vibeLimits, minX: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                <input type="number" value={vibeLimits.maxX} onChange={(e) => setVibeLimits({ ...vibeLimits, maxX: parseFloat(e.target.value) || 0 })} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{ ...labelStyle, color: 'var(--success)' }}>Eje Y (Min / Max)</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="number" value={vibeLimits.minY} onChange={(e) => setVibeLimits({ ...vibeLimits, minY: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                <input type="number" value={vibeLimits.maxY} onChange={(e) => setVibeLimits({ ...vibeLimits, maxY: parseFloat(e.target.value) || 0 })} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{ ...labelStyle, color: 'var(--primary)' }}>Eje Z (Min / Max)</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="number" value={vibeLimits.minZ} onChange={(e) => setVibeLimits({ ...vibeLimits, minZ: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                <input type="number" value={vibeLimits.maxZ} onChange={(e) => setVibeLimits({ ...vibeLimits, maxZ: parseFloat(e.target.value) || 0 })} style={inputStyle} />
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: TENDENCIA ENERGÉTICA */}
        <section style={{ gridColumn: '1 / -1' }}>
          <h3 style={sectionTitleStyle}>Picos Máximos Tendencia Energ&eacute;tica (RMS)</h3>
          <div className="algo-card-light" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Pico X</label>
              <input type="number" value={rmsPeaks.x} onChange={(e) => setRmsPeaks({ ...rmsPeaks, x: parseFloat(e.target.value) || 0 })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Pico Y</label>
              <input type="number" value={rmsPeaks.y} onChange={(e) => setRmsPeaks({ ...rmsPeaks, y: parseFloat(e.target.value) || 0 })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Pico Z</label>
              <input type="number" value={rmsPeaks.z} onChange={(e) => setRmsPeaks({ ...rmsPeaks, z: parseFloat(e.target.value) || 0 })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Pico Resultante</label>
              <input type="number" value={rmsPeaks.res} onChange={(e) => setRmsPeaks({ ...rmsPeaks, res: parseFloat(e.target.value) || 0 })} style={inputStyle} />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default ConfigView;
