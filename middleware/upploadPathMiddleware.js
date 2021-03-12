const uuid = require('uuid')
const fs = require('fs')
const path = require('path')
const decompress = require('decompress')
const fileUpload = require('express-fileupload')
const { fstat } = require('fs')
const fsExtra = require('fs-extra')
const wkhtmltopdf = require('wkhtmltopdf')


const rootPath = path.join(__dirname, '../')


module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const file = req.files.upload
        let fileName = uuid.v4()
        await file.mv(path.join(rootPath, '/upload/') + fileName + '.zip')
        fs.mkdirSync(path.join(rootPath, '/temp/' + fileName))
        const record = await decompress('./upload/' + fileName + ".zip", 'temp/' + fileName)
        await fs.unlink(path.join(rootPath, '/upload/', fileName + '.zip'), (err) => {
            if (err) {
                throw err
            }
        })
        await fs.readFile(path.join(rootPath, '/temp/', fileName, 'index.html'), {encoding: "utf-8"}, (err, file) => { 
            wkhtmltopdf(file, {output: path.join(rootPath, '/data', fileName + '.pdf')}, () => {
               next() 
            })
        })
        await fsExtra.remove(path.join(rootPath, '/temp/', fileName), (err) => {
            if (err) {
                throw err
            }
        })

        console.log('err')
    } catch (e) {
        console.log(e)
        return res.status(404).json({message: '500 err server'})
    }
}