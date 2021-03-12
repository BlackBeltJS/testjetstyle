const uuid = require('uuid')
const fs = require('fs')
const path = require('path')
const decompress = require('decompress')
const fileUpload = require('express-fileupload')
const { fstat } = require('fs')
const wkhtmltopdf = require('wkhtmltopdf')
const test = require('./test')
// const wkhtmlToPdfOptions = require('wkhtmltopdf-nodejs-options-wrapper')
// const PdfApi = require('wkhtmltopdf-nodejs-pdfapi')


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
        fs.unlink(path.join(rootPath, '/upload/', fileName + '.zip'), (err) => {
            if (err) {
                throw err
            }
        })
        const stream = wkhtmltopdf(fs.createReadStream('file.html'), {output: 'test.pdf'}).pipe(res)

        // fs.readFile(path.join(rootPath, '/temp/', fileName, 'index.html'), {encoding: "utf-8"}, (err, file) => { 
        //     wkhtmltopdf(file, {output: "test.pdf"})
        // })
        

        next()
    } catch (e) {
        console.log(e)
        return res.status(404).json('500, unknow server err', e)
    }
}