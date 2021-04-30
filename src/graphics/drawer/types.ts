export type BrushSettings = {
  color?: Color
  width?: PixelAmount
}

export interface Drawer {
  drawLine(line: Line, settings?: BrushSettings): void
}