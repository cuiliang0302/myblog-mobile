// 获取邮件验证码
import {reactive} from "vue";

function emailCode() {
  // 获取验证码按钮对象
  let codeBtn = reactive({disabled: false, btnText: '获取验证码'});
  // 点击获取验证码
  const getCode = () => {
    let second = 60
    const intervalObj = setInterval(() => {
      codeBtn.disabled = true
      second--
      codeBtn.btnText = '获取验证码(' + second + 's)'
      if (second === 0) {
        codeBtn.disabled = false
        codeBtn.btnText = '获取验证码'
        clearInterval(intervalObj)
      }
    }, 1000)
  }
  return {
    codeBtn,
    getCode
  }
}

export default emailCode
