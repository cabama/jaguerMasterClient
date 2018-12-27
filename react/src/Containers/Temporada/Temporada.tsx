import * as React from 'react'
import { getUrlsEnviroment } from '../../Enviroments'
import View from '../View/View'
import { Fetch } from '../../Services/FetchService'
import { Grid, TableHead, Table, TableRow, TableCell, TableBody } from '@material-ui/core'
import { temporadaMock } from './temporadaMocks'
import { TeamRank } from './TeamRankType'

type IProps = {
  history: { push: (url: string) => void },
}

type IState = {
  clasificacion: { headers: any[], rows: any[] }
  resultados: object[]
}

export class TemporadaView extends React.Component<IProps, IState> {

  public inputRef: any = React.createRef()
  public urls = getUrlsEnviroment()
  private _isMounted: boolean = false

  public constructor(props: IProps, state: IState) {
    super(props, state)
    this.state = {
      clasificacion: { headers: [], rows: [] },
      resultados: []
    }
  }

  public componentDidMount() {
    this._isMounted = true
    this.getClasificacion().then((value: any) => {
      if (this._isMounted) {
        const clasificacion = {
          headers: Object.keys(value[0]),
          rows: value
        }
        this.setState({ clasificacion })
      }
    })
  }

  public componentWillUnmount() {
    this._isMounted = false
  }

  public render() {
    return (
      <View MenuBar={true} SideMenu={true}>
        <Grid container={true} spacing={16} justify="center" alignItems="center">
          <Table>
            <TableHead>
              <TableRow>
                {this.state.clasificacion.headers.map((value, index) => <TableCell key={'header' + index} numeric>{value}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.clasificacion.rows.map((row: any, index) => {
                return (
                  <TableRow key={'row' + index}>
                    {Object.keys(row).map((value: any, i) => <TableCell key={'row' + index + '_' + i} numeric>{row[value]}</TableCell>)}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>
      </View>
    )
  }

  private getClasificacion() {
    const requestInit: RequestInit = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
    }
    return new Fetch().fetch({
      path: 'temporada/clasificacion',
      init: requestInit,
    }, temporadaMock)
      .then(resp => resp.json())
      .then((values: TeamRank[]) => {
        return values.map(val => ({
          'Pos': val.Posicion,
          'Equipo': val.Nombre_equipo,
          'Puntos': val.Puntos,
          'Ganados': val.Partidos_ganados,
          'Empatados': val.Partidos_empatados,
          'Perdidos': val.Partidos_perdidos,
          'GF': val.Goles_favor,
          'GC': val.Goles_contra,
        }))
        .sort((a, b) => {
          if (a.Pos < b.Pos) return -1;
          else if (a.Pos > b.Pos) return 1;
          else return 0;
        })
      })
    }
}

  export const Temporada = TemporadaView
