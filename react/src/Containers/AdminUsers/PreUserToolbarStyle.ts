import { style } from 'typestyle'

export const toolbarStyle = (theme: any) => ({

  root: style({
    paddingRight: theme.spacing.unit,
  }),

  spacer: style({
    flex: '1 1 100%',
  }),

  title: style({
    flex: '1 1 100%',
  }),

  actions: style({
    display: 'flex',
    color: theme.palette.text.secondary,
  }),

  highlight: style({
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.dark,
  }),

})