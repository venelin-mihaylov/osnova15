import * as web from 'express-decorators'

const fs = require('fs')
const path = require('path')

@web.controller('/download/exercise-briefing')
export default class DownloadExerciseBriefing {

  @web.get('/')
  async handle(req, res) {
    const filename = 'test.docx'
    const file = fs.readFileSync(path.join(__dirname, '..', '..', 'files', filename), 'binary')
    res.setHeader('Content-Length', file.length)
    res.setHeader('Content-Type', 'application/msword')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.write(file, 'binary')
    res.end()
  }
}
