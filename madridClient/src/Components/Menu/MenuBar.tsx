import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import * as React from 'react'

export function MenuBar (props: any) {
  return (
    <div >
      <AppBar position="fixed" style={{height: '65px'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={props.changeDrawableView}
          >
            <MenuIcon />
          </IconButton>
          <h4 style={{flexGrow: 1}}>Juegos Deportivos Municipales</h4>
        </Toolbar>
      </AppBar>
    </div>
  )
}
