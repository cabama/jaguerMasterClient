import Drawer from '@material-ui/core/Drawer/Drawer'
import Divider from '@material-ui/core/Divider'
import { StyleRulesCallback, withStyles } from '@material-ui/core/styles'
import * as React from 'react'

const styles: StyleRulesCallback = (theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'fixed',
    top: '65px',
    display: 'flex',
    width: '240px',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    top: '65px',
    width: 240,
    height: 'calc(100vh - 65px)',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
})

export function DrawerMenu (props: any) {

  const { classes } = props

  return (
    <Drawer
      style={{width: '240px'}}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
    >
      {props.items}
      <Divider />
    </Drawer>
  )
}

export const LeftMenuDesktop = withStyles(styles)(DrawerMenu)
