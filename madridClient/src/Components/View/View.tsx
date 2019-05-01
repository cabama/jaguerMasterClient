import { Grid } from '@material-ui/core'
import * as React from 'react'
import { LeftMenu, MenuElement } from '../../Components/LeftMenu/LeftMenu'
import { MenuBar } from '../../Components/Menu/MenuBar'

const AppStyle: React.CSSProperties = {
  flexGrow: 1,
  zIndex: 1,
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row'
}

const MainStyle = (isMenuBar: boolean): React.CSSProperties => ({
  marginTop: isMenuBar === true ? '65px' : '0',
  flexGrow: 1,
  minWidth: 0,
  paddingTop: isMenuBar === true ? '10px' : '0',
  paddingBottom: '10px'
})

type IProps = {
  MenuBar: boolean
  SideMenu: boolean
  SidePageElements?: MenuElement[]
  className?: string
}

export class View extends React.Component<IProps> {
  public render() {
    return (
        <div className={`View ${this.props.className}`}>
          {this.getMenuBar()}
          <div style={{ ...AppStyle, height: 'calc(100% - 56px)' }}>
            {this.getSideMenu()}
            <Grid
              container={true}
              justify="center"
              style={MainStyle(this.props.MenuBar)}
            >
              {this.props.children}
            </Grid>
          </div>
        </div>
    )
  }

  private getSideMenu() {
    return this.props.SideMenu ? <LeftMenu menuElements={this.props.SidePageElements}/> : null
  }

  private getMenuBar() {
    return this.props.MenuBar ? <MenuBar /> : null
  }
}
