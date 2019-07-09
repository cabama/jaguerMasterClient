import * as React from 'react'
import { JagerFetch } from '../../Services/FetchService'
import { View } from '../../Components/View/View'
import { SnackBarContext } from '../../Components/SnackBar/SnackBar'
import { useRouter } from '../../Shared/router'
import { jagerServiceBaseUrl } from '../../Enviroments'
import { TeamRank } from '../../types/TeamRank'

import { RankingTable } from './Components/RankingTable'


import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import TableChart from '@material-ui/icons/TableChart'
import CalendarToday from '@material-ui/icons/CalendarToday'

enum navigationView {
  'clasificacion',
  'resultados',
  'partidos'
}

const { useState, useContext, useEffect } = React

const fetchTournamentRanking = (teamId: string, tournament: string[]): Promise<TeamRank> => {
  const [temporada, competicion, grupo, fase] = tournament
  const url = jagerServiceBaseUrl + '/api/tournament/ranking'
  return new Promise((res, rej) => {
    if (!teamId || !tournament) rej('No team Id')
    const urlQueryParams = `${url}?temporada=${temporada}&competicion=${competicion}&grupo=${grupo}&fase=${fase}`
    JagerFetch({
      url: urlQueryParams,
      init: {
        method: 'GET',
      }
    }).then(response => {
      response.json().then(value => {
        res(value)
      })
    })
  })
}

export const TournamentPage = () => {
  const snackBar = useContext(SnackBarContext)
  const router = useRouter()
  const [tournamentRanking, setTournamentData] = useState([] as TeamRank[])
  const [navigation, setNavigation] = useState(navigationView.clasificacion)
  console.log('tournamentData', tournamentRanking)

  useEffect(() => {
    const params = router.match.params as any
    const teamId = params.teamId
    const tournament = (params.tournamentId as string).split('-')
    
    fetchTournamentRanking(teamId, tournament)
      .then((value: any) => {
        setTournamentData(value)
      })
      .catch(error => snackBar.openSnackbar(error.message))
  }, [])

  const navigationHandle = (_: any, value: number) => {
    console.log('value', value)
    setNavigation(value)
  }

  return (
    <View MenuBar={true} SideMenu={false}>
      <div className="tournamentView" />

      <RankingTable ranking={tournamentRanking}/>

      <BottomNavigation
      style={{position: 'fixed', bottom: '0'}}
        value={navigation}
        onChange={navigationHandle}
        showLabels
      >
        <BottomNavigationAction label="Clasificacion" icon={<TableChart />} />
        <BottomNavigationAction label="Resultados" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Calendario" icon={<CalendarToday />} />
      </BottomNavigation>
    </View>
  )
}
