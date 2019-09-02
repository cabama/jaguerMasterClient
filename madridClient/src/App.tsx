import * as React from 'react'
import * as colors from '@material-ui/core/colors'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { RouterComponent } from 'Components/Router/RouterView'
import * as ReactGA from 'react-ga'

const theme = createMuiTheme({
  palette: {
    primary: colors.blue,
    secondary: colors.blueGrey,
    background: {
      default: colors.grey[50]
    }
  }
})

class App extends React.Component {
  constructor(props: any) {
    super(props)
  }

  public componentDidMount() {
    console.log('APP - Component didmount')
  }

  public render() {
    ReactGA.initialize('UA-146892597-1')
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <RouterComponent />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
