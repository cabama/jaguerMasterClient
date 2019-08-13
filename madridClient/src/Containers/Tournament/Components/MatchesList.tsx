import * as React from 'react'
import { Card, CardContent } from '@material-ui/core'
import { IMatch } from 'Types/TeamMatch'

type MatchCardProps = {
  match: IMatch
}

export const MatchCard = (props: MatchCardProps) => {
  const { match } = props
  const date = new Date(match.Date)
  return (
    <div>
      <Card style={{ width: '100%' }}>
        <CardContent>
          <p>Lugar: {match.Campo}</p>
          <p>Fecha: {date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
          <p>Local: {match.Equipo_local}</p>
          <p>Visitante: {match.Equipo_visitante}</p>
          <p>Resultado Local: {match.Resultado1}</p>
          <p>Resultado Visitante: {match.Resultado2}</p>
        </CardContent>
      </Card>
    </div>
  )
}

type MatchesListProps = {
  matches: IMatch[]
}

export const MatchesList = (props: MatchesListProps) => {
  const { matches } = props
  return (
    <ul>
      <li>
        {
          matches.map(match => <MatchCard match={match}/>)
        }
      </li>
    </ul>
  )
}
