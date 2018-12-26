import { getUrlsEnviroment } from '../Enviroments'
import { LoginService } from './LoginService'

interface IFetchParams {
  path?: string,
  init?: RequestInit,
  baseUrl?: string,
  url?: string,
}

export class Fetch {

  public baseUrl: string

  constructor () {
    this.baseUrl = getUrlsEnviroment().baseApi
  }

  public fetch (fetchParams: IFetchParams, mock?: any): Promise<Response> {

    // return mock if we have mock mode
    if (process.env.REACT_APP_MOCK === 'TRUE' && mock) {
      return new Promise(resolve => setTimeout(() => {
        const response = new Response(
          JSON.stringify(mock), 
          {
            status: 200,
            statusText: 'OK',
            headers: { 'Content-Type': 'application/json' },
          } as ResponseInit)
       
        resolve(response)
      }
        , 100))
    } 

    const {path, init, baseUrl} = fetchParams
    const token = LoginService.getToken()
    const initRequest = { ...init, ...{ headers: { ...{ Authorization: 'JWT ' + token}}}}
    if (fetchParams.url) return fetch(fetchParams.url, initRequest)
    const base = baseUrl || this.baseUrl
    const url = base + '/' + path
    return fetch(url, initRequest)
  }

}
