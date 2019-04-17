import * as React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {Match} from './Match'

interface IProps {
  match: Match
}

export class MatchCard extends React.Component<IProps> {

  public render (){
    const match = this.props.match
    const fecha = new Date(match.fecha)
    return (
      <Card style={{ width: '100%' }}>
        <CardContent>
          <p>Lugar: {match.campo.campo}</p>
          <p>Fecha: {fecha.toLocaleDateString()} {fecha.toLocaleTimeString()}</p>
          <p>Local: {match.local}</p>
          <p>Visitante: {match.visitante}</p>
          <p>Resultado Local: {match.resultadoLocal}</p>
          <p>Resultado Visitante: {match.resultadoVisitante}</p>
        </CardContent>
      </Card>
    )
  }
}