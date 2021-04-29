import { container } from '../composition'
import { Builder } from './implementation'
import { SystemBuilder } from './types'

container.registerSingleton<SystemBuilder, Builder>()
