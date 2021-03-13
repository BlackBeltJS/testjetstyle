const fs = require('fs')
const path = require('path')
 
async function completeLogJson (content) {

    fs.readFile(path.join(__dirname, '../', 'log.json'), (err, data) => {
        if (err) {
            console.log('logger read err')
            throw err
        }
        const arData = JSON.parse(data)
        arData.push({log: content})
        const completeData = JSON.stringify(arData) 
        fs.writeFile(path.join(__dirname, '../', 'log.json'), completeData, (err) => {
            if (err) {
                console.log('logger write err')
                throw err
            }
        })
    })
    
}

module.exports = completeLogJson