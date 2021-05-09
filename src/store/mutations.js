const mutations = {
  setFontSize(state, size) {
    state.font.fontSize = size
  },
  setFontType(state, type) {
    state.font.fontType = type
  },
  setDark(state){
    state.dark = !state.dark
  }
}
export default mutations
