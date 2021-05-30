const mutations = {
  setFontSize(state, size) {
    state.font.fontSize = size
  },
  setFontType(state, type) {
    state.font.fontType = type
  },
  setDark(state) {
    state.dark = !state.dark
  },
  setKeepLogin(state, value) {
    state.keepLogin = value
  },
  setUserLocal(state, value) {
    state.userLocal = value
  },
  setUserSession(state, value) {
    state.userSession = value
  }
}
export default mutations
