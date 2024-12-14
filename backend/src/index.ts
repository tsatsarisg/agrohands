/* eslint-disable n/no-process-exit */
import Application from './App'

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server')
    process.exit(0)
})

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server')
    process.exit(0)
})

const app = new Application()

async function bootstrap() {
    app.build()
    await app.start()
}

bootstrap()
