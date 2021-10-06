// 字体配置

import {computed, onMounted, reactive, ref} from "vue";
import store from "@/store/index";
import {Toast} from "vant";

function fontSize() {
    // 字体显示种类
    const fontShow = ['超小', '小号', '默认', '大号', '超大']
    // 字体大小进度条值
    const fontValue = ref()
    // rem根字体大小
    const rootSize = computed(() => store.state.font.rootSize)
    // 字体大小选项
    const sizeArray = ref([])
    // 字体大小值
    const fontType = ref()
    // 设置滑块字体大小
    const changeSize = (fontValue) => {
        const html = document.querySelector('html')
        let RootSize = 0
        switch (fontValue) {
            case 0:
                Toast('已设置字体为：超小号')
                html.style.fontValue = sizeArray.value[0] + 'px'
                RootSize = sizeArray.value[0]
                fontType.value = '超小'
                break;
            case 25:
                Toast('已设置字体为：小号')
                html.style.fontValue = sizeArray.value[1] + 'px'
                RootSize = sizeArray.value[1]
                fontType.value = '小号'
                break;
            case 50:
                Toast('已设置字体为：默认')
                html.style.fontValue = sizeArray.value[2] + 'px'
                RootSize = sizeArray.value[2]
                fontType.value = '默认'
                break;
            case 75:
                Toast('已设置字体为：大号')
                html.style.fontValue = sizeArray.value[3] + 'px'
                RootSize = sizeArray.value[3]
                fontType.value = '大号'
                break;
            case 100:
                Toast('已设置字体为：超大号')
                html.style.fontValue = sizeArray.value[4] + 'px'
                RootSize = sizeArray.value[4]
                fontType.value = '超大'
                break;
            default:
                Toast('已设置字体为：默认')
                fontType.value = '默认'
        }
        store.commit('setFontValue', fontValue)
        store.commit('setRootSize', RootSize)
        store.commit('setFontType', fontType.value)
    }
    onMounted(() => {
        fontValue.value = store.state.font.fontValue
        fontType.value = store.state.font.fontType
        console.log(rootSize.value)
        const html = document.querySelector('html')
        if (rootSize.value === 0) {
            // 未设置根字体大小
            store.commit('setRootSize', 16)
        } else {
            // 调整字体大小
            html.style.fontValue = rootSize.value + 'px'
        }
        sizeArray.value.push(12)
        sizeArray.value.push(14)
        sizeArray.value.push(16)
        sizeArray.value.push(18)
        sizeArray.value.push(20)
    })
    return {
        fontShow,
        fontValue,
        changeSize,
        rootSize,
        fontType
    }
}

export default fontSize
