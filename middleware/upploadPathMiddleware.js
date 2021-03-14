const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const fsExtra = require('fs-extra')
const folderSize = require('get-folder-size')
const decompress = require('decompress')
const wkhtmltopdf = require('wkhtmltopdf')
const logger = require('../logger/loger')


const rootPath = path.join(__dirname, '../')


module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const timeBegin = new Date()
        const key = Object.keys(req.files)[0]
        const file = req.files[key]
        let costSize = file.size
        let fileName = uuid.v4()

        await file.mv(path.join(rootPath, '/upload/') + fileName + '.zip')
        await fs.mkdir(path.join(rootPath, '/temp/' + fileName), err => {
            if (err) {
                console.log('err to mkdir')
                throw err
            }
        })
        await decompress('./upload/' + fileName + ".zip", 'temp/' + fileName)
        await fs.unlink(path.join(rootPath, '/upload/', fileName + '.zip'), (err) => {
            if (err) {
                throw err
            }
        })
        await fs.readFile(path.join(rootPath, '/temp/', fileName, 'index.html'), {encoding: "utf-8"}, (err, data) => { 
            if (err) {
                console.log('err to read index.html')
                throw err
            }
            wkhtmltopdf(data, {output: path.join(rootPath, '/data', fileName + '.pdf')}, (err) => {
                
                next()
            })
            
        })

        await folderSize(path.join(rootPath, '/temp/', fileName), (err, size) => {
            if (err) {
                console.log('folder size calculation err')
                throw err
            }
            costSize += size
            logger(
                {
                    time: `${new Date()}`,
                    type: 'complete',
                    details: {
                        uploadFile: file.name,
                        filename: `${fileName}.pdf`,
                        timeToCreate: `${new Date().getTime() - timeBegin.getTime()} ms`,
                        costSize: `${costSize} bytes`
                }
            })
        })
        await fsExtra.remove(path.join(rootPath, '/temp/', fileName), (err) => {
            if (err) {
                console.log('path remove err,', fileName)
                throw err
            }
        })


    } catch (e) {
        console.log(e)
        return res.status(500).json({message: 'unknow err during upload file. please try again.'})
    }
}