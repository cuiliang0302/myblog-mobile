import {defineStore} from 'pinia'
import {useCssVar, useDark, useToggle} from '@vueuse/core'
import {ref} from "vue";
import {showToast} from "vant";
// 主题换肤
export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme_name: '拂晓蓝(默认)',
        theme_color: '#409eff',
        is_dark: null,
        font_name: '默认',
        font_value: 50,
        font_default: 0
    }),
    // 计算属性
    getters: {
        darkValue(state) {
            // 获取dark模式值
            console.log(state.is_dark)
            if (state.is_dark === true) {
                return 'dark'
            } else {
                return 'light'
            }
        },
    },
    // 修改数据
    actions: {
        initialize() {
            console.log("开始样式初始化了啊")
            // 如果已经初始化则跳过
            if (this.is_dark == null) {
                // 检测浏览器主题偏好
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                console.log("是否是深色模式", prefersDark)
                this.is_dark = prefersDark
            }
            this.applyDark()
            this.applyTheme()
            console.log(this.font_value)
            if (this.font_value === 50) {
                console.log("执行默认操作")
                console.log(parseInt(getComputedStyle(document.documentElement).fontSize))
                this.font_default = parseInt(getComputedStyle(document.documentElement).fontSize);
            }else {
                console.log("设置字体大小")
                this.toggleSize(this.font_value)
            }
        },
        // 切换深色模式
        applyDark() {
            const isDark = useDark()
            if (this.is_dark === true) {
                console.log('切换为深色模式')
                document.documentElement.setAttribute('class', 'van-theme-dark')
            } else {
                console.log('切换为浅色模式')
                document.documentElement.setAttribute('class', 'van-theme-light')
            }
            useToggle(isDark)
        },
        // 切换字体大小
        toggleSize(value) {
            console.log(this.font_default)
            switch (value) {
                case 0:
                    showToast('已设置字体为：超小')
                    document.documentElement.style.fontSize = this.font_default - 8 + 'px';
                    this.font_name = '超小'
                    break;
                case 25:
                    showToast('已设置字体为：小号')
                    document.documentElement.style.fontSize = this.font_default - 4 + 'px';
                    this.font_name = '小号'
                    break;
                case 50:
                    showToast('已设置字体为：默认')
                    document.documentElement.style.fontSize = this.font_default + 'px';
                    this.font_name = '默认'
                    break;
                case 75:
                    showToast('已设置字体为：大号')
                    document.documentElement.style.fontSize = this.font_default + 4 + 'px';
                    this.font_name = '大号'
                    break;
                case 100:
                    showToast('已设置字体为：超大')
                    document.documentElement.style.fontSize = '60px';
                    document.documentElement.style.fontSize = this.font_default + 8 + 'px';
                    this.font_name = '超大'
                    break;
                default:
                    showToast('已设置字体为：默认')
                    document.documentElement.style.fontSize = '60px';
                    this.font_name = '默认'
            }
        },
        // 切换主题
        toggleTheme(name, color) {
            this.theme_name = name
            this.theme_color = color
            this.applyTheme()
        },

        // 切换主题色
        applyTheme() {
            const el = ref(null)
            const primary_color = useCssVar('--van-primary-color', el)
            console.log(primary_color.value)
            primary_color.value = this.theme_color
        },
    },
    // 持久化存储插件其他配置
    persist: {
        // 修改存储中使用的键名称，默认为当前 Store的 id
        key: 'useThemeStore',
        // 修改为 sessionStorage，默认为 localStorage
        storage: localStorage,
    }
})