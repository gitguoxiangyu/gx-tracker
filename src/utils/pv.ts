export const createHistoryEvent = <T extends keyof History>(type:T) => {
  // 获取原生的 history 方法
  const origin = history[type]

  return function (this:any){
    // 将this指向改变为window，调用原生方法
    console.log(this);
    const res = origin.apply(this , arguments)

    // 创建一个type事件
    const e = new Event(type)
    // 将该事件派发给 window ， 这样就能监听到该事件
    window.dispatchEvent(e)

    return res
  }
}