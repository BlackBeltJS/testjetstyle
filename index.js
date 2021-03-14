require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const path = require('path')

const upMiddleware = require('./middleware/upploadValidMiddleware')
const upploadPathMiddleware = require('./middleware/upploadPathMiddleware')


// initial app
const PORT = process.env.PORT || 5001
const app = express()

app.use(express.json())
app.use(fileUpload({}))


// use rout
app.use('/upload', upMiddleware, upploadPathMiddleware, (req, res) => {
    try {
        res.json({
            message: 'complete!'
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({message: 'unknow err, pls try again!'})
    }
})

// start server
const start = () => {
    try {
        fs.access(path.join(__dirname, '/temp'), (err) => {
            if (err) {
                fs.mkdirSync(path.join(__dirname, '/temp'))
            }
        })
        fs.access(path.join(__dirname, '/upload'), err => {
            if (err) {
                fs.mkdirSync(path.join(__dirname, '/upload'))
            }
        })
        fs.access(path.join(__dirname, '/data'), err => {
            if (err) {
                fs.mkdirSync(path.join(__dirname, '/data'))
            }
        })
        fs.access(path.join(__dirname, 'log.json'), err => {
            if (err) {
                fs.writeFileSync(path.join(__dirname, 'log.json'), '[]')
            }
        })
        app.listen(PORT, () => {console.log('Srver has been started on port: ', PORT)})
    } catch (e) {
        console.log('Server run error: ', e)
    }
}

start()