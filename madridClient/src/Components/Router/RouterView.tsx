import { Grid } from '@material-ui/core'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Containers
import { BuscarPage } from '../../Containers/Buscar/Buscar'
import { MainPage } from '../../Containers/Main/Main'
import { IndexTeamPage } from '../../Containers/SizeMap/Teams'
import { TeamPage } from '../../Containers/Team/Team'
import { TournamentPage } from '../../Containers/Tournament/Tournament'

export class RouterComponent extends React.Component<any> {
  public render() {
    return <Grid item={true} xs={12} sm={12} md={12}>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={MainPage} />
            <Route exact={true} path="/indice" component={IndexTeamPage} />
            <Route path="/buscar" component={BuscarPage} />
            <Route exact={true} path="/team/:teamInfo" component={TeamPage} />
            <Route
              exact={true}
              path="/tournament/:teamId/:tournamentId"
              component={TournamentPage}
            />
          </Switch>
        </Router>
      </Grid>
  }
}
