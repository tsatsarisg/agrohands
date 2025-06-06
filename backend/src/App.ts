/* eslint-disable n/no-process-exit */
import express, { Express, json } from 'express'
import cors from 'cors'
import routes from './routes'
import errorHandler from './utils/middlewares/errorHandler'
import { MongoAdapter } from './utils/MongoDBAdapter'
import { getEnv } from './utils/env'
import helmet from 'helmet'
import { Server } from 'http'
import buildComponents, { Components } from './components'
import logger from './utils/logger'
import cookieParser from 'cookie-parser'

export default class Application {
    private port: number
    private app: Express
    private server!: Server
    public mongoAdapter: MongoAdapter
    private components!: Components

    constructor() {
        this.app = express()
        this.port = parseInt(getEnv('BACKEND_PORT_NUMBER'), 10)
        this.mongoAdapter = new MongoAdapter(getEnv('DOCKER_MONGO_URL'))
    }

    build() {
        this.app.use(
            cors({
                origin: `${getEnv('DOMAIN')}${getEnv('FRONTEND_PORT_NUMBER')}`,
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
                credentials: true,
            })
        )
        this.app.use(json())
        this.app.use(cookieParser())
        this.app.use(helmet())
        this.app.use(errorHandler)
    }

    async start() {
        await this.mongoAdapter.connect()
        this.components = buildComponents(this.mongoAdapter)
        this.setRoutes()
        this.server = this.app
            .listen(this.port)
            .on('listening', () => {
                console.log(
                    `⚡️ Server is running at ${getEnv('DOMAIN')}${this.port}`
                )
                logger.info(
                    `⚡️ Server is running at ${getEnv('DOMAIN')}${this.port}`
                )
            })
            .on('error', (err) => {
                console.error('Error starting server')
                console.error(err)
                process.exit(1)
            })
    }

    async stop() {
        await this.mongoAdapter.close()
        this.server.close((err) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
            console.log('Server stopped')
        })
    }

    private setRoutes() {
        this.app.use('/api', Object.values(routes(this.components)))
    }

    public getComponents() {
        return this.components
    }
}
