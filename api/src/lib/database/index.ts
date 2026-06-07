import 'dotenv/config'
import mongoose from 'mongoose'
export * as schema from './schema'

async function useDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL

  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required.')
  }

  const connect = async () => {
    try {
      await mongoose.connect(DATABASE_URL)
      console.log('MongoDB connected')
    } catch (error) {
      console.error('Error connecting to MongoDB:', error)
    }
  }

  const disconnect = async () => {
    try {
      await mongoose.disconnect()
      console.log('MongoDB disconnected')
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error)
    }
  }

  return {
    connect,
    disconnect,
  }
}

export default useDatabase
