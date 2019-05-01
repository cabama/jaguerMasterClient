import * as React from 'react'
import withTheme from '@material-ui/core/styles/withTheme'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Snackbar from '@material-ui/core/Snackbar/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { SnackBarStyle } from './SnackBarStyle'
import {
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  Info,
  Close
} from '@material-ui/icons'

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: ErrorIcon,
  info: Info
}

export const SnackBarContext = React.createContext({
  openSnackbar: (message: string, duration?: number, variant?: string) => {}
})

const SnackbarView = (props: any) => {
  const [visible, setVisible] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [variant, setVariant] = React.useState('info')
  const [duration, setDuration] = React.useState(1)
  const [children, setChildren] = React.useState()

  React.useEffect(() => { setChildren(props.children)}, [])

  const openSnackBar = (message: string, duration = 5000, variant = 'info') => {
    setVisible(true)
    setMessage(message)
    setVariant(variant)
    setDuration(duration)
  }

  const closeSnackBar = () => {
    console.log('Intentando cerrar el snack')
    setVisible(false)
  }

  const style = SnackBarStyle(props.theme)
  const Icon = variantIcon[variant]

  console.log('snackView rerender')

  return (
    <SnackBarContext.Provider value={{ openSnackbar: openSnackBar }}>
      <Snackbar
        open={visible}
        autoHideDuration={duration}
        onClose={closeSnackBar}
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
              onClick={() => closeSnackBar()}
            >
              <Close className={style.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  )
}

export const SnackBar = withTheme()(SnackbarView)
