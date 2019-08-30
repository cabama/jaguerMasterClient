import { DevEnvironment, IUrlsEnv, ProdEnvironment } from './environments'

const devEnvironmet = new DevEnvironment()
const prodEnvironmet = new ProdEnvironment()

export { IUrlsEnv }

export function getUrlsEnviroment(): IUrlsEnv {
  return process.env.REACT_APP_MODE === 'DEV'
    ? devEnvironmet.getUrls()
    : prodEnvironmet.getUrls()
}

export const jagerServiceBaseUrl = true
  ? 'http://localhost:2525'
  : 'http://reshuhormiguero.club:2525'
