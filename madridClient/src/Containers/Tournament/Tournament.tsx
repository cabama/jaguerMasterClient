import * as React from 'react'
import { JagerFetch } from '../../Services/FetchService'
import { View } from '../../Components/View/View'
import { useRouter } from '../../Shared/router'
import { jagerServiceBaseUrl } from '../../Enviroments'

import { TeamRank } from '../../Types/TeamRank'
import { IMatch } from '../../Types/TeamMatch'

import { RankingTable } from './Components/RankingTable'
import { MatchesList } from './Components/MatchesList'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Restore from '@material-ui/icons/Restore'
import TableChart from '@material-ui/icons/TableChart'
import CalendarToday from '@material-ui/icons/CalendarToday'

enum navigationView {
  'clasificacion',
  'resultados',
  'partidos'
}

const { useState, useEffect } = React

const fetchTournamentRanking = (teamId: string, tournament: string[]): Promise<TeamRank> => {
  const [temporada, competicion, grupo, fase] = tournament
  const url = jagerServiceBaseUrl + '/api/tournament/ranking'
  return new Promise((res, rej) => {
    if (!teamId || !tournament) rej('No team Id')
    const urlQueryParams = `${url}?temporada=${temporada}&competicion=${competicion}&grupo=${grupo}&fase=${fase}`
    JagerFetch({
      url: urlQueryParams,
      init: {
        method: 'GET'
      }
    }).then(response => {
      response.json().then(value => {
        res(value)
      })
    })
  })
}

const fetchTournamentMatches = (tournament: string[]) => {
  const [temporada, competicion, grupo, fase] = tournament
  const url = jagerServiceBaseUrl + '/api/tournament/matches'
  return new Promise((res, rej) => {
    if (!tournament) rej('No tournament data')
    const urlQueryParams = `${url}?temporada=${temporada}&competicion=${competicion}&grupo=${grupo}&fase=${fase}`
    JagerFetch({
      url: urlQueryParams,
      init: {
        method: 'GET'
      }
    }).then(response => {
      response.json().then(value => {
        res(value)
      })
    })
  })
}

export const TournamentPage = () => {
  const router = useRouter()
  const [tournamentRanking, setTournamentData] = useState([] as TeamRank[])
  const [tournamentMatches, setTournamentMatches] = useState([] as IMatch[])
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

    fetchTournamentMatches(tournament)
      .then((value: any) => {
        setTournamentMatches(value)
      })
  }, [])

  const navigationHandle = (_: any, value: number) => {
    setNavigation(value)
  }

  return (
    <View MenuBar={true} SideMenu={false}>
      <div className="tournamentView" />

      <Content navigation={navigation}>
        <RankingTable ranking={tournamentRanking}/>
        <MatchesList matches={tournamentMatches}/>
      </Content>

      <BottomNavigation
        style={{ position: 'fixed', bottom: '0' }}
        value={navigation}
        onChange={navigationHandle}
        showLabels
      >
        <BottomNavigationAction label="Clasificacion" icon={<TableChart />} />
        <BottomNavigationAction label="Resultados" icon={<Restore />} />
        <BottomNavigationAction label="Calendario" icon={<CalendarToday />} />
      </BottomNavigation>
    </View>
  )
}

type ContentProps = {
  navigation: any
}

const Content: React.FunctionComponent<ContentProps> = (props) => {
  return props.children
    ? props.children[props.navigation] || <div></div>
    : <div></div>
}
