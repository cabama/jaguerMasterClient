import { Grid } from '@material-ui/core'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Containers
import { MainPage } from '../../Containers/Main/Main'
import { TeamPage } from '../../Containers/Team/Team'
import { TournamentPage } from '../../Containers/Tournament/Tournament'

export class RouterComponent extends React.Component<any> {

  a = () => {
    console.log('asdf')
  }

  public render() {
    return <Grid item={true} xs={12} sm={12} md={12}>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={MainPage} />
            <Route exact={true} path="/team/:teamId" component={TeamPage} />
            <Route exact={true} path="/tournament/:teamId/:tournamentId" component={TournamentPage} />
          </Switch>
        </Router>
      </Grid>
  }
}

