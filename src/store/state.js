const state = {
	// 字体大小设置
	font: {
		//字体设置进度条值
		fontValue: 50,
		// 根字体大小
		rootSize: 0,
		// 字体种类
		fontType: '默认',
	},
	// 是否开启暗黑模式
	dark: false,
	// vant样式变量
	themeStyle: {},
	// 登录后跳转页
	nextPath: '/personal/myIndex',
	// 是否保持登录
	keepLogin: false,
	// 保持登录用户信息(localStorage)
	userLocal: {},
	// 临时登录用户信息(sessionStorage)
	userSession: {},
}
export default state

