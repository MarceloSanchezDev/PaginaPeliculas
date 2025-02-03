import { app } from './app.js'
import { PORT } from './utilsBackend/config.js'
import { info } from './utilsBackend/logger.js'

app.listen(PORT, () => {
  info(`listening on port http://localhost:${PORT}`)
})
