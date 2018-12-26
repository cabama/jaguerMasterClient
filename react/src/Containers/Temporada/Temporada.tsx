import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { getUrlsEnviroment } from '../../Enviroments'
import { UserTypes } from '../../Redux/Actions/UserActions'
import { IMyStore } from '../../Redux/Store/Store'
import View from '../View/View'
import { Fetch } from '../../Services/FetchService';
import { Grid, TableHead, Table, TableRow, TableCell, TableBody } from '@material-ui/core'
import { temporadaMock } from './temporadaMocks';

type IProps = {
  history: { push: (url: string) => void },
} & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>

type IState = {
  clasificacion: { headers: any[], rows: any[] }
  resultados: object[]
}

export class TemporadaView extends React.Component<IProps, IState> {

  public inputRef: any = React.createRef()
  public urls = getUrlsEnviroment()

  public constructor(props: IProps, state: IState) {
    super(props, state)
    this.state = {
      clasificacion: { headers: [], rows: []},
      resultados: []
    }
    this.getClasificacion()
  }

  public render() {
    return (
      <View MenuBar={true} SideMenu={true}>
        <Grid container={true} xs={11} justify="center" alignItems="center">
          <Table>
            <TableHead>
              <TableRow>
                {this.state.clasificacion.headers.map((value, index) => <TableCell key={String({index})} numeric>{value}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.clasificacion.rows.map((row: any, index) => {
                return (
                  <TableRow key={String(index)}>
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
    new Fetch().fetch({
      path: 'users/me',
      init: requestInit,
    }, temporadaMock)
      .then(resp => resp.json())
      .then(value => this.setState({clasificacion: value}))
    }
  }

const mapStateToProps = (myState: IMyStore) => {
  return {
    state: {
      user: myState.user,
    },
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatchers: {
      updateProfile: (user: any) =>
        dispatch({
          type: UserTypes.updated,
          action: {
            user,
          },
        }),
    },
  }
}

export const Temporada = connect(mapStateToProps, mapDispatchToProps)(TemporadaView)
