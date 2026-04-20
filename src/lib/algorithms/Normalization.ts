import { type ESPData } from '../connection';

/**
 * Motor de Normalización Dinámica (DC Blocker / Leaky Integrator)
 * Extrae y suprime el vector de gravedad de forma adaptativa.
 */
export class NormalizationEngine {
  // Constante de suavizado para el Promedio Móvil (Filtro Pasa-Bajos)
  // Valores cercanos a 1.0 (ej. 0.98) garantizan estabilidad de postura.
  private static readonly ALPHA = 0.98;

  // Seguidores del vector gravedad / sesgo DC
  public static gravityX = 0; // Public for UI monitoring if needed
  public static gravityY = 0;
  public static gravityZ = 0;
  private static isInitialized = false;

  /**
   * Ejecuta el DC Blocker iterativo en una nueva muestra entrante
   */
  public static processSample(sample: ESPData) {
    // Evita el "fade-in lento" inicial anclando la base en la primera muestra leída
    if (!this.isInitialized) {
      this.gravityX = sample.raw.x;
      this.gravityY = sample.raw.y;
      this.gravityZ = sample.raw.z;
      this.isInitialized = true;
    }

    // PASO 1 (Low-Pass Filter): Aislar la señal continua de la gravedad
    this.gravityX = (this.ALPHA * this.gravityX) + ((1 - this.ALPHA) * sample.raw.x);
    this.gravityY = (this.ALPHA * this.gravityY) + ((1 - this.ALPHA) * sample.raw.y);
    this.gravityZ = (this.ALPHA * this.gravityZ) + ((1 - this.ALPHA) * sample.raw.z);

    // PASO 2 (High-Pass Filter): Restar la gravedad para dejar solo la Vibración (Alterna)
    return {
      x: sample.raw.x - this.gravityX,
      y: sample.raw.y - this.gravityY,
      z: sample.raw.z - this.gravityZ,
      uptime: sample.uptime_ms
    };
  }

  /**
   * Permite re-convergencia manual
   */
  public static reset() {
    this.isInitialized = false;
  }

  /**
   * Normaliza un flujo histórico
   */
  public static processHistory(history: ESPData[]) {
    return history.map(sample => this.processSample(sample));
  }
}
