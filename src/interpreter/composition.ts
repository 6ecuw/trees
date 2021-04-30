import { container } from '../composition'
import { SystemToGeometryMapper } from './implementation'
import { SystemInterpreter } from './types'

container.registerSingleton<SystemInterpreter, SystemToGeometryMapper>()
