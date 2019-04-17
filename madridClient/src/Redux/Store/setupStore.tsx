export type DeviceType = 'mobile' | 'tablet' | 'desktop'

export interface ISetUpStore {
  device: DeviceType
  isMobile: boolean
  isDrawableVisible: boolean
}

export const defaultSetUpStore: ISetUpStore = {
  device: 'mobile',
  isMobile: /android.+mobile|ip(hone|[oa]d)/i.test(navigator.userAgent),
  isDrawableVisible: false,
}
