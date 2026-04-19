import { useState, useEffect, useMemo } from 'react';
import { ChartEngine } from '../../../../lib/utils/chart-engine';
import { NormalizationEngine } from '../../../../lib/algorithms/Normalization';
import { type ESPData } from '../../../../lib/connection';
import BaseChart from './BaseChart';

type VibrationChartProps = {
  latestSample: ESPData | null;
  axis: 'x' | 'y' | 'z';
  label: string;
  color: string;
  unit?: string;
};

function VibrationChart({ latestSample, axis, label, color, unit = 'LSB' }: VibrationChartProps) {
  // Parámetros de vista del gráfico
  const width = 800;
  const height = 120;
  const WINDOW_SIZE = 100;

  // Búfer local interno (Solo 100 puntos)
  const [windowData, setWindowData] = useState<number[]>(new Array(WINDOW_SIZE).fill(0));

  // Inyección de datos en tiempo real (Velocidad Nativa del Sensor)
  useEffect(() => {
    if (!latestSample) return;

    // 1. Normalizamos solo el nuevo punto entrante
    const normalizedPoint = NormalizationEngine.processSample(latestSample);
    const newValue = normalizedPoint[axis];

    // 2. Actualizamos el búfer de ventana (Empujamos nuevo, quitamos viejo)
    setWindowData(prev => {
      const next = [...prev, newValue];
      if (next.length > WINDOW_SIZE) return next.slice(1);
      return next;
    });
  }, [latestSample, axis]);

  // Generación de puntos SVG ultra-ligera
  const points = useMemo(() => {
    return ChartEngine.generatePolylinePoints(
      windowData, 
      { width, height }, 
      { min: -512, max: 512 }
    );
  }, [windowData]);

  return (
    <BaseChart 
      label={label}
      color={color}
      points={points}
      valueDisplay={
        <span style={{ color, fontWeight: 900 }}>
          {windowData[windowData.length - 1]?.toFixed(0) || '0'} <small style={{ fontSize: '8px', color: '#475569' }}>{unit}</small>
        </span>
      }
    />
  );
}

export default VibrationChart;
