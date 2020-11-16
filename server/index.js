const path = require('path')
const express = require('express')
const volleyball = require('volleyball')
const app = express()
module.exports = app

// Logging middleware
app.use(volleyball)

// Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/api', require('./api'))

that bypass express.static because the given file does not exist.
app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).end()
  } else {
    next()
  }
})

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
})

// Error catching endware
app.use((err, req, res, next) => {
  console.error(err, typeof next)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
