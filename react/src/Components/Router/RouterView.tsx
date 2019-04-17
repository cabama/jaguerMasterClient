import { Grid } from '@material-ui/core'
import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, RouteProps } from 'react-router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login } from '../../Containers/Login/Login'
import { Profile } from '../../Containers/Profile/Profile'
import { SignIn } from '../../Containers/SignIn/SignIn'
import { AddEvent } from '../../Containers/AddEvent/AddEvent'
import { UserTypes } from '../../Redux/Actions/UserActions'
import { AdminUsers } from '../../Containers/AdminUsers/AdminUsers'
import { IUserStore } from '../../Redux/Store/userStore'
import { Temporada } from '../../Containers/Temporada/Temporada'
import { Resultados, Calendario } from '../../Containers/Resultados/Resultados'
import { NewEventPage } from '../../Containers/NewEvent/NewEvent';

interface IPrivateRouteProps extends RouteProps {
  isAuth: boolean
  redirectComponent: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
  privateComponent: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}

const PrivateRoute = (props: IPrivateRouteProps) => {
  const routeProps = {...props}
  const component = props.isAuth
  ? props.privateComponent
  : props.redirectComponent
  routeProps.component = component
  return <Route exact={props.exact} path={props.path} component={component}/>
}

const Topics = () => (
  <div>Topics</div>
)

type MainViewComponentProps = IStateToProps & IDispatchProps

export class MainViewComponent extends React.Component<MainViewComponentProps> {

  constructor (props: MainViewComponentProps, context: any) {
    super(props, context)
  }

  public componentDidMount () {
    this.props.dispatch.loginWithToken()
  }

  public render () {
    const isAuth = this.props.state.user.login
    const isAdmin = isAuth && (this.props.state.user.role === 'admin')
    return (
      <Grid item={true} xs={12} sm={12} md={12}>
      <Router>
        <Switch>
            <Route exact={true} path="/" component={Temporada} />
            <PrivateRoute
              path="/profile"
              privateComponent={Profile}
              redirectComponent={Login}
              isAuth={isAuth}
            />
            <PrivateRoute
              path="/adminUsers"
              privateComponent={AdminUsers}
              redirectComponent={Login}
              isAuth={isAdmin}
            />
            <PrivateRoute
              path="/nuevoEvento"
              privateComponent={AddEvent}
              redirectComponent={Login}
              isAuth={isAdmin}
            />
            <Route path="/topics" component={Topics} />
            <Route path="/login" component={Login} />
            <Route path="/resultados" component={Resultados} />
            <Route path="/calendario" component={Calendario} />
            <Route path="/temporada" component={Temporada} />
            <Route path="/signIn" component={SignIn} />
          </Switch>
      </Router>
      </Grid>
    )
  }
}

interface IStateToProps {
  state: { user: IUserStore },
}

const mapStateToProps: (state: any) => IStateToProps = (state: any) => {
  return {
    state: {
      user: state.user,
    },
  }
}

interface IDispatchProps {
  dispatch: {
    loginWithToken: (() => any),
  },
}

const mapDispatchToProps: (dispatch: any) => IDispatchProps = (dispatch: any) => {
  return {
    dispatch: {
      loginWithToken: () =>
        dispatch({
          type: UserTypes.loginToken,
          action: {
            dispatch,
          },
        }),
    },
  }
}

export const MainView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainViewComponent)
