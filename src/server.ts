import { app } from './app'
import { env } from './env'

app.listen({
    //aplicação acessível para conexão de uma aplicação front-end, com nossa api
    host: ' 0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log('🚀 Http Server Running!')
})