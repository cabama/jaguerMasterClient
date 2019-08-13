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

const fetchTeams = (teamName: string): Promise<any> => {
  return new Promise((res, rej) => {
    const formData = new FormData()
    formData.append('team', teamName)
    if (!teamName) return

    JagerFetch({
      url: jagerServiceBaseUrl + '/api/team/getTeamsByName',
      init: {
        method: 'POST',
        body: formData
      }
    })
      .then(response => {
        response.json().then(value => {
          res({ succes: true, data: value })
        })
      })
      .catch(error => {
        rej({ succes: false, data: { error } })
      })
  })
}

export const MainPage = () => {
  const [teamName, setTeamName] = useState('')
  const [fetch, setFetched] = useState({ succes: true, data: {} as any })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(
    () => {
      debounceFunction(fetchTeams, teamName, 1000)
        .then((value: any) => {
          setFetched(value)
        })
        .catch(setFetched)
    },
    [teamName]
  )

  if (fetch.succes === false) {
    setFetched({ ...fetch, succes: true })
  }

  return <View MenuBar={true} SideMenu={false}>
      <div style={{ width: 'calc(90% - 20px)', padding: '10px' }}>
        <Typography component="h4" variant="h4">
          Introduzca su equipo:
        </Typography>
        <TextField label="Nombre del equipo" value={teamName} fullWidth={true} onChange={e => setTeamName(e.target.value)} margin="normal" />
        { fetch.data && fetch.data.team
          ? <TeamsFounded teams={fetch.data.team}/>
          : undefined
        }
        <TablePagination
          component="nav"
          page={page}
          rowsPerPage={rowsPerPage}
          count={100}
          onChangePage={(_, page) => setPage(page)}
          onChangeRowsPerPage={(value) => setRowsPerPage(parseInt(value.target.value, 10))}
        />
      </div>
    </View>
}
