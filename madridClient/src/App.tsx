import * as React from 'react'
import * as colors from '@material-ui/core/colors'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { RouterComponent } from 'Components/Router/RouterView'

const theme = createMuiTheme({
  palette: {
    primary: colors.blue,
    secondary: colors.blueGrey,
    background: {
      default: colors.common.white
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
