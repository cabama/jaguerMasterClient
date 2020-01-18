import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from '@material-ui/icons/Menu'

type Props = {
  onClickMenuIcon: () => void
}

export const MenuBar: React.FunctionComponent<Props> = (props) => {
  return (
    <div >
      <AppBar position="fixed" style={{ height: '65px' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={props.onClickMenuIcon}
          >
            <Menu />
          </IconButton>
          <h4 style={{ flexGrow: 1 }}>Juegos Deportivos Municipales</h4>
        </Toolbar>
      </AppBar>
    </div>
  )
}
