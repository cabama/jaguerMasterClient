import * as React from 'react'
import { Card, CardContent } from '@material-ui/core'
import {Match} from './Match'

interface IProps {
  match: Match
}

export class MatchCard extends React.Component<IProps> {

  public render (){
    const match = this.props.match
    const fecha = new Date(match.fecha).getUTCDate()
    return (
      <Card style={{ width: '100%' }}>
        <CardContent>
          <p>Lugar: {match.campo.campo}</p>
          <p>Fecha: {fecha}</p>
          <p>Local: {match.local}</p>
          <p>Visitante: {match.visitante}</p>
          <p>Resultado Local: {match.resultadoLocal}</p>
          <p>Resultado Visitante: {match.resultadoVisitante}</p>
        </CardContent>
      </Card>
    )
  }
}