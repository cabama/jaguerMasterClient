import * as React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { Fetch } from '../../Services/FetchService'
import { UserType } from '../../types/users'
import { PreUsersTable } from './PreUsersTable'
import View from '../View/View'


type IProps = any
type IState = {
  preUsers: UserType[],
  users: object[]
}

export class AdminUsers extends React.Component<IProps, IState> {

  constructor(props: IProps, state: IState) {
    super(props, state)
    this.state = {
      preUsers: [],
      users: []
    }
    this.fetchPreUsers()
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
  }

  public render() {
    return (
      <View MenuBar={true} SideMenu={true}>
        <Grid container={true} spacing={16} justify="center" alignItems="center">
          <Grid item={true} xs={11} xl={6}>
            <Paper>
              <PreUsersTable preusers={this.state.preUsers} />
            </Paper>
          </Grid>
        </Grid>
      </View>
    )
  }

}