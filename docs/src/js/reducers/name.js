import { CHANGE_NAME } from '../types'

const initialState = 'React'

export default function name (state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAME:

      return state.split('').reverse().join('')

    default:
      return state
  }
}
