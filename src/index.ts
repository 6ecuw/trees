import { container } from './composition'
import { SystemBuilder } from './l-system'

const builder = container.get<SystemBuilder>()

console.log(
  builder.build({
    initiator: '0',
    iterations: 3,
    rules: { '1': '11', '0': '1[0]0' },
  })
)
