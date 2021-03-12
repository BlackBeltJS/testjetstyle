const logger = require('../logger/loger')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const file = req.files.upload
        const {size, name} = file
        if (BigInt(size) >= 2048000000000n) {
            logger.formatErrLog('Err size file - ' + size + ' bytes')
            return res.status(400).json('File size is bigger 2gb')
        }
        if (name.split('.')[1] != 'zip') {
            return res.status(400).json('File is dont have .zip format')
        }
        next()

    } catch (e) {
        console.log(e)
        return res.status(404).json({message: '500 err server'})
    }
}