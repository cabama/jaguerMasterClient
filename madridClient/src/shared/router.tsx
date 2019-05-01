import { Context, useContext } from 'react'
import { __RouterContext, RouteComponentProps } from 'react-router-dom'

declare module 'react-router-dom' {
  export const __RouterContext: Context<RouteComponentProps<{}>>
}

export const RouterContext = __RouterContext

export const useRouter = () => {
  return useContext(RouterContext)
}