import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { Card, CardContent } from '@material-ui/core'
import { ITeamMatch } from 'Types/TeamMatch'

type MatchCardProps = {
  match: ITeamMatch
}

export const MatchCard = (props: MatchCardProps) => {
  const { match } = props
  const date = new Date(match.Date)
  return (
      <Card style={{ margin: '20px 10px' }}>
        <CardContent>
          <p>Lugar: {match.Campo}</p>
          <p>Fecha: {date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
          <p>Local: {match.Equipo_local}</p>
          <p>Visitante: {match.Equipo_visitante}</p>
          <p>Resultado Local: {match.Resultado1}</p>
          <p>Resultado Visitante: {match.Resultado2}</p>
        </CardContent>
      </Card>
  )
}

type MatchesListProps = {
  matches: ITeamMatch[]
}

export const MatchesList = (props: MatchesListProps) => {
  const { matches } = props
  return (
    <Grid item xs={12}>
      { matches.map(match => <MatchCard match={match}/>) }
    </Grid>
  )
}
