import * as React from 'react'
import { RouterComponent } from './Components/Router/RouterView'
import * as colors from '@material-ui/core/colors'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { SnackBar } from './Components/SnackBar/SnackBar'

const theme = createMuiTheme({
  palette: {
    primary: colors.blue,
    secondary: colors.blueGrey
  },
  typography: {
    useNextVariants: true
  }
})

class App extends React.Component {
  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    console.log('APP - Component didmount')
  }

  public render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <SnackBar>
            <RouterComponent />
          </SnackBar>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
