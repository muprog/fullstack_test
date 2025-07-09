const express = require('express')
const app = express()
const path = require('path')
app.use(express.json())
require('dotenv').config()
app.use('/files', express.static(path.join(__dirname, '../uploads')))
app.use('/', require('./routes/route'))
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server is running on port ${PORT}`))
