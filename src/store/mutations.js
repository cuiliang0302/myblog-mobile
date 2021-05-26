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
  setIsLogin(state, value) {
    state.login.isLogin = value
  },
  setKeepLogin(state, value) {
    state.login.keepLogin = value
  },
  setUserLocal(state, value) {
    state.userLocal = value
  },
  setUserSession(state, value) {
    state.userSession = value
  }
}
export default mutations
