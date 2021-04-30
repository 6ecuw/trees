import { container } from '../../composition'
import { StartPointSelector } from './implementation'
import { StartSelector } from './types'

container.registerSingleton<StartSelector, StartPointSelector>()
