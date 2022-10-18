import express, { application } from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js'
import tasks from './routes/tasks.js'
import { notFound } from './middleware/not-found.js'
import errorHandler from './middleware/errors.js'

const app = express()
const port = process.env.PORT || 8000

dotenv.config()

app
  .use(express.static('./public'))
  .use(express.json())
  .use('/api/v1/tasks', tasks)
  .use(notFound)
  .use(errorHandler)

start()

async function start() {
  try {
    await connectDb()
    app.listen(port, () => console.log(`nec-task-manager server is listening on port ${port}...`))
  } catch (err) {
    console.error(`Error connecting to database: ${err.message}`)
  }
}
