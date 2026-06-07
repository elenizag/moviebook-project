import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import {
  auth,
  movies,
} from './routes'
import { errorHandler } from './middlewares'
import useDatabase from './lib/database'
import dns from 'dns'

if (process.env.NODE_ENV !== 'production') {
  dns.setServers(['1.1.1.1', '8.8.8.8'])
}

const app = express()
const database = await useDatabase()

database.connect().catch((error) => {
  console.error('MongoDB connection error:', error)
})

const APP_PORT = parseInt(process.env.APP_PORT || '8000')
const APP_URL = process.env.APP_URL || 'http://localhost:8000'
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
)
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', auth)
app.use('/api/movies', movies)

app.use(errorHandler)

app.listen(APP_PORT, () => {
  console.log(`Server is running at ${APP_URL}`)
})

const cleanup = async () => {
  await database.disconnect()
  process.exit(0)
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)
