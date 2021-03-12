const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
// const adapter = new FileSync('db.json')
// const db = low(adapter)

class UploadLoger {
    constructor() {
        this.adapter = new FileSync('./log.json')
        this.db = low(this.adapter)
    }

    async formatErrLog (data) {
        this.db.set('formatErr.data', data)
            .write()
    }

    async typeErrLog () {

    }

    async completeLog () {

    }
}

module.exports = new UploadLoger()