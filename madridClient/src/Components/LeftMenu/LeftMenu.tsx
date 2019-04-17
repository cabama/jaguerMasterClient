import * as React from 'react'
import MediaQuery from 'react-responsive'
import { LeftMenuDesktop } from './LeftMenuDesktop'
import { LeftMenuResposive } from './LeftMenuResposive'

// List Object
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

// Icons
import Inbox from '@material-ui/icons/Inbox'
import Today from '@material-ui/icons/Today'
import ScatterPlot from '@material-ui/icons/ScatterPlot'
import AccountCircle from '@material-ui/icons/AccountCircle'
import CompareArrows from '@material-ui/icons/CompareArrows'


const menuElements = [
  { title: 'Main', icon: Inbox, path: '/' },
  { title: 'Profile', icon: AccountCircle, path: '/profile' },
  { title: 'Clasificacion', icon: ScatterPlot, path: '/temporada' },
  { title: 'Resultados8', icon: CompareArrows, path: '/resultados' },
  { title: 'Calendario', icon: Today, path: '/calendario' },
]

const adminMenuElements = [
  { title: 'AdminUsers', icon: AccountCircle, path: '/adminUsers' },
]


export class LeftMenu extends React.Component<any> {

  public ListItems = (close: () => void) => {
    const commonElements = menuElements.map((element) => this.makeElementList({ ...element, close }))
    const adminElements = adminMenuElements.map((element) => this.makeElementList({ ...element, close }))
  
    if (true) return [...commonElements, <Divider />, ...adminElements]
    else return commonElements
  }

  public render () {
    return (
      <MediaQuery maxDeviceWidth={1224}>
        {(matches) => this.getDrawableMenu(matches)}
      </MediaQuery>
    )
  }

  handleCloseMenu = () => {
    console.log('Close Menu Again')
  }

  public getDrawableMenu = (matches: boolean) => {
    const visible = true
    const close = this.handleCloseMenu
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
