module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const file = req.files.upload
        const {size, name} = file
        if (BigInt(size) >= 2048000000000n) {
            return res.status(400).json('File size is bigger 2gb')
        }
        if (name.split('.')[1] != 'zip') {
            return res.status(400).json('File is dont have .zip format')
        }
        next()

    } catch (e) {
        return res.status(404).json('500, unknow server err', e)
    }
}