import { StartSelector } from '../geometry/location'
import { ShapeBuilder } from '../geometry/shape'
import { RandomSource } from '../random'
import { AppSettings } from '../settings'
import { leafColors } from './constants'
import { Stack } from './stack'
import { Instruction, SystemInterpreter } from './types'

export class SystemToGeometryMapper implements SystemInterpreter {
  private currentLocation: Point = { x: 0, y: 0 }
  private currentAngle: DegreesAmount = 0
  private currentWidth: PixelsAmount = 0

  private systemTokens: List<Character> = []
  private drawInstructions: List<Instruction> = []

  constructor(
    private shapeBuilder: ShapeBuilder,
    private startSelector: StartSelector,
    private stack: Stack<TreeJoint>,
    private settings: AppSettings,
    private random: RandomSource
  ) {}

  public translate = (expression: Expression): List<Instruction> => {
    this.currentLocation = { ...this.startSelector.selectStart() }
    this.systemTokens = expression.split('')
    this.currentWidth = this.settings.stemWidth

    this.systemTokens.forEach(this.translateToken)
    return this.drawInstructions
  }

  private translateToken = (token: Character): void => {
    switch (token) {
      case '0': {
        const line = this.createLine()
        this.currentLocation = { ...line.end }
        this.drawInstructions.push({
          line,
          color: this.selectLeafColor(),
          width: this.settings.leafWidth,
        })
        break
      }
      case '1':
      case '2': {
        if (this.shouldSkip()) return

        const line = this.createLine()
        this.currentLocation = { ...line.end }
        this.drawInstructions.push({ line, width: this.currentWidth })
        break
      }
      case '[': {
        this.currentWidth *= 0.75
        this.currentAngle -=
          this.settings.jointAngle + this.randomAngleDeviation()
        this.stack.push({
          location: { ...this.currentLocation },
          rotation: this.currentAngle,
          stemWidth: this.currentWidth,
        })
        break
      }
      case ']': {
        const lastJoint = this.stack.pop()
        this.currentWidth = lastJoint.stemWidth
        this.currentLocation = { ...lastJoint.location }
        this.currentAngle =
          lastJoint.rotation +
          2 * this.settings.jointAngle +
          this.randomAngleDeviation()
        break
      }
    }
  }

  private createLine = (): Line => {
    return this.shapeBuilder.createLine(
      this.currentLocation,
      this.settings.stemWidth,
      this.currentAngle
    )
  }

  private selectLeafColor = (): Color => {
    const randomColor = this.random.getBetweenInclusive(0, 2)
    return leafColors[randomColor]
  }

  private randomAngleDeviation = (): Angle => {
    return this.random.getBetweenInclusive(-5, 5)
  }

  private shouldSkip = (): boolean => {
    return this.random.getValue() > 0.4
  }
}
