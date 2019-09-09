import * as React from 'react'
import { default as MediaQuery } from 'react-responsive'
import { LeftMenuDesktop } from './LeftMenuDesktop'
import { useRouter } from '../../Shared/router'

// List Object
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

// Icons
import Inbox from '@material-ui/icons/Inbox'
import Search from '@material-ui/icons/Search'

export type MenuElement = {
  title: string
  icon: React.ComponentType
  path: string
}

type OnClose = { close: () => void }

type Props = {
  menuElements: MenuElement[] | undefined
}

const menuElements = [
  { title: 'Main', icon: Inbox, path: '/' },
  { title: 'Buscar Equipo', icon: Search, path: '/buscar' }
]

export const LeftMenu = (props: Props) => {
  const router = useRouter()

  const makeElementList = (element: MenuElement & OnClose) => {
    const { title, icon, path, close } = element
    const onClose = () => {
      router.history.push(path)
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

  const listItems = (close: () => void) => {
    const commonElements = menuElements.map(element =>
      makeElementList({ ...element, close })
    )
    const inPageElement = props.menuElements
      ? props.menuElements.map(element =>
        makeElementList({ ...element, close })
      )
      : []
    return [...commonElements, <Divider />, ...inPageElement]
  }

  const handleCloseMenu = () => {
    console.log('Close Menu Again')
  }

  const getDrawableMenu = (matches: boolean) => {
    const visible = true
    const close = handleCloseMenu
    if (matches) {
      return <div></div>
      // return (
      //   <LeftMenuResposive
      //     visible={visible}
      //     close={close}
      //     items={listItems(close)}
      //   />
      // )
    }
    return (
      <LeftMenuDesktop
        visible={visible}
        close={close}
        items={listItems(close)}
      />
    )
  }

  return (
    <MediaQuery maxDeviceWidth={1224}>
      {matches => getDrawableMenu(matches)}
    </MediaQuery>
  )
}
