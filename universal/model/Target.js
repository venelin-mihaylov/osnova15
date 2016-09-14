import OsnovaModel from './OsnovaModel'
import TargetSchema from '../model/schema/TargetSchema'
import TargetRelations from './relations/TargetRelations'
import {toObjectionRelations} from './util/util'
import imagemagick from 'imagemagick-native'


export default class Target extends OsnovaModel {
  static tableName = 'target'
  static jsonSchema = TargetSchema
  static relationMappings = toObjectionRelations(TargetRelations)
}

const prefix = 'data:image/jpeg;base64,'
function stripHtmlImgPrefix(data) {
  if (!data) {
    return null
  }
  return data.replace(prefix, '')
}
function addHtmlImgPrefix(data) {
  return prefix + '' + data // eslint-disable-line
}

function genThumbnail(imageData) {
  return imagemagick.convert({
    srcData: Buffer.from(imageData, 'base64'),
    width: 100,
    height: 100,
    resizeStyle: 'aspectfill', // is the default, or 'aspectfit' or 'fill'
    gravity: 'Center' // optional: position crop area when using 'aspectfill'
  })
}

Target.prototype.$beforeUpdate = function () {
  if (this.image) {
    const imageData = stripHtmlImgPrefix(this.image)
    const buffer = genThumbnail(imageData)
    const thumbnail = addHtmlImgPrefix(buffer.toString('base64'))
    this.thumbnail = thumbnail
  }
}
