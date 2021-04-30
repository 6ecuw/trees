import { container } from '../composition'
import { Random } from './implementation'
import { RandomSource } from './types'

container.registerSingleton<RandomSource, Random>()
