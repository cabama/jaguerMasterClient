import * as React from 'react'
import {
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
  withTheme,
  WithTheme
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import { UserType } from 'types/users'
import { PersonAdd } from '@material-ui/icons'
import { toolbarStyle } from './PreUserToolbarStyle'


type IProps = {
  selected: UserType | null
  actions: {
    addPreUserAction: (email: string) => {},
    delPreUserAction: Function
}
} & WithTheme

class PreUserToolbarView extends React.Component<IProps> {

  public handleAddUser = () => {
    const email = this.props.selected!.email
    this.props.actions.addPreUserAction(email)
  }

  public handleRemoveUser = () => {
    const email = this.props.selected!.email
    this.props.actions.delPreUserAction(email)
  }


  public render() {
    const { selected } = this.props;
    const tbStyle = toolbarStyle(this.props.theme)
    console.log('tbstyle', tbStyle)

    return (
      <Toolbar
        className={`Toolbar ${tbStyle.root} ${tbStyle.highlight}`}
      >
        <div className={`classes.title ${tbStyle.title}`}>
          {!!selected ? (
            <Typography color="inherit" variant="subtitle1">
              {selected.name + ' ' + selected.surname}
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              Usuarios Registrados
            </Typography>
            )}
        </div>
        <div className={`classes.spacer ${tbStyle.spacer}`} />
        {!!selected ? (
          <div className={`classes.actions ${tbStyle.actions}`}>
            <Tooltip title="Delete">
              <IconButton aria-label="Delete" onClick={this.handleRemoveUser}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add user">
              <IconButton aria-label="Add user" onClick={this.handleAddUser}>
                <PersonAdd />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
            <div className={`classes.actions ${tbStyle.actions}`}></div>
          )}
      </Toolbar>
    )
  }
}

export const PreUserToolbar = withTheme()(PreUserToolbarView)
