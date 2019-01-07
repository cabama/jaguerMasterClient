import * as React from 'react'
import { Snackbar, SnackbarContent, withTheme, WithTheme } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import {
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  Info,
  Close
} from '@material-ui/icons'
import { SnackBarStyle } from './SnackBarStyle'

export type SnackbarProps = {
  visible: boolean
  message?: string
  anchorOrigin?: { vertical: any, horizontal: any }
  duration?: number
  variant?: 'success' | 'warning' | 'error' | 'info'
} & Partial<WithTheme>

type IState = {
  visible: boolean
}

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: ErrorIcon,
  info: Info,
};

class SnackbarView extends React.Component<SnackbarProps, IState> {

  constructor(props: SnackbarProps) {
    super(props)
    this.state = {
      visible: this.props.visible
    }
  }

  public handleClose = (event: any, reason: string)  => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ visible: false });
  }

  public render() {

    if (!this.state.visible) return (<div />)

    const anchorOrigin = this.props.anchorOrigin || { vertical: 'bottom', horizontal: 'right' }
    const message = this.props.message || ''
    const duration = this.props.duration || 1000
    const variant = this.props.variant || 'info'
    const style = SnackBarStyle(this.props.theme!)
    const Icon = variantIcon[variant];

    return (
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={this.state.visible}
        autoHideDuration={duration}
        onClose={this.handleClose}

      >
        <SnackbarContent
          className={`SNACK ${style[variant]}`}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar">
              <Icon className={`${style.icon} ${style.iconVariant}`} />
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => { }}
            >
              <Close className={style.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>

    )
  }
}

export const SnackBar = withTheme()(SnackbarView)