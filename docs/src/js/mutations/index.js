export const state = {
  name: 'Vue'
}

export const mutations = {
  changeName (state, { name }) {
    state.name = name.split('').reverse().join('')
  }
}
