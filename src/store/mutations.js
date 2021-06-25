const mutations = {
    setFontValue(state, size) {
        state.font.fontValue = size
    },
    // setDefaultSize(state, size) {
    //     state.font.defaultSize = size
    // },
    setRootSize(state, size) {
        state.font.rootSize = size
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
