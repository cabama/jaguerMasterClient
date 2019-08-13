import * as React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MoveToInbox from '@material-ui/icons/MoveToInbox'
import InsertChart from '@material-ui/icons/InsertChart'

import { useRouter } from 'Shared/router'

type DrawerComponentType = {
  open: boolean
  onOpenChange: () => void
}

// onClick = {() => router.history.push('team/' + props.team['Codigo_equipo'])}

export const DrawerComponent: React.FunctionComponent<DrawerComponentType> = (props) => {

  const router = useRouter()

  const handleClick = () => {
    router.history.push('dashboard')
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={props.open}
    >
      <div>
        <IconButton onClick={props.onOpenChange}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button key="Dashboard" onClick={handleClick}>
          <ListItemIcon><InsertChart /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
      </List>
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><MoveToInbox /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
