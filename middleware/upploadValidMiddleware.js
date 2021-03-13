const logger = require('../logger/loger')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        if (!req.files) {
            return res.status(400).json({message: 'file not found!'})
        }
        const key = Object.keys(req.files)[0]
        const file = req.files[key]
        const {size, name} = file
        if (BigInt(size) >= 2048000000000n) {
            logger({
                time: new Date().toString,
                status: 'file size is too large',
                detail: `File size is ${size}`
            })

            return res.status(400).json({message: 'file size is too large'})
        }
        if (name.split('.')[1] != 'zip') {
            logger({
                time: `${new Date()}`,
                status: 'File type validation err',
                detail: `File type is .${name.split('.')[1]}`
            })

            return res.status(400).json({message: 'File is dont have .zip format'})
        }
        next()

    } catch (e) {
        console.log(e)
        return res.status(500).json({message: 'unknow err during validation, pleas try again.'})
    }
}