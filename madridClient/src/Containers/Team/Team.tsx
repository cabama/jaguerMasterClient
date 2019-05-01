import * as React from 'react'
import { JagerFetch } from '../../Services/FetchService'
import { View } from '../../Components/View/View'
import { MenuElement } from '../../Components/LeftMenu/LeftMenu'
import { SnackBarContext } from '../../Components/SnackBar/SnackBar'
import { useRouter } from '../../Shared/router'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper/Paper'
import Inbox from '@material-ui/icons/Inbox'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const { useState, useContext, useEffect } = React

const fetchTeams = (teamId: string): Promise<any> => {
  return new Promise((res, rej) => {
    const formData = new FormData()
    formData.append('teamId', teamId)
    if (!teamId) rej('No team Id')

    JagerFetch({
      url: 'http://localhost:2525/api/team/getTeamById',
      init: {
        method: 'POST',
        body: formData
      }
    }).then(response => {
      response.json().then(value => {
        res(value)
      })
    })
  })
}

const Tournaments = (props: { tours: any[], team: string }) => {

  const router = useRouter()
  const goToTournament = (team: string, tour: any) => {
    const tournamentId = [tour.Codigo_temporada, tour.Codigo_competicion, tour.Codigo_grupo, tour.Codigo_fase].join('-')
    router.history.push(`/tournament/${team}/${tournamentId}`)
  }

  return (
    <div>
      {props.tours && typeof props.tours === 'object'
        ? props.tours.map((tournament, index) =>
            <ListItem button component="a" onClick={() => goToTournament(props.team, tournament)}>
              <ListItemText
                key={index}
                primary={`${tournament.Nombre_grupo} - ${tournament.Nombre_fase}`}
              />
            </ListItem>
          )
        : undefined}
    </div>
  )
}

export const TeamPage = () => {
  const snackBar = useContext(SnackBarContext)
  const router = useRouter()
  const [teamId, setTeamId] = useState('')
  const [team, setTeam] = useState({} as any)
  const params = router.match.params as any
  if (teamId !== params.teamId) setTeamId(params.teamId)

  useEffect(
    () => {
      fetchTeams(teamId)
        .then((value: any) => {
          setTeam({ ...value.team, tournaments: value.tournaments as any[] })
        })
        .catch(error => snackBar.openSnackbar(error.message))
    },
    [teamId]
  )

  const menuElements: MenuElement[] = [
    { title: 'La Liga', icon: Inbox, path: '/kf' }
  ]

  return <View MenuBar={true} SideMenu={false} >
      <Paper style={{ width: '90%' }}>
        <Typography component="h5" variant="h5">
          {team.Nombre_equipo}
        </Typography>

        <p>
          {team.Nombre_deporte}
        </p>
        <p>
          {team.Nombre_categoria}/{team['Nombre-Sexo']}
        </p>
        <Tournaments team={team.Codigo_equipo} tours={team.tournaments as any[]} />
      </Paper>
    </View>
}
