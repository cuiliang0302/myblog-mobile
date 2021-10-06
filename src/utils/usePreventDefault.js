// 滑块验证时，阻止默认切换页面事件

import {onMounted, ref} from "vue";

function usePreventDefault() {
  const wraper = ref(null)
  onMounted(() => {
    wraper.value?.addEventListener('touchmove', e => {
      e.preventDefault()
    })
  })
  return wraper
}

export default usePreventDefault
