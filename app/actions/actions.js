import CRUDAct from 'constants/CRUDAct'

export function setNextUri(entity, uri) {
  return {
    type: CRUDAct.type(entity, CRUDAct.SET_NEXT_URI),
    value: uri // i.e come back here
  }
}