import * as React from 'react'
import { TeamRank } from './TeamRankType'
import { TableHead, Table, TableRow, TableCell, TableBody } from '@material-ui/core'

type IProps = {
  ranking: TeamRank[]
}


export const RankingTable = (props: IProps) => {
  return (<Table>
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Nombre del equipo</TableCell>
        <TableCell>Pts</TableCell>
        <TableCell>PG</TableCell>
        <TableCell>PE</TableCell>
        <TableCell>PP</TableCell>
        <TableCell>GF</TableCell>
        <TableCell>GC</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {props.ranking.map((row, index) => {
        return (
          <TableRow key={'row' + index}>
            <TableCell>{row.Posicion}</TableCell>
            <TableCell>{row.Nombre_equipo}</TableCell>
            <TableCell>{row.Puntos}</TableCell>
            <TableCell>{row.Partidos_ganados}</TableCell>
            <TableCell>{row.Partidos_empatados}</TableCell>
            <TableCell>{row.Partidos_perdidos}</TableCell>
            <TableCell>{row.Goles_favor}</TableCell>
            <TableCell>{row.Goles_contra}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>)
}