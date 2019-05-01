import * as React from 'react'
import { JagerFetch } from '../../Services/FetchService'
import { View } from '../../Components/View/View'
import { SnackBarContext } from '../../Components/SnackBar/SnackBar'
import { useRouter } from '../../Shared/router'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'

enum navigationView {
  'clasificacion',
  'resultados',
  'partidos'
}

const { useState, useContext, useEffect } = React

const fetchTournamentInfo = (teamId: string, tournament: string[]): Promise<any> => {
  const [temporada, competicion, grupo, fase] = tournament
  return new Promise((res, rej) => {
    const formData = new FormData()
    formData.append('teamId', teamId)
    formData.append('temporada', temporada)
    formData.append('competicion', competicion)
    formData.append('grupo', grupo)
    formData.append('fase', fase)
    if (!teamId || !tournament) rej('No team Id')

    JagerFetch({
      url: 'http://localhost:2525/api/team/getTournamentData',
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

export const TournamentPage = () => {
  const snackBar = useContext(SnackBarContext)
  const router = useRouter()
  const [tournamentData, setTournamentData] = useState({})
  const [navigation, setNavigation] = useState(navigationView.clasificacion)

  useEffect(() => {
    const params = router.match.params as any
    const teamId = params.teamId
    const tournament = (params.tournamentId as string).split('-')
    
    fetchTournamentInfo(teamId, tournament)
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
      <BottomNavigation
      style={{position: 'fixed', bottom: '0'}}
        value={navigation}
        onChange={navigationHandle}
        showLabels
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </View>
  )
}
