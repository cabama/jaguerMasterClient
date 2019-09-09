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
    <div style={{width: '100%', marginBottom: '70px ' }}>
      { matches.map((match, key) => (
        <Grid container  justify="center" >
          <Grid item xs={11} sm={10} md={9} xl={8} key={'match-' + key}>
            <MatchCard match={match}/>
          </Grid>
      </Grid>
        )
      )}
    </div>
  )
}
