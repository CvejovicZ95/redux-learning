import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { connect } from './src/db/connectDB.js'

import { postsRouter } from './src/routes/postsRoutes.js'
import { usersRoutes } from './src/routes/usersRoutes.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: ['http://localhost:3000', 'http://192.168.1.6:3000'],
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(express.json())
app.use(cors(corsOptions))

app.use('/api', postsRouter)
app.use('/api', usersRoutes)


app.listen(PORT, () => {
  connect()
  console.log(`Server is listening on port ${PORT}`)
})
