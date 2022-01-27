// 暗黑模式


import {onMounted, reactive} from "vue";
import store from "@/store/index";

function dark() {
	let isDark = store.state.dark
	let themeVars = reactive({})
	const setDark = (value) => setTimeout(() => {
		isDark = value
		store.commit('setDark', isDark)
		if (isDark) {
			window.document.documentElement.setAttribute("data-theme", 'dark');
			themeVars = {...darkStyle}
		} else {
			window.document.documentElement.setAttribute("data-theme", 'light');
			// for (let key in themeVars) {
			// 	delete themeVars[key];
			// }
			themeVars = {...lightStyle}
		}
		// console.log(themeVars)
		// console.log(isDark)
		store.commit('setThemeStyle', themeVars)
	}, 500)
	const darkStyle = {
		// 单元格
		cellBackgroundColor: '#141414',
		cellTextColor: '#d6d6d6',
		cellBorderColor: 'none',
		cellActiveColor: '#4f4f4f',
		// 标签栏
		tabbarBackgroundColor: '#1F1F1F',
		tabbarItemActiveBackgroundColor: '#1F1F1F',
		tabbarItemTextColor: '#a3a3a3',
		// 开关
		switchBackgroundColor: '#d6d6d6',
		// 复选框
		checkboxLabelColor: '#d6d6d6',
		// 宫格
		gridItemContentBackgroundColor: '#141414',
		// 导航栏
		navBarBackgroundColor: '#1F1F1F',
		navBarTitleTextColor: '#d6d6d6',
		// 搜索
		searchBackgroundColor: '#4f4f4f',
		searchContentBackgroundColor: '#4f4f4f',
		// 图片
		imagePlaceholderBackgroundColor: '#4f4f4f',
		// 标签页
		tabsNavBackgroundColor: '#1F1F1F',
		tabActiveTextColor: '#d6d6d6',
		// 弹出层
		popupBackgroundColor: '#4f4f4f',
		actionSheetItemBackground: '#4f4f4f',
		actionSheetCancelPaddingColor: '#1F1F1F',
		actionSheetCancelTextColor: '#a3a3a3',
		actionSheetItemTextColor: '#a3a3a3',
		// 折叠面板
		collapseItemContentBackgroundColor: '#141414',
		// 步骤条
		stepsBackgroundColor: '#141414',
		stepFinishTextColor: '#d6d6d6',
		// 侧边导航
		sidebarBackgroundColor: '#141414',
		sidebarTextColor: '#a4a4a4',
		sidebarSelectedBackgroundColor: '#4f4f4f',
		sidebarSelectedTextColor: '#d6d6d6',
		//输入框
		fieldLabelColor: '#dadada',
		fieldInputTextColor: '#a2a2a2',
		// 按钮
		buttonPlainBackgroundColor: '#d6d6d6',
		// 标签
		tagPlainBackgroundColor: '#d6d6d6',
		// 分享菜单
		shareSheetCancelButtonBackground: '#4f4f4f',
		shareSheetTitleColor: '#d6d6d6',
		shareSheetOptionNameColor: '#a3a3a3',
		// 下拉菜单
		dropdownMenuBackgroundColor: '#1F1F1F',
		dropdownMenuTitleTextColor: '#d6d6d6',
	};
	const lightStyle = {
		cellBackgroundColor: 'transparent'
	};
	onMounted(() => {
		if (isDark) {
			window.document.documentElement.setAttribute("data-theme", 'dark');
			themeVars = {...darkStyle}
		} else {
			window.document.documentElement.setAttribute("data-theme", 'light');
			themeVars = {...lightStyle}
			// for (let key in themeVars) {
			// 	delete themeVars[key];
			// }
		}
	})
	return {
		setDark,
		themeVars,
	}
}

export default dark
