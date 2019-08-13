import * as React from 'react'
// // List Object
// import Divider from '@material-ui/core/Divider'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// // Icons
// import Inbox from '@material-ui/icons/Inbox'
// import AccountCircle from '@material-ui/icons/AccountCircle'

// import { useRouter } from '../../Shared/router'
// import { DrawerComponent } from './LeftMenuResposive'

export type MenuElement = {
  title: string
  icon: React.ComponentType
  path: string
}

// type onClose = { close: () => void }

// type LeftMenuProps = {
//   menuElements: MenuElement[] | undefined
// }

// const menuElements = [
//   { title: 'Main', icon: Inbox, path: '/' },
//   { title: 'Profile', icon: AccountCircle, path: '/profile' }
// ]

// export const LeftMenu: React.FunctionComponent<LeftMenuProps> = (props) => {
//   const router = useRouter()

//   const makeElementList = (element: MenuElement & onClose) => {
//     const { title, icon, path, close } = element
//     const onClose = () => {
//       router.history.push(path)
//       close()
//     }
//     return (
//       <ListItem key={String(Math.random())} button={true} onClick={onClose}>
//         <ListItemIcon>
//           {React.createElement(icon)}
//         </ListItemIcon>
//         <ListItemText primary={title} />
//       </ListItem>
//     )
//   }

//   const listItems = (close: () => void) => {
//     const commonElements = menuElements.map(element =>
//       makeElementList({ ...element, close })
//     )
//     const inPageElement = props.menuElements
//       ? props.menuElements.map(element =>
//         makeElementList({ ...element, close })
//       )
//       : []
//     return [...commonElements, <Divider />, ...inPageElement]
//   }

//   // const handleCloseMenu = () => {
//   //   console.log('Close Menu Again')
//   // }

//   return (
//     <DrawerComponent
//       // visible={visible}
//       // close={close}
//       //items={listItems(close)}
//     />
//   )
// }

export const LeftMenu: React.FunctionComponent = () => {
  return (<div></div>)
}
