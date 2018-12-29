
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

export type IProps = {
  preusers: UserType[]
}

export type IState = {
  selected: number
  preusers: (UserType & {selected: boolean}) []
}


export class PreUsersTable extends React.Component<IProps, IState> {

  constructor (props: IProps, state: IState) {
    super(props, state)
    this.state = {
      selected: -1,
      preusers: this.props.preusers.map(user => ({ ...user, selected: false }))
    }
  }

  componentWillReceiveProps(newProps: IProps) {
    this.setState({
      preusers: newProps.preusers.map(user => ({ ...user, selected: false }))
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
    return (<div>
      <PreUserToolbar selected={this.state.selected > -1 ? this.state.preusers[this.state.selected] : null} />
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