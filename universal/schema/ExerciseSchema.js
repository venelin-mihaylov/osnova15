const ExerciseSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    id: {type: 'integer'},
    name: {type: 'string', maxLength: 255},
    favourite: {type: 'boolean'}
  }
}
export default ExerciseSchema