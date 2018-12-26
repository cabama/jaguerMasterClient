import * as React from 'react'
import { getUrlsEnviroment } from '../../Enviroments'
import View from '../View/View'
import { Fetch } from '../../Services/FetchService';
import { Grid, TableHead, Table, TableRow, TableCell, TableBody } from '@material-ui/core'
import { temporadaMock } from './temporadaMocks';

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
      clasificacion: { headers: [], rows: []},
      resultados: []
    }
  }
  
  public componentDidMount () {
    this._isMounted = true
    this.getClasificacion().then(value => {
      if (this._isMounted) this.setState({ clasificacion: value })
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
                    <TableCell numeric>{row.name}</TableCell>
                    <TableCell numeric>{row.points}</TableCell>
                    <TableCell numeric>{row.num}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>
      </View>
    )
  }

  private getClasificacion () {
    const requestInit: RequestInit = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
    }
    return new Fetch().fetch({
      path: 'users/me',
      init: requestInit,
    }, temporadaMock)
      .then(resp => resp.json())
    }
  }

export const Temporada = TemporadaView
