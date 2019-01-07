import * as React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { Fetch } from '../../Services/FetchService'
import { UserType } from '../../types/users'
import { PreUsersTable, UsersTable } from './PreUsersTable'
import View from '../View/View'

type IProps = any
type IState = {
  preUsers: UserType[],
  users: UserType[]
  snackbar: any
}

export class AdminUsers extends React.Component<IProps, IState> {

  constructor(props: IProps, state: IState) {
    super(props, state)
    this.state = {
      preUsers: [],
      users: [],
      snackbar: {
        visible: false
      }
    }
    this.updateTables()
  }

  public updateTables () {
    this.fetchPreUsers()
    this.fetchUsers()
  }

  public fetchPreUsers = () => {
    const requestInit: RequestInit = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
    }
    return new Fetch().fetch({
      path: 'users/allPreUsers',
      init: requestInit,
    })
      .then(resp => resp.json())
      .then(preUsers => this.setState({ preUsers }))
      .catch(error => this.setState({
        snackbar: {
          visible: true,
          variant: 'error',
          message: 'Error preuser: ' + error
        }
      }))
  }

  public acceptPreUser = (email: string) => {
    const body = new FormData()
    body.append('email', email)
    const requestInit: RequestInit = {
      method: 'POST',
      mode: 'cors',
      body
    }
    return new Fetch().fetch({
      path: 'login/acceptUser',
      init: requestInit,
    })
      .then(preUsers => {
        this.setState({
          snackbar: {
            visible: true,
            message: 'User added'
          }
        })
        this.updateTables()
      })
      .catch(error => this.setState({
        snackbar: {
          visible: true,
          variant: 'error',
          message: 'Error preuser: ' + error
        }
      }))
  }

  public removePreUser = (email: string) => {
    const body = new FormData()
    body.append('email', email)
    const requestInit: RequestInit = {
      method: 'POST',
      mode: 'cors',
      body
    }
    return new Fetch().fetch({
      path: 'login/removePreUser',
      init: requestInit,
    })
      .then(preUsers => {
        this.setState({
          snackbar: {
            visible: true,
            message: 'User removed'
          }
        })
        this.updateTables()
      })
      .catch(error => this.setState({
        snackbar: {
          visible: true,
          variant: 'error',
          message: 'Error preuser: ' + error
        }
      }))
  }

  public fetchUsers = () => {
    const requestInit: RequestInit = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
    }
    return new Fetch().fetch({
      path: 'users/all',
      init: requestInit,
    })
      .then(resp => resp.json())
      .then(users => this.setState({ users }))
      .catch(error => this.setState({
        snackbar: {
          visible: true,
          variant: 'error',
          message: 'Error users: ' + error
        }
      }))
  }

  public render() {
    console.log('snackbar', this.state.snackbar)
    return (
      <View MenuBar={true} SideMenu={true} snackbar={this.state.snackbar}>
        <Grid container={true} spacing={16} justify="center" alignItems="center">
          <Grid item={true} xs={11} xl={6}>
            <Paper>
              {PreUsersTable({
                users: this.state.preUsers,
                actions: {
                  addPreUserAction: this.acceptPreUser,
                  delPreUserAction: this.removePreUser
                }
              }
              )}
            </Paper>
            <Paper style={{marginTop: '20px'}}>
              {UsersTable({
                users: this.state.users,
                actions: {
                  addPreUserAction: this.acceptPreUser,
                  delPreUserAction: () => {}
                }
              }
              )}
            </Paper>
          </Grid>
        </Grid>
      </View>
    )
  }

}
