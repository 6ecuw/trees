import { RandomSource } from './types'

export class Random implements RandomSource {
  getValue(): number {
    return Math.random()
  }

  getBetweenInclusive(min: number, max: number): number {
    return Math.floor(this.getValue() * (max - min + 1) + min)
  }
}
