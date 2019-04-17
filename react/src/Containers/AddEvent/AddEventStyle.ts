import { style } from 'typestyle';

export const PaperStyle = (isMobile: boolean) => style({
  padding: '30px',
  width: '90%',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  $nest: {
    '& > *': {
      margin: '10px 0'
    },
    '& > .horizontal': {
      display: 'flex',
      flexDirection: isMobile ? 'column': 'row',
    },
    '& > .horizontal > *': {
      marginRight: '20px',
      marginBottom: isMobile ? '20px' : 'auto',
    },
    '& > .buttonForm': {
      display: 'flex',
      flexDirection: 'row-reverse'
    }
  }
})