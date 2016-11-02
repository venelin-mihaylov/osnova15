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

/**
 *
 * @param {string} imageData base64 encoded image data
 * @returns {string} base64 encoded image thumbnail
 */
function resizeImage(imageData, width, height) {
  if (!imageData) {
    return ''
  }
  try {
    const buffer = imagemagick.convert({
      srcData: Buffer.from(imageData, 'base64'),
      width,
      height,
      resizeStyle: 'aspectfill', // is the default, or 'aspectfit' or 'fill'
      gravity: 'Center' // optional: position crop area when using 'aspectfill'
    })
    return buffer.toString('base64')
  } catch (err) {
    console.log(err)
    throw err
  }
}

Target.prototype.$beforeInsert = function () {
  this.thumbnail = addHtmlImgPrefix(resizeImage(stripHtmlImgPrefix(this.image), 200, 200))
  this.image = addHtmlImgPrefix(resizeImage(stripHtmlImgPrefix(this.image), 600, 800))
}

Target.prototype.$beforeUpdate = function () {
  this.thumbnail = addHtmlImgPrefix(resizeImage(stripHtmlImgPrefix(this.image), 200, 200))
  this.image = addHtmlImgPrefix(resizeImage(stripHtmlImgPrefix(this.image), 600, 800))
}
