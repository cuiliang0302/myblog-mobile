// 存取session storage数据

function sessionStorage() {
  // 获取存储数据
  const getValue = (key) => {
    return window.sessionStorage.getItem(key)
  }
  // 修改存储数据
  const setValue = (key, value) => {
    window.sessionStorage.setItem(key, value);
  }
  return {
    getValue,
    setValue
  }
}

export default sessionStorage
