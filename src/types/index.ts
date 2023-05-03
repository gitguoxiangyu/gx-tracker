/**
 * @requstURL 埋点上报接口地址
 * @historyTracker history上报
 * @hashTracker hash上报
 * @domTracker 携带Tracker-key 点击事件上报
 * @sdk sdk版本
 * @extra 透传字段
 * @jsError js异常上报
 */
export interface Option {
  uuid: string | undefined,
  requestURL: string | undefined,
  historyTracker: boolean,
  hashTracker: boolean,
  domTracker: boolean,
  sdkVersion: string | number,
  extra: Record<string , any> | undefined,
  jsError: boolean
}

export interface SelectableOption extends Partial<Option>{
  requestURL: string
}