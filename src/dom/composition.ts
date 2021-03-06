import { container } from '../composition'
import { DomSource } from './implementation'
import { ElementSource, PixelRatioSource } from './types'

container.registerSingleton<ElementSource, DomSource>()
container.registerSingleton<PixelRatioSource>(() => window)
