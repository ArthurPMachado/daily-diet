import { app } from './app'
import { configuration } from './env'

app
  .listen({
    host: '0.0.0.0',
    port: configuration.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running')
  })
