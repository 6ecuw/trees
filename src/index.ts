import { container } from './composition'
import { Drawer } from './graphics/drawer'

const drawer = container.get<Drawer>()

drawer.drawLine({
  start: { x: 0, y: 0 },
  end: { x: 100, y: 100 },
})
