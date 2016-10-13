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

  static toOOXML(text) {
    const lines = text.split(/\n/)
      .map(l => `<w:t>${l}</w:t>`)
      .filter(l => !!l)
      .join('<w:br/>\n')
    const paragraph = `<w:p><w:r>\n${lines}</w:r></w:p>`
    return paragraph
  }

  @web.get('/:exerciseId')
  async handle({
    params: {
      exerciseId
    }
  }, res) {
    const exercise = await Exercise.query().findById(exerciseId)

    exercise.xmlBriefing = DownloadExerciseBriefing.toOOXML(exercise.briefing)

    const tplFilename = 'briefing.docx'
    const content = DownloadExerciseBriefing.renderTemplate(tplFilename, exercise)
    DownloadExerciseBriefing.download(res, content, `briefing-${exerciseId}.docx`)
  }
}
