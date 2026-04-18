import type { ESPData } from '../../../lib/connection'

type RawViewProps = {
  data: ESPData | null;
};

function RawView({ data }: RawViewProps) {
  return (
    <section>
      <pre style={{ background: '#1e293b', color: '#94a3b8', padding: '1.5rem', borderRadius: '8px', fontSize: '11px', border: '1px solid #334155', maxHeight: '60vh', overflowY: 'auto' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}

export default RawView;
