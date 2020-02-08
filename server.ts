require('dotenv').config()
import express from 'express'
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const path = require('path')
const cors = require('cors') // Connor Leech's comment here: https://stackoverflow.com/a/11057628

const app = express()

// body-parser middleware
app.use(cors()) // Allow CORS
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

// Database and connection
const db_server = require('./config/keys').db_uri
mongoose
  .connect(db_server)
  .then(() => console.log('Connected to remote server!'))
  .catch((err: Error) => console.log(err))

// Routes
app.use('/api/v1/members', require('./routes/api/v1/members'))
app.use('/api/v1/presentations', require('./routes/api/v1/presentations'))
app.use('/api/v1/events', require('./routes/api/v1/events'))
app.use('/api/v1/agreements', require('./routes/api/v1/agreements'))
app.use('/api/v1/technologies', require('./routes/api/v1/technologies'))
app.use('/api/v1/attendees', require('./routes/api/v1/attendees'))
app.use('/api/v1/demo-day', require('./routes/api/v1/demo-day'))
app.use('/api/v1/test', require('./routes/api/v1/test'))
// app.get('/', (req, res) => res.send('Hello world.'))

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // this is set in package.json
  console.log('In production!')
  app.use(express.static('client/build'))
  app.get('*', (req: express.Request, res: express.Response) => {
    // for any route except for the APIs above
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 3333

app.listen(port, () => console.log(`Server running on port ${port}`))
