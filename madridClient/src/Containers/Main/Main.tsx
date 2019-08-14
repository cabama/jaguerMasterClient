import * as React from 'react'
import TextField from '@material-ui/core/TextField/TextField'
import Typography from '@material-ui/core/Typography'
import TablePagination from '@material-ui/core/TablePagination'
import { JagerFetch } from 'Services/FetchService'
import { View } from 'Components/View/View'
import { jagerServiceBaseUrl } from '../../Enviroments'
import { TeamsFounded } from './TeamsFounded'

const { useState, useEffect } = React

let cacellTimeOut: any
const debounceFunction = (
  fn: (val: any) => Promise<any>,
  value: any,
  time: number
): Promise<any> => {
  return new Promise((res, rej) => {
    if (cacellTimeOut) clearTimeout(cacellTimeOut)
    cacellTimeOut = setTimeout(() => {
      fn(value).then(v => res(v)).catch(e => rej(e))
    }, time)
  })
}

const fetchTeams = (teamName: string, page: number, rowsPerPage: number): Promise<any> => {
  return new Promise((res, rej) => {
    const formData = new FormData()
    formData.append('team', teamName)
    formData.append('page', String(page))
    formData.append('rowsPerPage', String(rowsPerPage))
    // if (!teamName) return

    JagerFetch({
      url: jagerServiceBaseUrl + '/api/team/getTeamsByName',
      init: {
        method: 'POST',
        body: formData
      }
    })
      .then((response) => {
        response.json().then((value) => {
          res({ succes: true, data: value })
        })
      })
      .catch((error) => {
        rej({ succes: false, data: { error } })
      })
  })
}

export const MainPage = () => {
  const [teamName, setTeamName] = useState('')
  const [fetch, setFetched] = useState({ succes: true, data: {} as any })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(
    () => {
      debounceFunction(val => fetchTeams(val, page, rowsPerPage), teamName, 1000)
        .then((value: any) => {
          setFetched(value)
        })
        .catch(setFetched)
    },
    [teamName, rowsPerPage, page]
  )

  if (!fetch.succes) setFetched({ ...fetch, succes: true })

  return <View MenuBar={true} SideMenu={false}>
    <div style={{ width: 'calc(90% - 20px)', padding: '10px' }}>
      <Typography component="h4" variant="h4">
        Introduzca su equipo:
        </Typography>
      <TextField
        label="Nombre del equipo"
        value={teamName}
        fullWidth={true}
        margin="normal"
        onChange={e => setTeamName(e.target.value)}
      />
      {(!fetch.data || !fetch.data.team)
        ? undefined
        : (
          <div>
            <TeamsFounded teams={fetch.data.team} />
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 50]}
              component="nav"
              page={page}
              rowsPerPage={rowsPerPage}
              count={100}
              onChangePage={(_, p) => setPage(p)}
              onChangeRowsPerPage={value => setRowsPerPage(parseInt(value.target.value, 10))}
            />
          </div>
        )
      }
    </div>
  </View>
}
