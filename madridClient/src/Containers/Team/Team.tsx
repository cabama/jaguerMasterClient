import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { JagerFetch } from '../../Services/FetchService'
import { View } from '../../Components/View/View'
import { useRouter } from '../../Shared/router'
import { jagerServiceBaseUrl } from '../../Enviroments'
import { TournamentCard } from './TournamentsCard';
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
    }).then(response => {
      response.json().then(value => {
        res(value)
      })
    })
  })
}

export const TeamPage = () => {
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

  // const menuElements: MenuElement[] = [
  //   { title: 'La Liga', icon: Inbox, path: '/kf' }
  // ]

  return <View MenuBar={true} SideMenu={true} >
    <Typography component="h5" variant="h5" style={{ margin: '20px 0', width: '90%' }}>
      Equipo
    </Typography>
    <Card style={{ width: '90%' }}>
      <CardHeader title={tournament.equipo.Nombre_equipo || ''}/>
      <CardContent style={{marginTop: 0}}>
          {tournament.equipo.Nombre_deporte || ''} <br/>
          {tournament.equipo.Nombre_categoria || ''} / {tournament.equipo['Nombre-Sexo'] || ''}
      </CardContent>
    </Card>
    <Typography component="h5" variant="h5" style={{ margin: '20px 0', width: '90%'}}>
      Competiciones
    </Typography>
    {
      Object.keys(tournament.competiciones).map((nombreCompeticion) => {

        const competicion = tournament.competiciones[nombreCompeticion]

        return (
          <TournamentCard
            tournamentName={nombreCompeticion}
            team={ competicion.Codigo_equipo }
            tours={ competicion.tournaments as any[] }
          />
        )
      })
    }
  </View>
}
