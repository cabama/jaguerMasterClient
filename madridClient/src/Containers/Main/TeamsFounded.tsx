import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import { style, media } from 'typestyle'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import { ITeam } from 'Shared/JdmTypes'
import { useRouter } from 'Shared/router'

const teamsFoundedStyle: React.CSSProperties = {
  display: 'flex',
  width: 'calc(90% + 20px)',
  marginBottom: '60px',
  flexFlow: 'wrap',
  justifyContent: 'space-between'
}

const teamCardStyle: React.CSSProperties = {
  width: '100%',
  marginTop: '10px'
}

const cardGrid = style(
  {
    padding: '0 10px',
    width: 'calc(50% - 20px)'
  },
  media({ minWidth: 0, maxWidth: 720 }, { width: 'calc(100% - 20px)' }),
  media({ minWidth: 720, maxWidth: 1080 }, { width: 'calc(50% - 20px)' }),
  media({ minWidth: 1080 }, { width: 'calc(33% - 20px)' })
)

const TeamCard = (props: {team: ITeam}) => {
  const router = useRouter()
  return (
    <Card style={teamCardStyle}>
      <CardContent>
        <Typography
          style={{ fontSize: '14px' }}
          color="textSecondary"
          gutterBottom
        >
          {props.team.Nombre_competicion}
        </Typography>
        <Typography component="h5" variant="h5">
          {props.team.Nombre_equipo}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {props.team.Nombre_deporte}
        </Typography>

        <Typography component="p">
          {props.team.Nombre_categoria} - {props.team.Nombre_temporada}
        </Typography>
        {props.team.Nombre_distrito}
      </CardContent>
      <CardActions style={{ flexDirection: 'row-reverse' }}>
        <Button
          size="small"
          color="primary"
          onClick={ () => {
            const team = props.team
            const teamCode = [team.Nombre_equipo, team.Nombre_deporte, team.Nombre_categoria]
            router.history.push('team/' + teamCode.join('::'))
          }}
        >
          Continuar
        </Button>
      </CardActions>
    </Card>
  )
}

export const TeamsFounded = (props: { teams: ITeam[] }) => {
  return (
    <div className="teamsFound" style={teamsFoundedStyle}>
      {props.teams.map((value: ITeam, index: number) =>
        <div key={index} className={`CardGrid ${cardGrid}`}>
          { <TeamCard team={value}/> }
        </div>
      )}
    </div>
  )
}
