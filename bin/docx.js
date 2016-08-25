const fs = require('fs')
const Docxtemplater = require('docxtemplater')

const content = fs.readFileSync(`${__dirname}/input.docx`, 'binary')
const doc = new Docxtemplater(content)
doc.setData({
  tournamentName: 'John',
  tournamentTest: 'Alabala'
})

doc.render()

const buf = doc.getZip().generate({type: 'nodebuffer'})
fs.writeFileSync(`${__dirname}/output.docx`, buf)
