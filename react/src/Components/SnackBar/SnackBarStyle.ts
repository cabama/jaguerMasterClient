import { style } from 'typestyle'
import { amber, green,  } from '@material-ui/core/colors';
import { Theme } from '@material-ui/core'

export const SnackBarStyle = (theme: Theme) => ({
  success: style({
    backgroundColor: green[600],
  }),
  error: style({
    backgroundColor: theme.palette.error.dark,
  }),
  info: style({
    backgroundColor: '#000',
    color: '#fff'
  }),
  warning: style({
    backgroundColor: amber[700],
  }),
  icon: style({
    fontSize: 15,
  }),
  iconVariant: style({
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  }),
  message: style({
    display: 'flex',
    alignItems: 'center',
  }),
});