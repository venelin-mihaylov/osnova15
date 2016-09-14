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
  if (!data) {
    return null
  }
  return prefix + '' + data // eslint-disable-line
}

function genThumbnail(imageData) {
  if (!imageData) {
    return null
  }
  const buffer = imagemagick.convert({
    srcData: Buffer.from(imageData, 'base64'),
    width: 100,
    height: 100,
    resizeStyle: 'aspectfill', // is the default, or 'aspectfit' or 'fill'
    gravity: 'Center' // optional: position crop area when using 'aspectfill'
  })
  return buffer.toString('base64')
}

Target.prototype.$beforeInsert = function () {
  this.thumbnail = addHtmlImgPrefix(genThumbnail(stripHtmlImgPrefix(this.image)))
}

Target.prototype.$beforeUpdate = function () {
  this.thumbnail = addHtmlImgPrefix(genThumbnail(stripHtmlImgPrefix(this.image)))
}
