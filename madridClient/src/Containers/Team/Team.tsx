import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { JagerFetch } from '../../Services/FetchService'
import { View } from '../../Components/View/View'
import { useRouter } from '../../Shared/router'
import { jagerServiceBaseUrl } from '../../Enviroments'
import { TournamentCard } from './TournamentsCard'
import { useTheme } from '@material-ui/core'
const { useState, useEffect } = React

const fetchTeams = (nombreEquipo: string, deporte: string, categoria: string): Promise<any> => {
  return new Promise((res, rej) => {
    const formData = new FormData()
    formData.append('Nombre_equipo', nombreEquipo)
    formData.append('Nombre_deporte', deporte)
    formData.append('Nombre_categoria', categoria)
    JagerFetch({
      url: jagerServiceBaseUrl + '/api/team/getTeamTournaments',
      init: {
        method: 'POST',
        body: formData
      }
    }).then((response) => {
      response.json().then((value) => {
        res(value)
      })
    })
  })
}

export const TeamPage = () => {
  const theme = useTheme()
  const router = useRouter()
  const [tournament, setTournaments] = useState({} as any)
  const params = router.match.params && (router.match.params as any).teamInfo
  const [teamName, deporte, categoria] = params.split('::')

  useEffect(
    () => {
      fetchTeams(teamName, deporte, categoria)
        .then((value: any) => {
          setTournaments(value)
        })
    },
    []
  )
  if (!tournament || !tournament.equipo) return <div></div>

  return <View MenuBar={true} SideMenu={true} >
    <Typography component="h5" variant="h5" style={{ margin: '20px 0', width: '90%' }}>
      Equipo
    </Typography>
    <Card style={{ width: '90%' }}>
      <CardHeader
        disableTypography={true}
        subheader={tournament.equipo.Nombre_equipo}
        style={{
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText
        }}
      />
      <CardContent style={{ marginTop: 0 }}>
          Deporte: {tournament.equipo.Nombre_deporte || ''} <br/>
          Categoría:
          {tournament.equipo.Nombre_categoria || ''} /
          {tournament.equipo['Nombre-Sexo'] || ''}
      </CardContent>
    </Card>
    <Typography component="h5" variant="h5" style={{ margin: '20px 0', width: '90%' }}>
      Competiciones
    </Typography>
    {
      Object.keys(tournament.competiciones).map((nombreCompeticion) => {

        const competicion = tournament.competiciones[nombreCompeticion]

        return (
          <TournamentCard
            key={competicion.Codigo_equipo}
            tournamentName={nombreCompeticion}
            teamId={ competicion.Codigo_equipo }
            teamName={ competicion.Nombre_equipo }
            tours={ competicion.tournaments as any[] }
          />
        )
      })
    }
  </View>
}
