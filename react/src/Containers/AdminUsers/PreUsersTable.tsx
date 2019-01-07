
import * as React from 'react'
import {
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from '@material-ui/core'
import { UserType } from 'types/users';
import { PreUserToolbar } from './PreUsersToolbar'
import { UserToolbar } from './UsersToolbar';

export type IProps = {
  users: UserType[]
  actions: {[x: string]: Function}
  toolbar: any
}

export type IState = {
  selected: number
  preusers: (UserType & {selected: boolean}) []
}


class UserTable extends React.Component<IProps, IState> {

  constructor (props: IProps, state: IState) {
    super(props, state)
    this.state = {
      selected: -1,
      preusers: this.props.users.map(user => ({ ...user, selected: false }))
    }
  }

  componentWillReceiveProps(newProps: IProps) {
    this.setState({
      preusers: newProps.users.map(user => ({ ...user, selected: false }))
    })
  }

  onClickUser = (index: number) => {
    const oldValue = this.state.preusers[index].selected
    const newUserState = this.state.preusers.map(user => ({ ...user, selected: false}))
    newUserState[index].selected = !oldValue
    this.setState({
      selected: !oldValue ? index : -1,
      preusers: newUserState
    })
  }

  render() {
    const selected = this.state.selected > -1 ? this.state.preusers[this.state.selected] : null
    return (<div>
      <this.props.toolbar selected={selected} actions={this.props.actions}/>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.preusers.map((user, index) => {
            return (
              <TableRow key={'row' + index}>
                <TableCell padding="checkbox">
                  <Checkbox checked={user.selected} onClick={() => this.onClickUser(index)} />
                </TableCell>
                <TableCell>{user.name + ' ' + user.surname}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>)
  }
}

type PreUserTableProps = {
  users: UserType[],
  actions: {
    addPreUserAction: Function,
    delPreUserAction: Function
  }
}

type UserTableProps = {
  users: UserType[],
  actions: {
    addPreUserAction: Function,
    delPreUserAction: Function
  }
}

export const PreUsersTable = (props: PreUserTableProps) => <UserTable {...props} toolbar={PreUserToolbar}/>
export const UsersTable = (props: UserTableProps) => <UserTable {...props} toolbar={UserToolbar}/>