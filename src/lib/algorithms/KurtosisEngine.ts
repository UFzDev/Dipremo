import { type ESPData } from '../connection';
import { NormalizationEngine } from './Normalization';

export type KurtosisData = {
  kurtosisX: number;
  kurtosisY: number;
  kurtosisZ: number;
  timestamp: number;
  sampleRateHz: number;
};

export class KurtosisEngine {
  private static readonly WINDOW_SIZE = 512; // Cantidad estadística de muestras por bloque
  private static readonly HPF_ALPHA = 0.75; // Filtro Pasa-Altas ultra agresivo (~50 Hz)

  // Buffers de recolección temporal
  private static bufferX: number[] = [];
  private static bufferY: number[] = [];
  private static bufferZ: number[] = [];

  // Filtro HPF interactivo
  private static filterX = 0;
  private static filterY = 0;
  private static filterZ = 0;
  private static lastRawX = 0;
  private static lastRawY = 0;
  private static lastRawZ = 0;
  private static isInitialized = false;

  public static addSample(sample: ESPData): KurtosisData | null {
    // Tomamos la señal base limpia del DC Blocker
    const aClean = NormalizationEngine.processSample(sample);

    if (!this.isInitialized) {
      this.lastRawX = aClean.x;
      this.lastRawY = aClean.y;
      this.lastRawZ = aClean.z;
      this.isInitialized = true;
      return null;
    }

    // Filtro Pasa-Altas Matemático (HPF: High-Pass Filter):
    // Elimina de raíz las frecuencias lentas causadas por manos (< 50 Hz).
    // Deja pasar únicamente impactos rápidos, secos y agudos de un rodamiento roto.
    this.filterX = this.HPF_ALPHA * (this.filterX + aClean.x - this.lastRawX);
    this.filterY = this.HPF_ALPHA * (this.filterY + aClean.y - this.lastRawY);
    this.filterZ = this.HPF_ALPHA * (this.filterZ + aClean.z - this.lastRawZ);

    this.lastRawX = aClean.x;
    this.lastRawY = aClean.y;
    this.lastRawZ = aClean.z;

    this.bufferX.push(this.filterX);
    this.bufferY.push(this.filterY);
    this.bufferZ.push(this.filterZ);

    if (this.bufferX.length >= this.WINDOW_SIZE) {
      const result: KurtosisData = {
        kurtosisX: this.calculateKurtosis(this.bufferX),
        kurtosisY: this.calculateKurtosis(this.bufferY),
        kurtosisZ: this.calculateKurtosis(this.bufferZ),
        timestamp: Date.now(),
        sampleRateHz: sample.sample_rate_hz || 1000
      };

      // Vaciamos el pipeline para el siguiente bloque diagnóstico
      this.bufferX = [];
      this.bufferY = [];
      this.bufferZ = [];

      return result;
    }

    return null;
  }

  /**
   * Cálculo del Cuarto Momento Estadístico (Curtosis)
   * Formula: [ 1/N * Σ(x - μ)^4 ] / σ^4
   * Complejidad: O(N) un loop de paso doble (Promedio y Varianza/Curtosis combinada)
   */
  private static calculateKurtosis(values: number[]): number {
    const n = values.length;
    if (n < 4) return 3.0; // Evitar disparates en muestras incompletas

    // 1. Calcular Media (μ)
    let sum = 0;
    for (let i = 0; i < n; i++) sum += values[i];
    const mean = sum / n;

    // 2. Calcular Varianza (σ^2) y Cuarto Momento Desviado
    let varianceSum = 0;
    let fourthMomentSum = 0;

    for (let i = 0; i < n; i++) {
        const diff = values[i] - mean;
        const diffSq = diff * diff;
        varianceSum += diffSq;
        fourthMomentSum += (diffSq * diffSq); // diff^4
    }

    const variance = varianceSum / n;
    
    // Safety check para divisor por casi cero (ruido absoluto muerto)
    if (variance < 0.0000001) return 3.0; 

    const m4 = fourthMomentSum / n;
    const standardKurtosis = m4 / (variance * variance);

    // Retorna la "Excess Kurtosis + 3" standard = Curtosis Pura (Gaussiana Normal = 3.0)
    return standardKurtosis;
  }

  public static reset() {
    this.bufferX = [];
    this.bufferY = [];
    this.bufferZ = [];
    this.filterX = 0;
    this.filterY = 0;
    this.filterZ = 0;
    this.isInitialized = false;
  }
}
