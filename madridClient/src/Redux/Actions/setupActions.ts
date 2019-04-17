
export enum SetupTypes {
  openDrawable = 'OPEN_DRAWABLE',
  closeDrawable = 'CLOSE_DRAWABLE',
  changeDrawableView = 'CHANGE_DRAWABLE_VIEW',
  changeDevice = 'CHANGE_DEVICE_VIEW',
  setDevice = 'SET_DEVICE_VIEW',
}

export interface ISetUpActions {
  type: SetupTypes
  action: {
    device?: 'mobile' | 'tablet' | 'desktop',
    isMobile?: boolean,
    isDrawableVisible?: boolean,
  }
}

export const setDevice = (mobileView: 'mobile' | 'tablet' | 'desktop') => {
  return {
    type: SetupTypes.setDevice,
    isMobile: mobileView,
  }
}

export const UserActions = {
  setDevice
}
