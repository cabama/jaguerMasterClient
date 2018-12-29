import * as React from 'react'
import { getUrlsEnviroment } from '../../Enviroments'
import View from '../View/View'
import { Fetch } from '../../Services/FetchService'
import { Grid, Paper } from '@material-ui/core'
import { temporadaMock } from './temporadaMocks'
import { TeamRank } from './TeamRankType'
import { RankingTable } from './RankingTable'


type IProps = {
  history: { push: (url: string) => void },
}

type IState = {
  ranking: TeamRank[]
}

export class TemporadaView extends React.Component<IProps, IState> {

  public inputRef: any = React.createRef()
  public urls = getUrlsEnviroment()
  private _isMounted: boolean = false

  public constructor(props: IProps, state: IState) {
    super(props, state)
    this.state = {
      ranking: []
    }
  }

  public componentDidMount() {
    this._isMounted = true
    this.getClasificacion().then((ranking: TeamRank[]) => {
      if (this._isMounted) {
        this.setState({ ranking })
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
          <Grid item={true} xs={11} xl={6}>
            <Paper>
              <RankingTable ranking={this.state.ranking}/>
            </Paper>
          </Grid>

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
        return values.sort((a, b) => {
          if (a.Posicion < b.Posicion) return -1;
          else if (a.Posicion > b.Posicion) return 1;
          else return 0;
        })
      })
    }
}

  export const Temporada = TemporadaView
