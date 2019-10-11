import * as React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { ITeamMatch } from 'Types/TeamMatch'
import Chip from '@material-ui/core/Chip'

const estadoMap = {
  A: 'Reprogramado',
  C: 'Comités de disciplina deportiva o de competición',
  F: 'Finalizado',
  S: 'Suspendido',
  N: 'No presentado',
  O: 'Aplazado',
  R: 'Acta no entregada'
}

import './JornadaMatchCardStyle.css'

interface IProps {
  match: ITeamMatch
}

export const JornadaMatchCard: React.FunctionComponent<IProps> = (props) => {
  const match = props.match
  const fecha = new Date(match.Date)
  return (
    <Card style={{ width: '100%', margin: '10px 0' }}>
      <CardContent>
        <div className="header-container">
          <div className="lugar-fecha-container">
            <div className="Lugar">Campo: {match.Campo}</div>
            <div className="Fecha">
              {fecha.toLocaleDateString()} {fecha.toLocaleTimeString()}
            </div>
          </div>
          <div className="estado-container">
            { estadoMap[match.Estado]
              ? <Chip size="small" label={estadoMap[match.Estado]}/>
              : undefined
            }
          </div>
        </div>
        <div className="resultado-container">
          <div className="resultado">
            <div className="marcador">{match.Resultado1}</div>
            <div className="equipo">{match.Equipo_local}</div>
          </div>
          <div className="separador">-</div>
          <div className="resultado">
            <div className="marcador">{match.Resultado2}</div>
            <div className="equipo">{match.Equipo_visitante}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
