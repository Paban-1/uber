const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('yoo')
})

module.exports = app