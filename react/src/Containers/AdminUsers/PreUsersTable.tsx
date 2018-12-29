
import * as React from 'react'
import { TableHead, Table, TableRow, TableCell, TableBody } from '@material-ui/core'
import { UserType } from 'types/users';

export type IProps = {
  preusers: UserType[]
}

export const PreUsersTable = (props: IProps) => {
  return (<Table>
    <TableHead>
      <TableRow>
        <TableCell>Nombre</TableCell>
        <TableCell>Email</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {props.preusers.map((user, index) => {
        return (
          <TableRow key={'row' + index}>
            <TableCell>{user.name + ' ' + user.surname}</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>)
}