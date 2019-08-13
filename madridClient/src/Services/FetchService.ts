// import { getUrlsEnviroment } from '../Enviroments'
export interface IFetchParams {
  path?: string,
  init?: RequestInit,
  baseUrl?: string,
  url?: string,
}

// const baseUrl = getUrlsEnviroment().baseApi
export const JagerFetch = (fetchParams: IFetchParams, mock?: any): Promise<Response> => {

  // return mock if we have mock mode
  if (process.env.REACT_APP_MOCK === 'TRUE' && mock) {
    return new Promise(resolve => setTimeout(() => {
      const response = new Response(
        JSON.stringify(mock),
        {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' }
        } as ResponseInit)

      resolve(response)
    }
      , 100))
  }

  const { path, init, baseUrl } = fetchParams
  const initRequest = { ...init, ...{ headers: { } } }
  if (fetchParams.url) return fetch(fetchParams.url, initRequest)
  const base = baseUrl
  const url = base + '/' + path
  return fetch(url, initRequest)
}
