import { type ESPData } from '../connection';
import { NormalizationEngine } from './Normalization';

export type VelocityRMSData = {
  vRmsX: number;
  vRmsY: number;
  vRmsZ: number;
  vRmsRes: number;
  timestamp: number;
  sampleRateHz: number;
};

export class IntegrationEngine {
  private static readonly WINDOW_SIZE = 100; // Cálculo de vRMS cada 100 muestras
  // LSB del sensor acelerómetro a Gravedad pura (ADXL345 Full Res = 0.0039g/LSB)
  // Luego Gravedad a Aceleración: * 9806.65 mm/s²
  // 0.0039 * 9806.65 = 38.2459
  private static readonly LSB_TO_MMS2 = 38.2459; 
  
  // NORMA ISO 10816 EXIGE FILTRAR BAJAS FRECUENCIAS (< 10 Hz)
  // a Fs = 1000 Hz, un Alpha de 0.94 crea un filtro pasa-altas perfecto con f_c = ~10 Hz.
  // Esto hace a la integral inmune a movimientos de mano (MACRO desplazamientos)
  // y se enfoca en las vibraciones de motor (MICRO desplazamientos de alta frecuencia).
  private static readonly LEAKY_ALPHA = 0.94; // Filtro Pasa-Altas ISO (10 Hz)

  // Memoria estado Integración (Trapezoide)
  private static aOldX = 0;
  private static aOldY = 0;
  private static aOldZ = 0;
  private static vX = 0;
  private static vY = 0;
  private static vZ = 0;

  // Buffers para cálculo de RMS
  private static bufferVx: number[] = [];
  private static bufferVy: number[] = [];
  private static bufferVz: number[] = [];

  private static isInitialized = false;

  public static addSample(sample: ESPData): VelocityRMSData | null {
    // 1. Limpieza base de Aceleración con el DC Blocker del ADXL345
    const aClean = NormalizationEngine.processSample(sample);

    // 2. Conversión física (De LSB Crudo a 'mm/s²')
    const aCurrentX = aClean.x * this.LSB_TO_MMS2;
    const aCurrentY = aClean.y * this.LSB_TO_MMS2;
    const aCurrentZ = aClean.z * this.LSB_TO_MMS2;

    if (!this.isInitialized) {
      this.aOldX = aCurrentX;
      this.aOldY = aCurrentY;
      this.aOldZ = aCurrentZ;
      this.isInitialized = true;
      return null;
    }

    // 3. Resolución Temporal (Delta T)
    const dt = 1.0 / (sample.sample_rate_hz || 1000.0);

    // 4. Integración Numérica Adaptativa (Leaky Integrator)
    // El "Leak" (0.98) multiplica el resultado en cada ciclo. Actúa como un
    // resorte que jala la velocidad siempre de regreso a cero, matando 
    // absolutamente la deriva a infinito (drift) en caso de sesgos permanentes miniatura.
    this.vX = this.LEAKY_ALPHA * (this.vX + ((aCurrentX + this.aOldX) / 2.0) * dt);
    this.vY = this.LEAKY_ALPHA * (this.vY + ((aCurrentY + this.aOldY) / 2.0) * dt);
    this.vZ = this.LEAKY_ALPHA * (this.vZ + ((aCurrentZ + this.aOldZ) / 2.0) * dt);

    // Actualizamos los "olds" para el siguiente ciclo
    this.aOldX = aCurrentX;
    this.aOldY = aCurrentY;
    this.aOldZ = aCurrentZ;

    // 6. Almacenamiento en Buffer (Cálculo RMS Estándar ISO 10816)
    this.bufferVx.push(this.vX);
    this.bufferVy.push(this.vY);
    this.bufferVz.push(this.vZ);

    if (this.bufferVx.length >= this.WINDOW_SIZE) {
      const vRmsX = this.calculateRMS(this.bufferVx);
      const vRmsY = this.calculateRMS(this.bufferVy);
      const vRmsZ = this.calculateRMS(this.bufferVz);
      
      // Velocidad Resultante (Vectorial sum)
      const vRmsRes = Math.sqrt((vRmsX * vRmsX) + (vRmsY * vRmsY) + (vRmsZ * vRmsZ));

      const result: VelocityRMSData = {
        vRmsX: vRmsX,
        vRmsY: vRmsY,
        vRmsZ: vRmsZ,
        vRmsRes: vRmsRes,
        timestamp: Date.now(),
        sampleRateHz: sample.sample_rate_hz || 1000
      };

      // Vaciado de pipeline
      this.bufferVx = [];
      this.bufferVy = [];
      this.bufferVz = [];

      return result;
    }

    return null;
  }

  private static calculateRMS(values: number[]): number {
    const sumSq = values.reduce((sum, val) => sum + (val * val), 0);
    return Math.sqrt(sumSq / values.length);
  }

  public static reset() {
    this.isInitialized = false;
    this.aOldX = 0; this.aOldY = 0; this.aOldZ = 0;
    this.vX = 0; this.vY = 0; this.vZ = 0;
    this.bufferVx = []; this.bufferVy = []; this.bufferVz = [];
  }
}
