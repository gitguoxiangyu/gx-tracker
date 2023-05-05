import { Option , SelectableOption } from '../types/index'
import { createHistoryEvent } from '../utils/pv'

export default class Tracker{
  public baseData: SelectableOption;

  constructor(options : SelectableOption){
    // 将默认配置和传入配置合并
    this.baseData = Object.assign(this.initDefault(),options)

    // 根据配置选择是否监听history改变
    this.installEventTracker()
  }

  // 默认初始化baseData
  private initDefault (): Option{
    // 重写 pushState 和 replaceState方法
    // 便于监听
    window.history['pushState'] = createHistoryEvent('pushState')
    window.history['replaceState'] = createHistoryEvent('replaceState')

    return <Option>{
      sdkVersion: '1.0.0',
      historyTracker: false,
      hashTracker: false,
      domTracker: false,
      jsError: false
    }
  }

  private captureEvents <T> (eventLists: Array<string> , targetKey?: string , data?: T){
    eventLists.forEach((event)=>{
      window.addEventListener(event , ()=>{
        // 监听到对应事件的回调
        console.log('监听到了' + event)
        this.reportMessage({
          event,
          targetKey,
          data
        })
      })
    })
  }

  // 安装事件捕获 
  private installEventTracker(){
    if (this.baseData.historyTracker){
      this.captureEvents(['pushState','replaceState','popState'])
    }

    if (this.baseData.hashTracker){
      this.captureEvents(['hashchange'])
    }
  }

  // 上报 方法
  private reportMessage<T>(data: T){
    const params = Object.assign(this.baseData , data , {time: new Date().getTime})

    let header = {
      type: 'application/x-www-form-urlencoded'
    }
    let blobData = new Blob([JSON.stringify(params)], header)

    navigator.sendBeacon(this.baseData.requestURL, blobData)
  }

  // 手动上报
  public manualTrackerMsg<T> (data: T){
    this.reportMessage(data)
  }
}