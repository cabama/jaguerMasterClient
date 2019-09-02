import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core'
import { MenuElement } from '../LeftMenu/LeftMenu'
import { MenuBar } from '../Menu/MenuBar'

const VIEW_STYLE: React.CSSProperties = {
  position: 'relative',
  height: '100%',
  width: '100%',
  minHeight: 'calc(100vh)'
}

const AppStyle: React.CSSProperties = {
  flexGrow: 1,
  zIndex: 1,
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row'
}

const footerStyle = (always: boolean): React.CSSProperties => (
  always
    ? { position: 'fixed', bottom: 0, zIndex: 99, width: '100%' }
    : { display: 'block', width: '100%' }
)

// const MainStyle = (isMenuBar: boolean): React.CSSProperties => ({
//   marginTop: isMenuBar === true ? '65px' : '0',
//   flexGrow: 1,
//   minWidth: 0,
//   paddingTop: isMenuBar === true ? '10px' : '0',
//   paddingBottom: '10px'
// })

type IProps = {
  MenuBar: boolean
  SideMenu: boolean
  SidePageElements?: MenuElement[]
  className?: string
  footer?: {
    alwaysVisible: boolean
    content: any
  }
}

export const View: React.FunctionComponent<IProps> = (props) => {
  const theme = useTheme()
  const getSideMenu = () => {
    return null
    // return this.props.SideMenu ? <LeftMenu menuElements={this.props.SidePageElements}/> : null
  }

  const getMenuBar = () => {
    return props.MenuBar ? <MenuBar /> : null
  }

  const getFooter = (footer?: {alwaysVisible: boolean, content: any}) => {
    if (!footer) return undefined
    return <div className="footer" style={footerStyle(footer.alwaysVisible)}>
      {footer.content || undefined}
    </div>
  }

  return (
    <div
      className={`View ${props.className}`}
      style={{ ...VIEW_STYLE, background: theme.palette.background.default }}
    >
      <div className="bar" style={{ display: 'block', width: '100%' }}>
        {getMenuBar()}
      </div>
      <div style={{ ...AppStyle, paddingTop: '65px' }}>
        {getSideMenu()}
        <Grid
          container={true}
          justify="center"
        >
          {props.children}
        </Grid>
      </div>
      { getFooter(props.footer) }
    </div>
  )
}
