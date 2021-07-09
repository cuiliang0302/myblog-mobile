// 暗黑模式


import {onMounted, reactive} from "vue";
import store from "@/store";

function dark() {
	let isDark = store.state.dark
	let themeVars = reactive({})
	const setDark = () => setTimeout(() => {
		isDark = !isDark
		store.commit('setDark', isDark)
		if (isDark) {
			window.document.documentElement.setAttribute("data-theme", 'dark');
			Object.assign(themeVars, darkStyle);
		} else {
			window.document.documentElement.setAttribute("data-theme", 'light');
			for (let key in themeVars) {
				delete themeVars[key];
			}
		}
	}, 500)
	const darkStyle = {
		gridItemContentBackgroundColor: '#2c3e50',
		gridItemContentActiveColor: '#34495e'
	};
	onMounted(() => {
		if (isDark) {
			window.document.documentElement.setAttribute("data-theme", 'dark');
			Object.assign(themeVars, darkStyle);
		} else {
			window.document.documentElement.setAttribute("data-theme", 'light');
			for (let key in themeVars) {
				delete themeVars[key];
			}
		}
	})
	return {
		setDark,
		themeVars,
	}
}

export default dark
