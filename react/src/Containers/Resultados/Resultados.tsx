import * as React from 'react'
import { getUrlsEnviroment } from '../../Enviroments'
import View from '../View/View'
import { Fetch } from '../../Services/FetchService';
import { Grid } from '@material-ui/core'
import { resultadosMock } from './resultadosMocks';
import { MatchCard } from '../../Components/MatchCard/MatchCard';
import { Match } from '../../Components/MatchCard/Match';

type IProps = {
  history: { push: (url: string) => void },
}

type IState = {
  resultados: Match[]
}

export class ResultadosView extends React.Component<IProps, IState> {

  public inputRef: any = React.createRef()
  public urls = getUrlsEnviroment()
  private _isMounted: boolean = false

  public constructor(props: IProps, state: IState) {
    super(props, state)
    this.state = {
      resultados: []
    }
  }

  public componentDidMount() {
    this._isMounted = true
    this.getResultados().then(value => {
      if (this._isMounted) this.setState({ resultados: value })
    })
  }

  public componentWillUnmount() {
    this._isMounted = false
  }

  public render() {
    return (
      <View MenuBar={true} SideMenu={true}>
        <Grid container={true} spacing={16} justify="center" alignItems="center">
            {this.state.resultados.map((partido: any, index) => (
              <Grid item={true} key={'' + index} xs={10} style={{margin: '10px 0'}}>
                <MatchCard match={partido}/>
              </Grid>
            ))}
        </Grid>
      </View>
    )
  }

  private getResultados() {
    const requestInit: RequestInit = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
    }
    return new Fetch().fetch({
      path: 'users/me',
      init: requestInit,
    }, resultadosMock)
      .then(resp => resp.json())
  }
}

export const Resultados = ResultadosView
