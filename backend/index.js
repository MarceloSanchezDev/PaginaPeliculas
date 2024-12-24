import { app } from './app.js'
import { PORT } from '../../PaginaPeliculas/utils/config.js'
import { info } from '../../PaginaPeliculas/utils/logger.js'

app.listen(PORT, () => {
  info(`listening on port http://localhost:${PORT}`)
})
