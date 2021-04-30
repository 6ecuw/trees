import { Drawer } from '../graphics/drawer'
import { SystemInterpreter } from '../interpreter'
import { SystemBuilder } from '../l-system'
import { AppSettings } from '../settings'
import { Application } from './types'

export class App implements Application {
  constructor(
    private builder: SystemBuilder,
    private drawer: Drawer,
    private interpreter: SystemInterpreter,
    private settings: AppSettings
  ) {}

  public start = (): void => {
    const system = this.builder.build(this.settings)
    const instructions = this.interpreter.translate(system)
    instructions.forEach(instruction => {
      const { line, ...settings } = instruction
      this.drawer.drawLine(line, settings)
    })
  }
}
