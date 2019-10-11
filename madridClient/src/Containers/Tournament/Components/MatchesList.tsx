import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { ITeamMatch } from 'Types/TeamMatch'
import { JornadaMatchCard } from '../../../Components/MatchCard/JornadaMatchCard'


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
            <JornadaMatchCard match={match} />
          </Grid>
      </Grid>
        )
      )}
    </div>
  )
}
