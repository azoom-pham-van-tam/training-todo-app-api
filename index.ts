import express, { NextFunction, Request, Response } from 'express'
import nnn from 'nnn-router'
import { PORT } from '@root/constants'
import logger from '@middleware/logger'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()
const port = PORT
const nnnRouterOptions = {
  routeDir: '/dist/routes'
}
const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'TodoApp API document'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./routes/**/*.ts']
}
const specs = swaggerJsdoc(swaggerOptions)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger, nnn(nnnRouterOptions))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error)
  return res.status(500).send(error.message)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
