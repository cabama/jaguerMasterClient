import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { ITeamRank } from 'Types/TeamRank'
import { TableHead, Table, TableRow, TableCell, TableBody } from '@material-ui/core'

const cellStyle: React.CSSProperties = {
  padding: '5px'
}

const firstCellStyle = {
  padding: '5px, 5px, 5px, 10px'

}

type IProps = {
  ranking: ITeamRank[]
}

export const RankingTable = (props: IProps) => {
  return (
  <Grid item xs={11} style={{ marginTop: '25px', marginBottom: '65px' }}>
    <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={firstCellStyle}></TableCell>
          <TableCell style={cellStyle}>Nombre del equipo</TableCell>
          <TableCell style={cellStyle}>Pts</TableCell>
          <TableCell style={cellStyle}>PG</TableCell>
          <TableCell style={cellStyle}>PE</TableCell>
          <TableCell style={cellStyle}>PP</TableCell>
          <TableCell style={cellStyle}>GF</TableCell>
          <TableCell style={cellStyle}>GC</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.ranking.map((row, index) => {
          return (
            <TableRow key={'row' + index}>
              <TableCell style={firstCellStyle}>{row.Posicion}</TableCell>
              <TableCell style={cellStyle}>{row.Nombre_equipo}</TableCell>
              <TableCell style={cellStyle}>{row.Puntos}</TableCell>
              <TableCell style={cellStyle}>{row.Partidos_ganados}</TableCell>
              <TableCell style={cellStyle}>{row.Partidos_empatados}</TableCell>
              <TableCell style={cellStyle}>{row.Partidos_perdidos}</TableCell>
              <TableCell style={cellStyle}>{row.Goles_favor}</TableCell>
              <TableCell style={cellStyle}>{row.Goles_contra}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
    </Paper>

  </Grid>
  )
}
