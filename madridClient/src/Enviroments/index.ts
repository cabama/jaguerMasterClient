import { DevEnvironment, IUrlsEnv, ProdEnvironment } from './environments'

const isDev = process.env.REACT_APP_MODE === 'DEV'

const devEnvironmet = new DevEnvironment()
const prodEnvironmet = new ProdEnvironment()

export { IUrlsEnv }

export function getUrlsEnviroment(): IUrlsEnv {
  return process.env.REACT_APP_MODE === 'DEV'
    ? devEnvironmet.getUrls()
    : prodEnvironmet.getUrls()
}

export const jagerServiceBaseUrl = false
  ? 'http://localhost:2525'
  : 'http://reshuhormiguero.club:2525'
