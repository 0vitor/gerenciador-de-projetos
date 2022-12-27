import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

function connectDataBase(url) {
  mongoose.set('strictQuery', true)
  mongoose.connect(url)
  mongoose.connection.on('connected', () => {
    console.log('conectado')
  })
}

export default connectDataBase