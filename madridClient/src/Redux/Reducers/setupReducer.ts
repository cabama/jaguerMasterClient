import { ISetUpActions, SetupTypes } from '../Actions/setupActions'
import { defaultSetUpStore, ISetUpStore } from '../Store/setupStore'

export const SetupReducer = (state: ISetUpStore = defaultSetUpStore, action: ISetUpActions): ISetUpStore => {

  switch (action.type) {
    case SetupTypes.changeDevice:
      return { ...state, ...{isMobile: !state.isMobile}}
    case SetupTypes.setDevice:
      return { ...state, ...{ device: action.action.device || 'mobile' }}
    case SetupTypes.openDrawable:
      return { ...state, isDrawableVisible: true}
    case SetupTypes.changeDrawableView:
      return { ...state, isDrawableVisible: !state.isDrawableVisible}
    case SetupTypes.closeDrawable:
      return { ...state, isDrawableVisible: false}
    default:
      return state
  }
}
