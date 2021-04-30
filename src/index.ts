import { Application } from './app'
import { container } from './composition'

const app = container.get<Application>()
app.start()