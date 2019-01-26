require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const body_parser = require('body-parser')

const app = express()

// body-parser middleware
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

const mlab_db = process.env.mlab_uri

console.log(mlab_db)
