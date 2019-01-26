require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const body_parser = require('body-parser')

const developers = require('./routes/api/developers')
const projects = require('./routes/api/projects')
const technologies = require('./routes/api/technologies')

const app = express()

// body-parser middleware
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

// Database and connnection
const mlab_db = process.env.mlab_uri
mongoose
   .connect(mlab_db)
   .then(() => console.log('Connected to mLab!'))
   .catch(err => console.log(err))

// Routes
app.use('/api/developers', developers)
app.use('/api/projects', projects)
app.use('/api/technologies', technologies)

app.get('/', (req, res) => res.send('Hello world.'))

const port = process.env.port || 3333

app.listen(port, () => console.log(`Server running on port ${port}`))
