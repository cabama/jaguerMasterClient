import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { Card, CardContent, Paper, IconButton } from '@material-ui/core'
import { ITeamMatch } from 'Types/TeamMatch'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'

type MatchCardProps = {
  match: ITeamMatch
}

type IJornadaFilter = React.FunctionComponent<{
  jornada: number,
  jornadaMax: number
  setJornada: (jornada: number) => void
}>

const JornadaSelectorStyle: React.CSSProperties = {
  display: 'flex',
  position: 'fixed',
  height: '50px',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'flex-end'
}

const JornadaFilter: IJornadaFilter = (props) => {

  const nextJornada = () => {
    if (props.jornada >= props.jornadaMax) return
    props.setJornada(props.jornada + 1)
  }

  const beforeJornada = () => {
    if (props.jornada < 0) return
    props.setJornada(props.jornada - 1)
  }

  return (
    <Paper style={JornadaSelectorStyle}>
      <IconButton> <ArrowLeft onClick={() => { beforeJornada() }}/></IconButton>
      Jornada {props.jornada}
      <IconButton> <ArrowRight onClick={() => { nextJornada() }}/></IconButton>
    </Paper>
  )
}

export const MatchCard = (props: MatchCardProps) => {
  const { match } = props
  const date = new Date(match.Date)
  return (
      <Card style={{ margin: '10px 0px', width: '100%' }}>
        <CardContent>
          <p>Lugar: {match.Campo}</p>
          <p>Fecha: {date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
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

export const JornadaList = (props: MatchesListProps) => {
  const { matches } = props
  const [jornada, setJornada] = React.useState(1)
  const matchesFromJornada = matches.filter(match => match.Jornada === jornada)
  const jornadaMax = Math.max(...matches.map(m => m.Jornada) as any)
  return (
    <div style={{ width: '100%', marginBottom: '70px' }}>
      <JornadaFilter jornada={jornada} setJornada={setJornada} jornadaMax={jornadaMax}/>
      <div style={{ marginTop: '50px' }}>
      { matchesFromJornada.map((match, key) => (
        <Grid container  justify="center" >
          <Grid item xs={11} sm={10} md={9} xl={8} key={'match-' + key}>
            <MatchCard match={match}/>
          </Grid>
        </Grid>
      )
      )}
      </div>
    </div>
  )
}
