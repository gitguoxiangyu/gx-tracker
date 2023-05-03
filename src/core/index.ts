import { Option , SelectableOption } from '../types/index'

export default class Tracker{
  public baseData: SelectableOption;

  constructor(options : SelectableOption){
    // 将默认配置和传入配置合并
    this.baseData = Object.assign(this.initDefault(),options)
  }

  // 默认初始化baseData
  private initDefault (): Option{
    return <Option>{
      sdkVersion: '1.0.0',
      historyTracker: false,
      hashTracker: false,
      domTracker: false,
      jsError: false
    }
  }
}