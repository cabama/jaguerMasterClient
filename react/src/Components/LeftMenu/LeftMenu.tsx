import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import { RouteComponentProps, withRouter } from 'react-router'
import { Dispatch } from 'redux'
import { SetupTypes } from '../../Redux/Actions/setupActions'
import { IUserStore } from '../../Redux/Store/userStore'
import { ISetUpStore } from '../../Redux/Store/setupStore'
import { LeftMenuDesktop } from './LeftMenuDesktop'
import { LeftMenuResposive } from './LeftMenuResposive'
import Divider from '@material-ui/core/Divider'

import {
  Inbox,
  Today,
  ScatterPlot,
  CompareArrows,
  AccountCircle,
} from '@material-ui/icons'

const menuElements = [
  { title: 'Main', icon: Inbox, path: '/' },
  { title: 'Profile', icon: AccountCircle, path: '/profile' },
  { title: 'Clasificacion', icon: ScatterPlot, path: '/temporada' },
  { title: 'Resultados', icon: CompareArrows, path: '/resultados' },
  { title: 'Calendario', icon: Today, path: '/calendario' },
]

const adminMenuElements = [
  { title: 'AdminUsers', icon: AccountCircle, path: '/adminUsers' },
]

type DrawableProps = IStateToProps & IDispatchToProps & RouteComponentProps

class Drawablemenu extends React.Component<DrawableProps> {

  constructor (props: DrawableProps, state: any) {
    super(props, state)
  }

  public ListItems = (close: () => void) => {
    const commonElements = menuElements.map((element) => this.makeElementList({ ...element, close }))
    const adminElements = adminMenuElements.map((element) => this.makeElementList({ ...element, close }))
  
    if (this.props.state.user.role === 'admin') return [...commonElements, <Divider />, ...adminElements]
    else return commonElements
  }

  public render () {
    return (
      <MediaQuery maxDeviceWidth={1224}>
        {(matches) => this.getDrawableMenu(matches)}
      </MediaQuery>
    )
  }

  public getDrawableMenu = (matches: boolean) => {
    const visible = this.props.state.setup.isDrawableVisible
    const close = this.props.dispatcher.closeMenu
    if (matches) return <LeftMenuResposive visible={visible} close={close} items={this.ListItems(close)}/>
    else return <LeftMenuDesktop visible={visible} close={close} items={this.ListItems(close)}/>
  }

  private makeElementList (element: { title: string, icon: React.ComponentType, path: string, close: () => void }) {
    const {title, icon, path, close } = element
    const onClose = () => {
      this.props.history.push(path)
      close()
    }
    return (
      <ListItem key={String(Math.random())} button={true} onClick={onClose}>
      <ListItemIcon>
        {React.createElement(icon)}
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
    )
  }

}

interface IStateToProps {
  state: {
    user: IUserStore,
    setup: ISetUpStore,
  }
}

const mapStateToProps = (state: any): IStateToProps => {
  return {
    state: {
      user: state.user,
      setup: state.setup,
    },
  }
}

interface IDispatchToProps {
  dispatcher: {
    closeMenu: () => void,
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => {
  return {
    dispatcher: {
      closeMenu: () => dispatch(
        { type: SetupTypes.closeDrawable },
      ),
    },
  }
}

export const LeftMenu = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawablemenu))
