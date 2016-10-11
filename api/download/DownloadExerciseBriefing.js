import * as web from 'express-decorators'
import Exercise from '../../universal/model/Exercise'
import DocxTemplater from 'docxtemplater'

const fs = require('fs')
const path = require('path')

@web.controller('/download/exercise-briefing')
export default class DownloadExerciseBriefing {

  @web.get('/:exerciseId')
  async handle(req, res) {
    const exercise = await Exercise.query().findById(req.params.exerciseId)

    console.log(exercise)

    const tplFilename = 'test.docx'
    const tplContent = fs.readFileSync(path.join(__dirname, '..', '..', 'files', tplFilename), 'binary')
    const tpl = new DocxTemplater(tplContent)
    tpl.setData(exercise)
    tpl.render()
    const buffer = tpl.getZip().generate({type: 'nodebuffer'})
    res.setHeader('Content-Length', tplContent.length)
    res.setHeader('Content-Type', 'application/msword')
    res.setHeader('Content-Disposition', `attachment; filename="${tplFilename}"`)
    res.send(buffer)
    res.end()
  }
}
