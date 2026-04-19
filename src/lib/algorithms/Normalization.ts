import { type ESPData } from '../connection';

/**
 * Motor de Normalización de Señal de Vibración
 * Procesa datos crudos basados en los offsets de reposo (-23, 15, -250)
 * para alcanzar el cero absoluto en los tres ejes.
 */
export class NormalizationEngine {
  // Constantes de Offsets (Sesgo en Reposo)
  private static readonly OFFSET_X = -23.0;
  private static readonly OFFSET_Y = 15.0;
  private static readonly OFFSET_Z = -250.0;

  /**
   * Normaliza una sola muestra
   */
  public static processSample(sample: ESPData) {
    return {
      x: sample.raw.x - this.OFFSET_X, // X_raw + 23.0
      y: sample.raw.y - this.OFFSET_Y, // Y_raw - 15.0
      z: sample.raw.z - this.OFFSET_Z, // Z_raw + 250.0
      uptime: sample.uptime_ms
    };
  }

  /**
   * Normaliza un array de muestras (Historial)
   */
  public static processHistory(history: ESPData[]) {
    return history.map(sample => this.processSample(sample));
  }
}
