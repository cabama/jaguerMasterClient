import * as React from 'react'
import { Fetch } from '../../Services/FetchService'

type IProps = any
type IState = {
  preUsers: object [],
  users: object []
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
    .then(preUsers => this.setState({preUsers}))
  }

  public render () {
    return (
      <div>
        <div>Billing Page</div>
        { this.state.preUsers.map((preuser,i) => (<p key={String(i)}>{JSON.stringify(preuser)}</p>)) }
      </div>
    )
  }

}
