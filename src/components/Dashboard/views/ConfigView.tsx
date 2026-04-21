type ConfigViewProps = {
  motorRpm: number;
  setMotorRpm: (rpm: number) => void;
};

function ConfigView({ motorRpm, setMotorRpm }: ConfigViewProps) {
  return (
    <div className="algo-section" style={{ maxWidth: '400px' }}>
      <header className="algo-header">
        <h1 className="algo-title-sm">Configuraci&oacute;n</h1>
      </header>

      <div className="algo-section-content">
        <div className="algo-card-light" style={{ padding: '1.5rem' }}>
          <label 
            style={{ 
              display: 'block', 
              fontSize: '13px', 
              fontWeight: 800, 
              color: '#1e293b', 
              textTransform: 'uppercase', 
              marginBottom: '0.75rem'
            }}
          >
            Velocidad de giro
          </label>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input 
              type="number" 
              value={motorRpm === 0 ? '' : motorRpm}
              onChange={(e) => {
                const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                setMotorRpm(val);
              }}
              placeholder="0"
              style={{
                width: '120px',
                padding: '0.5rem 0.75rem',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                color: '#1e293b',
                outline: 'none focus:border-blue-500'
              }}
            />
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#64748b' }}>RPM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfigView;
