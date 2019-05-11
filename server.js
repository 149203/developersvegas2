require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const body_parser = require('body-parser')

const app = express()

// body-parser middleware
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

// Database and connection
const mlab_db = process.env.mlab_uri
mongoose
   .connect(mlab_db)
   .then(() => console.log('Connected to mLab!'))
   .catch(err => console.log(err))

// Routes
app.use('/api/v1/members', require('./routes/api/v1/members'))
app.use('/api/v1/presentations', require('./routes/api/v1/presentations'))
app.get('/', (req, res) => res.send('Hello world.'))

const port = process.env.port || 3333

app.listen(port, () => console.log(`Server running on port ${port}`))
