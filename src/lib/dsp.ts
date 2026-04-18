export class VibrationFilter {
  private alpha: number;
  private prevRaw: { x: number; y: number; z: number };
  private prevFiltered: { x: number; y: number; z: number };

  constructor(alpha: number = 0.98) {
    this.alpha = alpha;
    this.prevRaw = { x: 0, y: 0, z: 0 };
    this.prevFiltered = { x: 0, y: 0, z: 0 };
  }

  process(x: number, y: number, z: number) {
    const filteredX = this.alpha * (this.prevFiltered.x + x - this.prevRaw.x);
    const filteredY = this.alpha * (this.prevFiltered.y + y - this.prevRaw.y);
    const filteredZ = this.alpha * (this.prevFiltered.z + z - this.prevRaw.z);

    // Guardar para la siguiente iteración
    this.prevRaw = { x, y, z };
    this.prevFiltered = { x: filteredX, y: filteredY, z: filteredZ };

    return {
      x: filteredX,
      y: filteredY,
      z: filteredZ,
      magnitude: Math.sqrt(filteredX ** 2 + filteredY ** 2 + filteredZ ** 2)
    };
  }
}

export function rawToG(value: number): number {
  return value * 0.0039;
}
