import * as React from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import { useTheme } from '@material-ui/core'
import { useRouter } from 'Shared/router'

type TournamentCardsProps = {
  tournamentName: string
  tours: any[]
  team: string
}
type ITournamentCard = React.FunctionComponent<TournamentCardsProps>

export const TournamentCard: ITournamentCard = (props) => {

  const router = useRouter()
  const theme = useTheme()

  const goToTournament = (team: string, tour: any) => {
    const tournamentId =
      [tour.Codigo_temporada, tour.Codigo_competicion, tour.Codigo_grupo, tour.Codigo_fase]
        .join('-')
    router.history.push(`/tournament/${team}/${tournamentId}`)
  }

  return (
    <Card style={{ width: '90%', margin: '10px 0' }}>
      <CardHeader
        disableTypography={true}
        subheader	={props.tournamentName}
        style={{
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText
        }}
      />
      <CardContent>
        {props.tours && typeof props.tours === 'object'
          ? props.tours.map((tournament, index) =>
          <div key={String(index)}>
            <ListItem button component="a" onClick={() => goToTournament(props.team, tournament)}>
              <ListItemText
                key={index}
                primary={`${tournament.Nombre_grupo} - ${tournament.Nombre_fase}`}
              />
            </ListItem>
            {(index !== (props.tours.length - 1)) ? <Divider /> : undefined }
          </div>
          )
          : undefined}
      </CardContent>
    </Card>
  )
}
