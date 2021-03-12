require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const path = require('path')
const wk = require('wkhtmltopdf')

const upMiddleware = require('./middleware/upploadValidMiddleware')
const upploadPathMiddleware = require('./middleware/upploadPathMiddleware')

const PORT = process.env.PORT || 5001

const app = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'upload')))
app.use(fileUpload({}))

app.use('/upload', upMiddleware, upploadPathMiddleware, (req, res) => {
    try {
        res.json({message: 'complete!'})

    } catch (e) {

    }
})

const start = async () => {
    try {
        app.listen(PORT, () => {console.log('Srver has been started on port: ', PORT)})
    } catch (e) {
        console.log('Started error: ', e)
    }
}

start()