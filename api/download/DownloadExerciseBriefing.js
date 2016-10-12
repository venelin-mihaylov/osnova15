import * as web from 'express-decorators'
import Exercise from '../../universal/model/Exercise'
import DocxTemplater from 'docxtemplater'

const fs = require('fs')
const path = require('path')

@web.controller('/download/exercise-briefing')
export default class DownloadExerciseBriefing {

  static renderTemplate(filename, data, renderOptions = {type: 'nodebuffer'}) {
    const tplContent = fs.readFileSync(path.join(__dirname, '..', '..', 'files', filename), 'binary')
    const tpl = new DocxTemplater(tplContent)
    tpl.setData(data)
    tpl.render()
    return tpl.getZip().generate(renderOptions)
  }

  static download(res, content, filename) {
    res.setHeader('Content-Length', content.length)
    res.setHeader('Content-Type', 'application/msword')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.send(content)
    res.end()
  }


  @web.get('/:exerciseId')
  async handle({
    params: {
      exerciseId
    }
  }, res) {
    const exercise = await Exercise.query().findById(exerciseId)
    const tplFilename = 'briefing.docx'
    const content = DownloadExerciseBriefing.renderTemplate(tplFilename, exercise)
    DownloadExerciseBriefing.download(res, content, `briefing-${exerciseId}.docx`)
  }
}
