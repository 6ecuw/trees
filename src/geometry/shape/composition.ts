import { container } from '../../composition'
import { CoreShapeBuilder } from './implementation'
import { ShapeBuilder } from './types'

container.registerSingleton<ShapeBuilder, CoreShapeBuilder>()
