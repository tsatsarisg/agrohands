import path from 'path'
import pino, { transport } from 'pino'

const logFilePath = path.join(__dirname, '..', '..', 'logs', 'app.log')

const logger = pino(
    transport({
        targets: [
            {
                target: 'pino/file',
                options: {
                    destination: logFilePath,
                    mkdir: true,
                    maxFiles: 100,
                },
            },
        ],
    })
)

export default logger
