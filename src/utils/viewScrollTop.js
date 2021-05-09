// 页面切换后返回原来位置

import sessionStorage from "@/utils/sessionStorage";
import {useRouter} from "vue-router";

let {getValue, setValue} = sessionStorage()

function viewScrollTop() {

  // 获取页面滚动位置
  const getScrollTop = (view) => {
    let scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop)
    setValue(view, scrollTop)
    console.log("单独的js获取的值是",scrollTop)
  }
  // 将页面滚动到先前位置
  const setScrollTop = (view) => {
    const scrollTop = Number(getValue(view))
    window.scrollTo({top: scrollTop})
    console.log("写入了")
  }
  return {
    setScrollTop, getScrollTop
  }
}

export default viewScrollTop
