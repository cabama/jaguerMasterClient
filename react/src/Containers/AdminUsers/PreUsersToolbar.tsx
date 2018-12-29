import * as React from 'react'
import {
  Toolbar,
  Tooltip,
  Typography,
  IconButton
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import { UserType } from 'types/users'


type IProps = {
  selected: UserType | null
}

export const PreUserToolbar = (props: IProps) => {
  const { selected } = props;

  return (
    <Toolbar
      className={'.Toolbar'}
    >
      <div className={'classes.title'}>

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
      <div className={'classes.spacer'} />
      <div className={'classes.actions'}>
        {!!selected ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  )
}