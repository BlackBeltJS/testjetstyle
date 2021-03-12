const wkhtmltopdf = require('wkhtmltopdf')
const fs = require('fs')

wkhtmltopdf('http://google.com/', { pageSize: 'letter' })
  .pipe(fs.createWriteStream('out.pdf'))