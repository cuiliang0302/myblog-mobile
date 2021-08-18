const mutations = {
	setFontValue(state, size) {
		state.font.fontValue = size
	},
	setRootSize(state, size) {
		state.font.rootSize = size
	},
	setFontType(state, type) {
		state.font.fontType = type
	},
	setDark(state, value) {
		state.dark = value
	},
	setNextPath(state, path) {
		state.nextPath = path
	},
	setThemeStyle(state, value) {
		state.themeStyle = value
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
