import { Grid } from '@material-ui/core'
import * as React from 'react'
import { LeftMenu } from '../../Components/LeftMenu/LeftMenu'
import { MenuBar } from '../../Components/Menu/MenuBar'
import { DeviceType } from '../../Redux/Store/setupStore'
import { SetupTypes } from '../../Redux/Actions/setupActions'
import { connect } from 'react-redux'
import { SnackBar, SnackbarProps } from '../../Components/SnackBar/SnackBar'

const AppStyle: React.CSSProperties = {
  flexGrow: 1,
  zIndex: 1,
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
}

const MainStyle = (isMenuBar: boolean): React.CSSProperties => ({
  marginTop: (isMenuBar === true) ? '65px' : '0',
  flexGrow: 1,
  minWidth: 0,
  paddingTop: (isMenuBar === true) ? '10px' : '0',
  paddingBottom: '10px',
})

interface IProps extends IDispatchProps {
  MenuBar: boolean
  SideMenu: boolean
  className?: string
  snackbar?: SnackbarProps

}

class View extends React.Component<IProps> {

  getSnackBar = (snackbar: SnackbarProps | undefined) => {
    if (snackbar && snackbar.visible) {
      console.log('hay snackebar')
      return <SnackBar {...snackbar} />
    }
    else return <div></div>
  }

  public render() {
    console.log('renderProps', this.props)
    return (<div className={`View ${this.props.className}`}>
      {this.getMenuBar()}
      <div style={{ ...AppStyle, height: 'calc(100% - 56px)' }}>
        {this.getSideMenu()}
        <Grid container={true} justify="center" style={MainStyle(this.props.MenuBar)}>
          {this.props.children}
          {this.getSnackBar(this.props.snackbar)}
        </Grid>
      </div>
    </div>)
  }

  private getSideMenu() {
    return this.props.SideMenu
      ? <LeftMenu />
      : null
  }

  private getMenuBar() {
    return this.props.MenuBar
      ? <MenuBar />
      : null
  }
}


interface IStateToProps {
  state: { user: any },
}

const mapStateToProps: (state: any) => IStateToProps = (state: any) => {
  return {
    state: {
      user: state.user,
    },
  }
}

interface IDispatchProps {
  dispatch: {
    setDevice: ((device: DeviceType) => any),
  },
}

const mapDispatchToProps: (dispatch: any) => IDispatchProps = (dispatch: any) => {
  return {
    dispatch: {
      setDevice: (device: DeviceType) =>
        dispatch({
          type: SetupTypes.setDevice,
          action: {
            device
          },
        }),
    },
  }
}


const ViewRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)


export default ViewRedux
