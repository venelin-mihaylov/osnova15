import Act from 'constants/Act'
export default function misc(state = {
  flash: false, // if true, show flashMessage for flashDuration
  flashMessage: null,
  flashDuration: 40000,
}, action = {}) { // eslint-disable-line
  const {
    type,
    ...act
  } = action
  switch (type) {
    case Act.FLASH_MESSAGE_START:
      return Object.assign({}, state, {
        flash: true,
        flashMessage: act.message
      })
    case Act.FLASH_MESSAGE_END:
      return Object.assign({}, state, {
        flash: false,
        flashMessage: null,
        flashDuration: 40000 // default
      })
    default:
      return state
  }
}
