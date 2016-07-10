const ExerciseSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    id: {type: 'integer'},
    name: {type: 'string', maxLength: 255}
  }
}
export default ExerciseSchema
